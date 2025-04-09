
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth() || { currentUser: null };
  
  if (!currentUser) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }
  
  // User is authenticated, render the protected route
  return children;
};

export default ProtectedRoute;
