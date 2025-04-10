import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmployerReport from '../components/EmployerReport';
import { 
  Briefcase, 
  Users, 
  FileText, 
  Bell, 
  Calendar,
  ChevronRight,
  PlusCircle,
  CheckCircle,
  Clock,
  BarChart,
  PieChart,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';

const EmployerDashboard = () => {
  const { currentUser } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({
    hiringEfficiency: 85,
    candidateQuality: 78,
    timeToHire: 22, // days
    interviewToOffer: 42, // percent
    topSkills: [
      { name: 'React', count: 28 },
      { name: 'JavaScript', count: 35 },
      { name: 'Node.js', count: 22 },
      { name: 'Python', count: 18 },
      { name: 'SQL', count: 25 }
    ]
  });
  
  // Sample dashboard data for employer
  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 24,
      posted: "April 5, 2025",
      status: "active"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      applicants: 18,
      posted: "April 8, 2025",
      status: "active"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      applicants: 12,
      posted: "April 10, 2025",
      status: "active"
    }
  ];
  
  const upcomingInterviews = [
    {
      id: 101,
      candidate: "John Smith",
      position: "Senior Frontend Developer",
      date: "April 15, 2025",
      time: "10:00 AM - 11:00 AM"
    },
    {
      id: 102,
      candidate: "Emily Johnson",
      position: "UX/UI Designer",
      date: "April 16, 2025",
      time: "2:00 PM - 3:00 PM"
    },
    {
      id: 103,
      candidate: "Michael Brown",
      position: "DevOps Engineer",
      date: "April 17, 2025",
      time: "11:00 AM - 12:00 PM"
    }
  ];
  
  const candidateStats = {
    newApplicants: 32,
    shortlisted: 15,
    interviewed: 8,
    offered: 3
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome, {currentUser?.displayName || 'Employer'}</h1>
                <p className="text-gray-600 mt-1">
                  Your recruitment dashboard
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
              to="/employer-dashboard/post-job" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <PlusCircle className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Post a Job</h2>
                <p className="text-gray-600 text-sm">Create new listing</p>
              </div>
            </Link>
            
            <Link 
              to="/employer-dashboard/manage-jobs" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-secondary-100 mr-4">
                <Briefcase className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Manage Jobs</h2>
                <p className="text-gray-600 text-sm">View your listings</p>
              </div>
            </Link>
            
            <Link 
              to="/employer-dashboard/candidates" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-accent-100 mr-4">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Candidates</h2>
                <p className="text-gray-600 text-sm">Review applications</p>
              </div>
            </Link>
            
            <Link 
              to="/employer-dashboard/interviews" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Interviews</h2>
                <p className="text-gray-600 text-sm">Schedule interviews</p>
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidate Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Candidate Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-primary-600">{candidateStats.newApplicants}</p>
                  <p className="text-gray-600">New Applicants</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-secondary-600">{candidateStats.shortlisted}</p>
                  <p className="text-gray-600">Shortlisted</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-accent-600">{candidateStats.interviewed}</p>
                  <p className="text-gray-600">Interviewed</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{candidateStats.offered}</p>
                  <p className="text-gray-600">Offered</p>
                </div>
              </div>
            </div>
            
            {/* Active Job Postings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Active Job Postings
                </h2>
                <Link to="/employer-dashboard/manage-jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {jobPostings.map(job => (
                  <div key={job.id} className="border-l-4 border-primary-500 pl-4 py-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                      <div className="flex items-center mr-4">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{job.applicants} Applicants</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Posted: {job.posted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Interviews
                </h2>
                <Link to="/interviews" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingInterviews.map(interview => (
                  <div key={interview.id} className="border-l-4 border-secondary-500 pl-4 py-2">
                    <h3 className="font-semibold">{interview.candidate}</h3>
                    <p className="text-sm text-gray-700">{interview.position}</p>
                    <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{interview.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New application received for Senior Frontend Developer</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Interview scheduled with Emily Johnson</p>
                  <p className="text-sm text-gray-600">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">New job posting created: DevOps Engineer</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Hiring Analytics */}
          <div className="mt-6">
            <EmployerReport userId={currentUser?.uid} />
          </div>
        </div>
        
        {/* Enhanced Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Employer Report Component */}
          <EmployerReport userId={currentUser?.uid} />
          
          {/* Hiring Performance Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Hiring Performance Metrics
            </h2>
            
            <div className="space-y-4">
              <MetricCard 
                title="Hiring Efficiency" 
                value={`${analyticsData.hiringEfficiency}%`} 
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                description="Overall hiring process efficiency score"
              />
              
              <MetricCard 
                title="Candidate Quality" 
                value={`${analyticsData.candidateQuality}%`} 
                icon={<Award className="h-5 w-5 text-blue-500" />}
                description="Average quality score of interviewed candidates"
              />
              
              <MetricCard 
                title="Time to Hire" 
                value={`${analyticsData.timeToHire} days`} 
                icon={<Clock className="h-5 w-5 text-yellow-500" />}
                description="Average days from job posting to offer acceptance"
              />
              
              <MetricCard 
                title="Interview to Offer Rate" 
                value={`${analyticsData.interviewToOffer}%`} 
                icon={<Target className="h-5 w-5 text-purple-500" />}
                description="Percentage of interviews that result in job offers"
              />
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Top Skills in Demand</h3>
              <div className="flex flex-wrap gap-2">
                {analyticsData.topSkills.map((skill, index) => (
                  <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {skill.name} <span className="font-semibold text-primary-600">{skill.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

const MetricCard = ({ title, value, icon, description }) => (
  <div className="border rounded-md p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="p-2 rounded-full bg-gray-100">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold mt-2 text-primary-600">{value}</p>
  </div>
);

export default EmployerDashboard;