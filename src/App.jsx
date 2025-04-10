
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from "./pages/Home";
import Jobs, { JobListing, JobDetails } from "./pages/Jobs";
import TrainingPrograms from "./pages/TrainingPrograms";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewPrep from "./pages/InterviewPrep";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Profile from "./pages/Profile";
import CompanyProfiles from "./pages/CompanyProfiles";
import AchievementShowcase from "./pages/AchievementShowcase";
import NotFound from "./pages/NotFound";

// Interview Components
import RibbonInterviewSimulator from "./components/RibbonInterviewSimulator";
import InterviewResults from "./components/InterviewResults";

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';

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
        {/* Global Chatbot */}
        <Chatbot />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />}>
            <Route index element={<JobListing />} />
            <Route path=":jobId" element={<JobDetails />} />
          </Route>
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
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
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
          <Route path="/interview-prep/simulator" element={
            <ProtectedRoute>
              <RibbonInterviewSimulator />
            </ProtectedRoute>
          } />
          <Route path="/interview-prep/results/:interviewId" element={
            <ProtectedRoute>
              <InterviewResults />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <div className="App">
                <h1>Website Chatbot</h1>
                <Chatbot />
              </div>
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
