
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'sonner';

// Show toast message if Firebase config is not set
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.warn("Firebase configuration is missing. Please add your Firebase credentials to use authentication features.");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
