
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { toast, Toaster } from 'sonner';

// Show toast message if Firebase config is not set
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  toast.warning(
    "Firebase configuration is missing. Please add your Firebase credentials to use authentication features.",
    {
      duration: 6000,
    }
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
