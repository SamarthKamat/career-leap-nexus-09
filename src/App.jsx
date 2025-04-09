
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import TrainingPrograms from "./pages/TrainingPrograms";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewPrep from "./pages/InterviewPrep";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import CompanyProfiles from "./pages/CompanyProfiles";
import AchievementShowcase from "./pages/AchievementShowcase";
import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';

// Employer Dashboard Pages
import PostJob from "./pages/employer/PostJob";
import ManageJobs from "./pages/employer/ManageJobs";
import Candidates from "./pages/employer/Candidates";
import Interviews from "./pages/employer/Interviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/training" element={<TrainingPrograms />} />
          <Route path="/companies" element={<CompanyProfiles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/employer-dashboard" element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          } />
          
          {/* Employer Dashboard Inner Routes */}
          <Route path="/employer-dashboard/post-job" element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          } />
          <Route path="/employer-dashboard/manage-jobs" element={
            <ProtectedRoute>
              <ManageJobs />
            </ProtectedRoute>
          } />
          <Route path="/employer-dashboard/candidates" element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          } />
          <Route path="/employer-dashboard/interviews" element={
            <ProtectedRoute>
              <Interviews />
            </ProtectedRoute>
          } />
          <Route path="/resume-builder" element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } />
          <Route path="/interview-prep" element={
            <ProtectedRoute>
              <InterviewPrep />
            </ProtectedRoute>
          } />
          <Route path="/achievements" element={
            <ProtectedRoute>
              <AchievementShowcase />
            </ProtectedRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
