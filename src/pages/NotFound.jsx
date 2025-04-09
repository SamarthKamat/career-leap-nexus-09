
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="text-primary-500 text-9xl font-bold mb-8">404</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="btn btn-primary flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <Link 
              to="/jobs" 
              className="btn btn-outline flex items-center justify-center"
            >
              Browse Jobs
            </Link>
          </div>
          
          <div className="mt-16 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">You might be interested in:</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/training" className="text-primary-600 hover:underline">Training Programs</Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-primary-600 hover:underline">Resume Builder</Link>
              </li>
              <li>
                <Link to="/interview-prep" className="text-primary-600 hover:underline">Interview Preparation</Link>
              </li>
              <li>
                <Link to="/companies" className="text-primary-600 hover:underline">Partner Companies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
