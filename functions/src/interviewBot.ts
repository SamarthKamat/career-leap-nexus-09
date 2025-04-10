import * as functions from "firebase-functions/v2";
import { onRequest, onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Initialize Firebase Admin SDK ---
admin.initializeApp();
const db = getFirestore();

// --- Interview Domains ---
const INTERVIEW_DOMAINS = {
  technical: "Technical programming concepts, data structures, algorithms, and software development practices",
  hr: "Human Resources topics, company culture fit, salary expectations, and career goals",
  behavioral: "Behavioral questions assessing past experiences, problem-solving, teamwork, and situational judgment",
  marketing: "Marketing strategy, digital marketing channels, campaign analysis, and market understanding",
};

// --- Interfaces ---
interface QuestionRequestData {
  domain: keyof typeof INTERVIEW_DOMAINS;
  difficulty?: "beginner" | "intermediate" | "advanced";
  context?: string;
  previousQuestions?: string[];
}

interface GeneratedQuestion {
  question: string;
  expectedAnswer: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  domain: keyof typeof INTERVIEW_DOMAINS;
  type: string;
  keywords: string[];
}

interface UserProgressData {
  domain: keyof typeof INTERVIEW_DOMAINS;
  difficulty: "beginner" | "intermediate" | "advanced";
  isCorrect: boolean;
}

interface UserProgressDocument {
  totalQuestions: number;
  correctAnswers: number;
  domainProgress: {
    [key in keyof typeof INTERVIEW_DOMAINS]?: {
      totalQuestions: number;
      correctAnswers: number;
      currentDifficulty: "beginner" | "intermediate" | "advanced";
    };
  };
}

// --- Generate Interview Question (HTTP Request with Fixed CORS) ---
export const generateGeminiQuestion = onRequest(
  {
    secrets: ["GEMINI_API_KEY"],
    timeoutSeconds: 60,
    memory: "1GiB",
    cors: true
  },
  async (req, res) => {
    // Set CORS headers for all responses
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Max-Age", "3600");

    // Handle CORS Preflight
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    // Main request handling
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || functions.config().secrets?.gemini_api_key;

    if (!GEMINI_API_KEY) {
      console.error("Gemini API Key is missing.");
      res.status(500).json({ error: "Server configuration error." });
      return;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).send("Method Not Allowed");
      return;
    }

    if (!req.body) {
      res.status(400).json({ error: "Request body is missing" });
      return;
    }

    const requestData = req.body as QuestionRequestData;
    const { domain, difficulty = "intermediate", context, previousQuestions } = requestData;

    if (!domain || !INTERVIEW_DOMAINS[domain]) {
      res.status(400).json({ error: "Invalid or missing 'domain'" });
      return;
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are an expert AI interviewer simulating a job interview. Generate a single, relevant interview question based on the provided details.

**Interview Context:**
*   **Domain:** ${domain} (${INTERVIEW_DOMAINS[domain]})
*   **Target Difficulty:** ${difficulty}
${context ? `*   **Context from Previous Answer:** ${context}\n` : ""}
${previousQuestions && previousQuestions.length > 0 ? `*   **Avoid Repeating Topics From:** ${previousQuestions.join(", ")}\n` : ""}

**Your Task:**
Generate a question appropriate for the specified domain and difficulty. If context from a previous answer is provided, try to ask a follow-up question or a question on a related topic. Avoid asking about topics identical to those in 'Avoid Repeating Topics From'.

**Output Format (JSON only):**
{
  "question": "...",
  "expectedAnswer": "...",
  "difficulty": "${difficulty}",
  "domain": "${domain}",
  "type": "conceptual",
  "keywords": ["..."]
}
`.trim();

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const generatedText = result.response.text();

      try {
        // Clean the response text to extract valid JSON
        const jsonStart = generatedText.indexOf('{');
        const jsonEnd = generatedText.lastIndexOf('}') + 1;
        const jsonString = generatedText.slice(jsonStart, jsonEnd);
        
        const parsedResponse = JSON.parse(jsonString) as GeneratedQuestion;

        if (!parsedResponse.question || !parsedResponse.expectedAnswer) {
          throw new Error("Missing required fields in generated response.");
        }

        res.status(200).json({
          question: parsedResponse.question,
          expectedAnswer: parsedResponse.expectedAnswer,
          difficulty: parsedResponse.difficulty || difficulty,
          domain: parsedResponse.domain || domain,
          type: parsedResponse.type || "general",
          keywords: parsedResponse.keywords || [domain],
        });
      } catch (parseError) {
        console.warn("Fallback to raw text due to JSON parse failure:", parseError);
        res.status(200).json({
          question: generatedText,
          expectedAnswer: "Please provide a relevant answer.",
          difficulty,
          domain,
          type: "general",
          keywords: [domain],
        } as GeneratedQuestion);
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({
        error: "Failed to generate interview question.",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
);

// --- Update User Progress (Callable Function) ---
export const updateUserProgress = onCall(
  { secrets: [] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "You must be logged in.");
    }

    const userId = request.auth.uid;
    const progressData = request.data as UserProgressData;

    if (!progressData) {
      throw new HttpsError("invalid-argument", "Request data is missing.");
    }

    const { domain, difficulty, isCorrect } = progressData;

    if (!domain || !INTERVIEW_DOMAINS[domain]) {
      throw new HttpsError("invalid-argument", "Invalid or missing 'domain'.");
    }
    if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
      throw new HttpsError("invalid-argument", "Invalid 'difficulty' value.");
    }
    if (typeof isCorrect !== "boolean") {
      throw new HttpsError("invalid-argument", "'isCorrect' must be a boolean.");
    }

    const userProgressRef = db
      .collection("users")
      .doc(userId)
      .collection("progress")
      .doc("interview");

    try {
      const updatedProgress = await db.runTransaction(async (transaction) => {
        const progressDoc = await transaction.get(userProgressRef);

        const defaultProgress: UserProgressDocument = {
          totalQuestions: 0,
          correctAnswers: 0,
          domainProgress: {},
        };

        const currentProgress: UserProgressDocument = progressDoc.exists
          ? (progressDoc.data() as UserProgressDocument)
          : defaultProgress;

        // Initialize domain progress if it doesn't exist
        if (!currentProgress.domainProgress[domain]) {
          currentProgress.domainProgress[domain] = {
            totalQuestions: 0,
            correctAnswers: 0,
            currentDifficulty: "beginner",
          };
        }

        const domainData = currentProgress.domainProgress[domain]!;

        // Update counters
        currentProgress.totalQuestions += 1;
        domainData.totalQuestions += 1;

        if (isCorrect) {
          currentProgress.correctAnswers += 1;
          domainData.correctAnswers += 1;
        }

        // Calculate progress for difficulty adjustment
        const questionsInDomain = domainData.totalQuestions;
        const accuracyInDomain = domainData.correctAnswers / questionsInDomain;

        const QUESTIONS_THRESHOLD = 10;
        const ACCURACY_THRESHOLD = 0.75;

        // Adjust difficulty if thresholds are met
        if (
          questionsInDomain >= QUESTIONS_THRESHOLD &&
          accuracyInDomain >= ACCURACY_THRESHOLD
        ) {
          if (domainData.currentDifficulty === "beginner") {
            domainData.currentDifficulty = "intermediate";
          } else if (domainData.currentDifficulty === "intermediate") {
            domainData.currentDifficulty = "advanced";
          }
        }

        transaction.set(userProgressRef, currentProgress);
        return currentProgress;
      });

      return { 
        message: "Progress updated successfully", 
        data: updatedProgress 
      };
    } catch (error) {
      console.error("Error updating user progress:", error);
      throw new HttpsError(
        "internal", 
        "Failed to update user progress",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);