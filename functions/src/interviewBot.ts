import * as functions from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";



// Define secret for Gemini API key
const GEMINI_API_KEY = "AIzaSyAW2j0pGYK2a6CC53lZ4TX18cGguTPqnnk";

// Initialize Firestore
const db = getFirestore();

// Define interview domains and their descriptions
const INTERVIEW_DOMAINS = {
  technical: "Technical programming and software development",
  hr: "Human Resources and company culture",
  behavioral: "Behavioral and situational scenarios",
  marketing: "Marketing strategy and digital marketing"
};

// Interface for the question request
interface QuestionRequest {
  domain: keyof typeof INTERVIEW_DOMAINS;
  difficulty?: "beginner" | "intermediate" | "advanced";
  context?: string;
  previousQuestions?: string[];
}

// Interface for the generated question
interface GeneratedQuestion {
  question: string;
  expectedAnswer: string;
  difficulty: string;
  domain: string;
  type: string;
  keywords: string[];
}

// Cloud Function to generate interview questions using Gemini
export const generateGeminiQuestion = onCall(
  { secrets: [GEMINI_API_KEY] },
  async (request): Promise<GeneratedQuestion> => {
    // Validate authentication
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication required"
      );
    }

    const { domain, difficulty, context, previousQuestions } = request.data as QuestionRequest;

    // Validate domain
    if (!INTERVIEW_DOMAINS[domain]) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid interview domain"
      );
    }

    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.valueOf());
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Prepare chat context
      const chatContext = [
        {
          role: "system",
          content: `You are an expert interviewer for ${domain} positions. Generate a relevant interview question based on the following parameters:
            - Domain: ${domain}
            - Domain Description: ${INTERVIEW_DOMAINS[domain]}
            - Difficulty: ${difficulty || "intermediate"}
            ${context ? `- Previous Response: ${context}` : ""}
            ${previousQuestions?.length ? `- Previous Questions: ${previousQuestions.join(", ")}` : ""}
            
            Format your response as a JSON object with these properties:
            - question: A clear, concise interview question
            - expectedAnswer: Key points or criteria for a good answer
            - difficulty: The actual difficulty level
            - domain: The specific area within ${domain}
            - type: The question type (technical, behavioral, etc.)
            - keywords: Relevant keywords for the question`
        }
      ];

      // Generate response using Gemini
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: JSON.stringify(chatContext) }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      const response = result.response;
      const generatedText = response.text();

      try {
        // Parse the generated response as JSON
        const parsedResponse = JSON.parse(generatedText);
        return {
          question: parsedResponse.question,
          expectedAnswer: parsedResponse.expectedAnswer,
          difficulty: parsedResponse.difficulty || difficulty || "intermediate",
          domain: parsedResponse.domain || domain,
          type: parsedResponse.type || "general",
          keywords: parsedResponse.keywords || [domain, difficulty || "intermediate"]
        };
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          question: generatedText,
          expectedAnswer: "Please provide a clear and concise answer that demonstrates your understanding and experience.",
          difficulty: difficulty || "intermediate",
          domain: domain,
          type: "general",
          keywords: [domain, difficulty || "intermediate"]
        };
      }
    } catch (error) {
      console.error("Error generating interview question:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to generate interview question"
      );
    }
  }
);

// Cloud Function to update user progress
export const updateUserProgress = onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Authentication required"
    );
  }

  const { domain, difficulty, isCorrect } = request.data;

  try {
    const userProgressRef = db.collection("users").doc(request.auth.uid).collection("progress").doc("interview");
    const userProgressDoc = await userProgressRef.get();

    // Define the type for user progress data
    interface UserProgress {
      totalQuestions: number;
      correctAnswers: number;
      domainProgress: {
        [key: string]: {
          totalQuestions: number;
          correctAnswers: number;
          difficulty: string;
        };
      };
    }

    const defaultProgress: UserProgress = {
      totalQuestions: 0,
      correctAnswers: 0,
      domainProgress: {}
    };

    // Ensure currentProgress is properly typed and initialized
    const currentProgress: UserProgress = userProgressDoc.exists ? 
      (userProgressDoc.data() as UserProgress) || defaultProgress : defaultProgress;

    // Update domain-specific progress
    if (!currentProgress.domainProgress[domain]) {
      currentProgress.domainProgress[domain] = {
        totalQuestions: 0,
        correctAnswers: 0,
        difficulty: "beginner"
      };
    }

    currentProgress.totalQuestions++;
    currentProgress.domainProgress[domain].totalQuestions++;

    if (isCorrect) {
      currentProgress.correctAnswers++;
      currentProgress.domainProgress[domain].correctAnswers++;

      // Update difficulty based on performance
      const domainAccuracy = currentProgress.domainProgress[domain].correctAnswers / 
        currentProgress.domainProgress[domain].totalQuestions;

      if (domainAccuracy >= 0.8 && currentProgress.domainProgress[domain].totalQuestions >= 10) {
        if (difficulty === "beginner") {
          currentProgress.domainProgress[domain].difficulty = "intermediate";
        } else if (difficulty === "intermediate") {
          currentProgress.domainProgress[domain].difficulty = "advanced";
        }
      }
    }

    await userProgressRef.set(currentProgress);

    return { 
      success: true,
      progress: currentProgress
    };
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to update user progress"
    );
  }
});