import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getApplicationsByUserId } from '../firebase/applicationsCollection';
import { getActiveJobs } from '../firebase/jobsCollection';
import { getInterviewsByCandidateId } from '../firebase/interviewsCollection';
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
  const [applications, setApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (currentUser) {
          const userApplications = await getApplicationsByUserId(currentUser.uid);
          setApplications(userApplications);

          const activeJobs = await getActiveJobs();
          setRecentJobs(activeJobs.slice(0, 3));

          const interviews = await getInterviewsByCandidateId(currentUser.uid);
          const upcoming = interviews
            .filter(interview => interview.status === 'scheduled')
            .sort((a, b) => a.scheduledTime.seconds - b.scheduledTime.seconds)
            .slice(0, 3)
            .map(interview => ({
              id: interview.id,
              title: `Interview for ${interview.jobTitle}`,
              date: new Date(interview.scheduledTime.seconds * 1000).toLocaleDateString(),
              time: new Date(interview.scheduledTime.seconds * 1000).toLocaleTimeString(),
              type: interview.type
            }));

          setUpcomingInterviews(upcoming);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const applicationStats = {
    applied: applications.length,
    inProgress: applications.filter(app => app.status === 'new' || app.status === 'reviewed').length,
    interviews: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offered').length
  };

  return (
    <>
      <Header />

      <div className="min-h-screen pt-20 pb-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Welcome, {currentUser?.displayName || 'Student'}</h1>
                <p className="text-gray-300 mt-1">Your placement journey dashboard</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/profile" className="btn btn-primary">View Profile</Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <DashboardCard to="/jobs" icon={<Briefcase />} title="Job Listings" subtitle="Browse open positions" />
            <DashboardCard to="/resume-builder" icon={<FileText />} title="Resume Builder" subtitle="Update your resume" />
            <DashboardCard to="/interview-prep" icon={<Video />} title="Interview Prep" subtitle="Practice interviews" />
            <DashboardCard to="/achievements" icon={<Award />} title="Achievements" subtitle="View your progress" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application Stats */}
            <StatsCard stats={applicationStats} />

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
                {loading ? (
                  <div className="text-center py-4 text-gray-500">Loading...</div>
                ) : upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map(event => (
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
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">No upcoming events</div>
                )}
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
                {loading ? (
                  <div className="text-center py-4 text-gray-500">Loading...</div>
                ) : recentJobs.length > 0 ? (
                  recentJobs.map(job => (
                    <Link key={job.id} to={`/jobs/${job.id}`} className="block border rounded-md p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{job.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(job.createdAt.seconds * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{job.company}</p>
                      <p className="text-gray-500 text-sm">{job.location}</p>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">No jobs available</div>
                )}
              </div>
            </div>
          </div>

          {/* Training Progress */}
          <TrainingProgress />

          {/* Notifications */}
          <Notifications />
        </div>
      </div>

      <Footer />
    </>
  );
};

// 🧩 Reusable Subcomponents

const DashboardCard = ({ to, icon, title, subtitle }) => (
  <Link 
    to={to} 
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
    hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] hover:scale-[1.02] transition-all duration-300 flex items-center
    bg-gradient-to-br from-white/5 to-white/10 group"
  >
    <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/10">
      {React.cloneElement(icon, { className: 'h-6 w-6 text-white group-hover:text-blue-400 transition-colors duration-300' })}
    </div>
    <div>
      <h2 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors duration-300">{title}</h2>
      <p className="text-gray-300 text-sm">{subtitle}</p>
    </div>
  </Link>
);

const StatsCard = ({ stats }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-gradient-to-br from-white/5 to-white/10">
    <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
      <Briefcase className="h-5 w-5 mr-2 text-blue-400" />
      Application Stats
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(stats).map(([key, value]) => (
        <div 
          key={key} 
          className="border border-white/10 rounded-xl p-4 text-center bg-white/5 backdrop-blur-sm
          hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{value}</p>
          <p className="text-gray-300 capitalize">{key}</p>
        </div>
      ))}
    </div>
  </div>
);

const TrainingProgress = () => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold flex items-center text-white">
        <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
        Your Training Progress
      </h2>
      <Link to="/training" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors duration-300">
        View All Courses <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>

    <ProgressBar title="Web Development Bootcamp" percent={75} modules="6/8" lastAccessed="Yesterday" />
    <ProgressBar title="Data Science Fundamentals" percent={40} modules="4/10" lastAccessed="3 days ago" />
    <ProgressBar title="Technical Interview Preparation" percent={90} modules="9/10" lastAccessed="Today" />
  </div>
);

const ProgressBar = ({ title, percent, modules, lastAccessed }) => (
  <div className="border border-white/10 rounded-xl p-4 mb-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] group">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
      <span className="text-blue-400 font-medium">{percent}% Complete</span>
    </div>
    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
    <div className="mt-3 flex justify-between text-sm text-gray-300">
      <span>Modules completed: {modules}</span>
      <span>Last accessed: {lastAccessed}</span>
    </div>
  </div>
);

const Notifications = () => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold flex items-center text-white">
        <Bell className="h-5 w-5 mr-2 text-blue-400" />
        Recent Notifications
      </h2>
      <Link to="/notifications" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300">
        View All
      </Link>
    </div>

    <Notification
      icon={<Briefcase className="h-5 w-5 text-primary-600" />}
      title="Application Update"
      message="Your application for Frontend Developer at TechNova has been moved to the interview stage."
      time="1 hour ago"
    />
    <Notification
      icon={<Calendar className="h-5 w-5 text-secondary-600" />}
      title="Event Reminder"
      message="Mock Interview Session starts in 2 hours. Don't forget to prepare!"
      time="2 hours ago"
    />
    <Notification
      icon={<BookOpen className="h-5 w-5 text-accent-600" />}
      title="Course Update"
      message='New module added to your Web Development Bootcamp: "Advanced React Patterns"'
      time="1 day ago"
    />
  </div>
);

const Notification = ({ icon, title, message, time }) => (
  <div className="flex items-start p-3 border-l-4 border-blue-500/50 bg-white/5 backdrop-blur-sm mb-2 rounded-r-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] group">
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2 rounded-full mr-3 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
      {React.cloneElement(icon, { className: 'h-5 w-5 text-blue-400' })}
    </div>
    <div>
      <p className="font-medium text-white group-hover:text-blue-400 transition-colors duration-300">{title}</p>
      <p className="text-gray-300 text-sm">{message}</p>
      <p className="text-gray-400 text-xs mt-1">{time}</p>
    </div>
  </div>
);

export default Dashboard;
