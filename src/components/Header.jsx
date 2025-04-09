
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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
  }, []);
  
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
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary-600 flex items-center">
              <span className="text-primary">Career</span>
              <span className="text-secondary">Leap</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'nav-link-active' : ''}`}>Jobs</Link>
            <Link to="/training" className={`nav-link ${location.pathname === '/training' ? 'nav-link-active' : ''}`}>Training</Link>
            <Link to="/companies" className={`nav-link ${location.pathname === '/companies' ? 'nav-link-active' : ''}`}>Companies</Link>
            
            <div className="relative group">
              <button className="nav-link flex items-center">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-left">
                <div className="py-1">
                  <Link to="/resume-builder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Resume Builder</Link>
                  <Link to="/interview-prep" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Interview Preparation</Link>
                  <Link to="/achievements" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Achievements</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                  onClick={toggleUserMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  <span className="font-medium">{currentUser.displayName || 'User'}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/resume-builder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Resume Builder</Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
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
};

export default Header;
