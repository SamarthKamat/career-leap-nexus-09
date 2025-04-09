
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';

// Show toast message if Firebase config is not set
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.warn("Firebase configuration is missing. Please add your Firebase credentials to use authentication features.");
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
}
