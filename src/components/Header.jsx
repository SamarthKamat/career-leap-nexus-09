
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, ChevronDown, User, LogOut, FileText } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fix useEffect syntax and placement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  // Fixed syntax here
  
  // Remove the duplicate useEffect implementation at the bottom of the file
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  
  const handleLogout = async () => {
    try {
      await logout();
      // Close the menu after logout
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold flex items-center">
              <span className="text-blue-400">Job</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">GPT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-20">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active text-blue-400' : 'text-gray-200 hover:text-blue-400'}`}>Home</Link>
            <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'nav-link-active text-blue-400' : 'text-gray-200 hover:text-blue-400'}`}>Jobs</Link>
            <Link to="/training" className={`nav-link ${location.pathname === '/training' ? 'nav-link-active text-blue-400' : 'text-gray-200 hover:text-blue-400'}`}>Training</Link>
            <Link to="/companies" className={`nav-link ${location.pathname === '/companies' ? 'nav-link-active text-blue-400' : 'text-gray-200 hover:text-blue-400'}`}>Companies</Link>
            
            <div className="relative group">
              <button className="nav-link flex items-center text-gray-200 hover:text-blue-400">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-left">
                <div className="py-1">
                  <Link to="/resume-builder" className="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-700">Resume Builder</Link>
                  <Link to="/interview-prep" className="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-700">Interview Preparation</Link>
                  <Link to="/achievements" className="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-700">Achievements</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative" ref={menuRef}>
                <button 
                  className="flex items-center space-x-2 text-white hover:text-blue-400"
                  onClick={toggleUserMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-primary-600 flex items-center justify-center text-white">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="font-medium">{currentUser.displayName || 'User'}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in divide-y divide-gray-100">
                    <div className="py-1">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <User size={16} className="mr-2 text-gray-500" />
                        Dashboard
                      </Link>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <User size={16} className="mr-2 text-gray-500" />
                        View Profile
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link to="/resume-builder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FileText size={16} className="mr-2 text-gray-500" />
                        Resume Builder
                      </Link>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-6 py-2 text-gray-200 hover:text-blue-400 border border-gray-200 hover:border-blue-400 rounded-md transition-colors duration-200">Login</Link>
                <Link to="/register" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-md p-2 text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Home</Link>
            <Link to="/jobs" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Jobs</Link>
            <Link to="/training" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Training</Link>
            <Link to="/companies" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Companies</Link>
            <Link to="/resume-builder" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Resume Builder</Link>
            <Link to="/interview-prep" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Interview Preparation</Link>
            <Link to="/achievements" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Achievements</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <User size={20} />}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser.displayName || 'User'}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link to="/dashboard" className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Dashboard</Link>
                  <button 
                    className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-5 pb-4">
                <Link to="/login" className="btn btn-outline w-full text-center" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="btn btn-primary w-full text-center" onClick={toggleMenu}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
  // Remove the duplicate useEffect block at the end of the file
};

export default Header;
