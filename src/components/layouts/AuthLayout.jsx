import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section - Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 to-primary-900/90 z-10" />
        <img
          src="/hero-bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 w-full">
          <div>
            <Link to="/" className="text-2xl font-bold hover:text-primary-200 transition-colors">
              CareerLeap
            </Link>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              Your Career Journey
              <br />
              Starts Here
            </h1>
            <p className="text-lg text-primary-100">
              Connect with top employers, discover opportunities, and take the next step in your professional journey.
            </p>
          </div>
          <div className="text-sm text-primary-200">
            © {new Date().getFullYear()} CareerLeap. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;