
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Authheader';
import Footer from '../components/Footer';
import { 
  Briefcase, 
  FileText, 
  Video, 
  Award, 
  BookOpen, 
  Bell, 
  Calendar, 
  Clock,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Sample dashboard data
  const upcomingEvents = [
    {
      id: 1,
      title: "Mock Interview Session",
      date: "April 15, 2025",
      time: "10:00 AM - 11:00 AM",
      type: "interview"
    },
    {
      id: 2,
      title: "Resume Review Workshop",
      date: "April 17, 2025",
      time: "2:00 PM - 4:00 PM",
      type: "workshop"
    },
    {
      id: 3,
      title: "TechNova Campus Drive",
      date: "April 22, 2025",
      time: "9:00 AM - 5:00 PM",
      type: "recruitment"
    }
  ];
  
  const applicationStats = {
    applied: 12,
    inProgress: 5,
    interviews: 3,
    offers: 1
  };
  
  const recentJobs = [
    {
      id: 101,
      title: "Frontend Developer",
      company: "TechNova Solutions",
      location: "San Francisco, CA",
      posted: "2 days ago"
    },
    {
      id: 102,
      title: "Data Analyst",
      company: "FinServe Global",
      location: "New York, NY",
      posted: "3 days ago"
    },
    {
      id: 103,
      title: "UX/UI Designer",
      company: "CreativeWorks Media",
      location: "Los Angeles, CA",
      posted: "5 days ago"
    }
  ];

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen pt-24 pb-10">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome, {currentUser?.displayName || 'Student'}</h1>
                <p className="text-gray-600 mt-1">
                  Your placement journey dashboard
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/profile" className="btn btn-primary">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Link 
              to="/jobs" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Briefcase className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Job Listings</h2>
                <p className="text-gray-600 text-sm">Browse open positions</p>
              </div>
            </Link>
            
            <Link 
              to="/resume-builder" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-secondary-100 mr-4">
                <FileText className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Resume Builder</h2>
                <p className="text-gray-600 text-sm">Update your resume</p>
              </div>
            </Link>
            
            <Link 
              to="/interview-prep" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-accent-100 mr-4">
                <Video className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Interview Prep</h2>
                <p className="text-gray-600 text-sm">Practice interviews</p>
              </div>
            </Link>
            
            <Link 
              to="/achievements" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Achievements</h2>
                <p className="text-gray-600 text-sm">View your progress</p>
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Application Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-primary-600">{applicationStats.applied}</p>
                  <p className="text-gray-600">Applied</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-secondary-600">{applicationStats.inProgress}</p>
                  <p className="text-gray-600">In Progress</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-accent-600">{applicationStats.interviews}</p>
                  <p className="text-gray-600">Interviews</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{applicationStats.offers}</p>
                  <p className="text-gray-600">Offers</p>
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </h2>
                <Link to="/events" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Recent Job Postings
                </h2>
                <Link to="/jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentJobs.map(job => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="block border rounded-md p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="text-sm text-gray-500">{job.posted}</span>
                    </div>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-gray-500 text-sm">{job.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Training Progress */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Your Training Progress
              </h2>
              <Link to="/training" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All Courses <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Web Development Bootcamp</h3>
                  <span className="text-primary-600 font-medium">75% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>Modules completed: 6/8</span>
                  <span>Last accessed: Yesterday</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Data Science Fundamentals</h3>
                  <span className="text-primary-600 font-medium">40% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>Modules completed: 4/10</span>
                  <span>Last accessed: 3 days ago</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Technical Interview Preparation</h3>
                  <span className="text-primary-600 font-medium">90% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>Modules completed: 9/10</span>
                  <span>Last accessed: Today</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Notifications
              </h2>
              <Link to="/notifications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start p-3 border-l-4 border-primary-500 bg-gray-50">
                <div className="bg-primary-100 p-2 rounded-full mr-3">
                  <Briefcase className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium">Application Update</p>
                  <p className="text-gray-600 text-sm">Your application for Frontend Developer at TechNova has been moved to the interview stage.</p>
                  <p className="text-gray-500 text-xs mt-1">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 border-l-4 border-secondary-500 bg-gray-50">
                <div className="bg-secondary-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-secondary-600" />
                </div>
                <div>
                  <p className="font-medium">Event Reminder</p>
                  <p className="text-gray-600 text-sm">Mock Interview Session starts in 2 hours. Don't forget to prepare!</p>
                  <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 border-l-4 border-accent-500 bg-gray-50">
                <div className="bg-accent-100 p-2 rounded-full mr-3">
                  <BookOpen className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-medium">Course Update</p>
                  <p className="text-gray-600 text-sm">New module added to your Web Development Bootcamp: "Advanced React Patterns"</p>
                  <p className="text-gray-500 text-xs mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Dashboard;
