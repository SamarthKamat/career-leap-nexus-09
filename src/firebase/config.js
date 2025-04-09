
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { toast } from 'sonner';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyPlaceholder",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "placement-cell.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "placement-cell",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "placement-cell.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdefghijklmnop"
};

let app;
try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  toast.error("Failed to initialize Firebase. Please check your configuration.");
}

// Initialize Firebase services
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

export default app;
