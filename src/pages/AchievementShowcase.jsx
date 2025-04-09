
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { 
  Award, 
  Scroll, 
  TrendingUp, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Share2,
  Download
} from 'lucide-react';

const AchievementShowcase = () => {
  const { currentUser } = useAuth();
  
  // Sample achievements data
  const certifications = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      issuer: "CareerLeap Academy",
      date: "March 15, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      issuer: "CareerLeap Academy",
      date: "February 3, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      issuer: "DesignLab",
      date: "December 20, 2024",
      image: "/placeholder.svg"
    }
  ];
  
  const badges = [
    {
      id: 1,
      title: "Resume Master",
      description: "Created a perfect ATS-optimized resume",
      icon: "📄",
      date: "April 2, 2025"
    },
    {
      id: 2,
      title: "Interview Pro",
      description: "Completed 10 mock interviews with excellent feedback",
      icon: "🎯",
      date: "March 28, 2025"
    },
    {
      id: 3,
      title: "Job Search Champion",
      description: "Applied to 50+ relevant positions",
      icon: "🔍",
      date: "March 15, 2025"
    },
    {
      id: 4,
      title: "Course Achiever",
      description: "Completed 5 training courses",
      icon: "📚",
      date: "February 10, 2025"
    }
  ];
  
  const stats = {
    courses: 5,
    interviews: 12,
    applications: 53,
    offers: 2
  };
  
  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
                  {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'S'}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{currentUser?.displayName || 'Student Name'}</h1>
                <p className="text-gray-600">Computer Science • Final Year</p>
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">Web Development</span>
                  <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">Data Science</span>
                  <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm">UX/UI Design</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto">
                <button className="btn btn-outline flex items-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Achievement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-primary-100 mr-3">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="font-semibold text-lg">Courses Completed</h2>
              </div>
              <p className="text-3xl font-bold text-primary-600">{stats.courses}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-secondary-100 mr-3">
                  <Scroll className="h-6 w-6 text-secondary-600" />
                </div>
                <h2 className="font-semibold text-lg">Mock Interviews</h2>
              </div>
              <p className="text-3xl font-bold text-secondary-600">{stats.interviews}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-accent-100 mr-3">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <h2 className="font-semibold text-lg">Job Applications</h2>
              </div>
              <p className="text-3xl font-bold text-accent-600">{stats.applications}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="font-semibold text-lg">Job Offers</h2>
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.offers}</p>
            </div>
          </div>
          
          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Scroll className="h-5 w-5 mr-2" />
              Certifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map(cert => (
                <div key={cert.id} className="border rounded-lg overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{cert.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Issued by {cert.issuer}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </button>
                      <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Badges */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Badges & Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map(badge => (
                <div key={badge.id} className="text-center border rounded-lg p-4">
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-semibold mb-2">{badge.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Earned on {badge.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Skills Progress */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Skills Progress
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">HTML/CSS</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">JavaScript</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">React</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Python</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Data Analysis</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Add More Achievements to Your Profile</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Complete more courses, practice interviews, and participate in challenges to earn badges and certifications
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/training" className="btn bg-white text-primary hover:bg-gray-100 px-6 py-2">
                Browse Courses
              </Link>
              <Link to="/interview-prep" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary px-6 py-2">
                Practice Interviews
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AchievementShowcase;
