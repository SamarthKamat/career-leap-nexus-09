import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, Briefcase, GraduationCap } from 'lucide-react';
import Header from '../components/Authheader';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../components/layouts/AuthLayout';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { signup, updateUserProfile, currentUser, signInWithGoogle, signInWithGitHub } = useAuth();
  const navigate = useNavigate();
  
  // Password validation states
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  // Update password validations whenever password or confirmPassword changes
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword && password !== ''
    });
  }, [password, confirmPassword]);

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!acceptTerms) {
      toast.error('Please accept the Terms and Conditions');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Check all password validations
    const allValid = Object.values(validations).every(isValid => isValid);
    if (!allValid) {
      toast.error('Please ensure your password meets all requirements');
      return;
    }
    
    try {
      setIsLoading(true);
      // Create the user account with additional data including userType
      const userCredential = await signup(email, password, {
        displayName: fullName,
        userType: userType,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
      
      // Update the user profile with display name
      await updateUserProfile(userCredential.user, {
        displayName: fullName
      });
      
      // Store additional user info in Firestore
      const { db } = await import('../firebase/config');
      const { doc, setDoc } = await import('firebase/firestore');
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
        userType,
        createdAt: new Date()
      })
      
      toast.success('Account created successfully!');
      // Navigate to the appropriate dashboard based on user type
      if (userType === 'employer') {
        navigate('/employer-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Failed to create an account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        default:
          errorMessage = 'Failed to create an account. Please try again';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <>
    <Header />
    <AuthLayout
      title={
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight"
        >
          Create Your Account
        </motion.h1>
      }
      subtitle={
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg font-medium text-gray-700"
        >
          Join our platform to unlock your career potential
        </motion.p>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* User Type Selection - Enhanced */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Select your role:</label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-6 rounded-lg flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
                    userType === 'student' 
                      ? 'bg-primary-50 border-2 border-primary-500 text-primary-700 shadow-md' 
                      : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                  onClick={() => setUserType('student')}
                >
                  <GraduationCap className={`h-7 w-7 ${userType === 'student' ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className="font-bold text-base">{userType === 'student' ? 'Student' : 'Student'}</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-6 rounded-lg flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
                    userType === 'employer' 
                      ? 'bg-primary-50 border-2 border-primary-500 text-primary-700 shadow-md' 
                      : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                  onClick={() => setUserType('employer')}
                >
                  <Briefcase className={`h-7 w-7 ${userType === 'employer' ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className="font-bold text-base">{userType === 'employer' ? 'Employer' : 'Employer'}</span>
                </motion.button>
              </div>
            </div>
            
            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Password Requirements - Enhanced */}
            <motion.div
              className="space-y-3 mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            / >
              <h4 className="text-sm font-bold text-gray-800">Password Requirements:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(validations).map(([key, isValid]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center p-2 rounded ${isValid ? 'text-green-700 bg-green-50 border border-green-100' : 'text-gray-600 bg-gray-50 border border-gray-100'}`}
                  >
                    {isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span className={`text-sm ${isValid ? 'font-medium' : ''}`}>
                      {key === 'length' && 'Min 8 characters'}
                      {key === 'uppercase' && 'Uppercase letter'}
                      {key === 'lowercase' && 'Lowercase letter'}
                      {key === 'number' && 'Number'}
                      {key === 'special' && 'Special character'}
                      {key === 'match' && 'Passwords match'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors duration-200"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500 transition-colors duration-200">
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

          {/* Register Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
          
          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Sign in
            </Link>
          </div>
        </form>
        
        {/* Social Sign Up - Enhanced */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-600 font-medium">Or sign up with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => signInWithGoogle().then(() => navigate('/dashboard')).catch(error => toast.error('Google sign-in failed'))}
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                </g>
              </svg>
              Google
            </motion.button>
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => signInWithGitHub().then(() => navigate('/dashboard')).catch(error => toast.error('GitHub sign-in failed'))}
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
    </>
  );
};

export default Register;
