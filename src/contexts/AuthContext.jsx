
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup
} from 'firebase/auth';
import { auth, db, googleProvider, githubProvider } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function signInWithGoogle() {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Create or update user document
      const docRef = doc(db, 'users', result.user.uid);
      await setDoc(docRef, {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        provider: 'google'
      }, { merge: true });

      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
      throw error;
    }
  }

  async function signInWithGitHub() {
    try {
      setError(null);
      const result = await signInWithPopup(auth, githubProvider);
      
      // Create or update user document
      const docRef = doc(db, 'users', result.user.uid);
      await setDoc(docRef, {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        provider: 'github'
      }, { merge: true });

      return result;
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      setError(error.message);
      throw error;
    }
  }

  async function signup(email, password, additionalData = {}) {
    try {
      setError(null);
      // Create authentication user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Determine collection based on registration type
      const collectionName = additionalData.userType === 'employer' ? 'interviewers' : 'users';
      delete additionalData.userType; // Remove userType from additionalData
      
      // Create document in appropriate collection
      const docRef = doc(db, collectionName, result.user.uid);
      await setDoc(docRef, {
        email: result.user.email,
        createdAt: new Date().toISOString(),
        ...additionalData,
        // Initialize collection-specific data
        ...(collectionName === 'users' ? {
          progress: {
            interviewsCompleted: 0,
            skillAssessments: [],
            lastActive: new Date().toISOString()
          }
        } : {
          // Interviewer-specific fields
          interviewsGiven: 0,
          expertise: [],
          availability: [],
          rating: 0,
          reviewCount: 0
        })
      });
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  async function updateUserProfile(user, data) {
    try {
      setError(null);
      await updateProfile(user, data);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    signInWithGitHub,
    error,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
