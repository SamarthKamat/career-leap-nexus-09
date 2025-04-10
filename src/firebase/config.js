
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { toast } from 'sonner';



import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsp-yanDkuNhM_0YjNb8gO8-2ZQ_bE44I",
  authDomain: "jobgpt-b7147.firebaseapp.com",
  projectId: "jobgpt-b7147",
  storageBucket: "jobgpt-b7147.firebasestorage.app",
  messagingSenderId: "1022367746007",
  appId: "1:1022367746007:web:ce795f2e30f1716f28ad92",
  measurementId: "G-4QSY523WWQ"
};


let app;
let auth;
let db;
let storage;
let googleProvider;
let githubProvider;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Configure auth persistence and error handling
  auth.useDeviceLanguage();
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in');
    } else {
      console.log('User is signed out');
    }
  }, (error) => {
    console.error('Auth state change error:', error);
    toast.error('Authentication error occurred. Please try again.');
  });

  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize auth providers
  googleProvider = new GoogleAuthProvider();
  githubProvider = new GithubAuthProvider();
  
  // Configure providers
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  githubProvider.setCustomParameters({
    prompt: 'consent'
  });
} catch (error) {
  console.error("Firebase initialization error:", error);
  toast.error('Failed to initialize Firebase. Please refresh the page.');
}

export { auth, db, storage, googleProvider, githubProvider };
export default app;


