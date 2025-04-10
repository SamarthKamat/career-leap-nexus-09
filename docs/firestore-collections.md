# Firestore Collections and Fields for Career Leap Nexus

This document outlines the Firestore collections and fields required for the interview practice feature in the Career Leap Nexus application.

## Collections Structure

### 1. `users` Collection

The main collection that stores user-specific data.

**Fields:**
- `uid` (string): User ID from Firebase Authentication
- `email` (string): User's email address
- `displayName` (string): User's display name
- `photoURL` (string, optional): URL to user's profile photo
- `createdAt` (timestamp): When the user account was created
- `lastLogin` (timestamp): When the user last logged in

### 2. `users/{userId}/progress/interview` Document

Stores the user's progress in interview practice sessions.

**Fields:**
- `totalQuestions` (number): Total number of interview questions answered
- `correctAnswers` (number): Number of correctly answered questions
- `domainProgress` (map): Object containing domain-specific progress data
  - `[domain]` (map): Progress for each domain (technical, hr, behavioral, marketing)
    - `totalQuestions` (number): Total questions answered in this domain
    - `correctAnswers` (number): Correctly answered questions in this domain
    - `difficulty` (string): Current difficulty level (beginner, intermediate, advanced)

### 3. `users/{userId}/interviews/{interviewId}` Collection

Stores individual interview sessions.

**Fields:**
- `domain` (string): Interview domain (technical, hr, behavioral, marketing)
- `difficulty` (string): Difficulty level (beginner, intermediate, advanced)
- `startTime` (timestamp): When the interview session started
- `endTime` (timestamp, optional): When the interview session ended
- `questions` (array): List of questions asked during the session

### 4. `users/{userId}/responses/{responseId}` Collection

Stores user responses to interview questions.

**Fields:**
- `questionId` (string): Reference to the question
- `response` (string): User's response to the question
- `timestamp` (timestamp): When the response was submitted
- `domain` (string): Domain of the question
- `difficulty` (string): Difficulty level of the question

### 5. `interviewQuestions` Collection

Stores predefined interview questions (if needed).

**Fields:**
- `question` (string): The interview question
- `expectedAnswer` (string): A comprehensive answer or evaluation criteria
- `difficulty` (string): The difficulty level (beginner, intermediate, advanced)
- `domain` (string): The domain (technical, hr, behavioral, marketing)
- `type` (string): The type of question (e.g., technical, conceptual, problem-solving)
- `keywords` (array): Array of relevant keywords

### 6. `categories` Collection

Stores interview categories and domains.

**Fields:**
- `id` (string): Category ID (e.g., technical, hr, behavioral, marketing)
- `name` (string): Display name of the category
- `description` (string): Description of the category
- `icon` (string, optional): Icon identifier for the category

## Security Rules

The Firestore security rules are already set up to protect these collections:

```
// Allow authenticated users to read and write their own interview data
match /users/{userId}/interviews/{interviewId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// Allow authenticated users to read interview questions
match /interviewQuestions/{questionId} {
  allow read: if request.auth != null;
  allow write: if false; // Only allow writes through Cloud Functions
}

// Allow authenticated users to read and write their own responses
match /users/{userId}/responses/{responseId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// Allow authenticated users to read and write their own progress data
match /users/{userId}/progress/{progressId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

## Notes

1. The interview questions are generated dynamically using the Hugging Face API through Cloud Functions, so the `interviewQuestions` collection might not be necessary unless you want to cache commonly used questions.

2. User progress is tracked in the `users/{userId}/progress/interview` document, which is updated after each interview session through the `updateUserProgress` Cloud Function.

3. The domain-specific progress tracking allows the application to adapt the difficulty level based on user performance, as implemented in the `updateUserProgress` function.