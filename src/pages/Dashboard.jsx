import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getApplicationsByUserId } from '../firebase/applicationsCollection';
import { getActiveJobs } from '../firebase/jobsCollection';
import { getInterviewsByCandidateId } from '../firebase/interviewsCollection';
import EmployerReport from '../components/EmployerReport';
import { 
  Briefcase, 
  FileText, 
  Video, 
  Award, 
  BookOpen, 
  Bell, 
  Calendar, 
  Clock,
  ChevronRight,
  CheckCircle,
  Target,
  TrendingUp,
  AlertCircle,
  Code,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState({
    technical: { completed: 7, total: 10, lastAccessed: '2 days ago' },
    behavioral: { completed: 5, total: 8, lastAccessed: 'Yesterday' },
    caseStudy: { completed: 3, total: 5, lastAccessed: '1 week ago' },
    mockInterview: { completed: 2, total: 3, lastAccessed: 'Today' }
  });
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

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome, {currentUser?.displayName || 'Student'}</h1>
                <p className="text-gray-600 mt-1">Your placement journey dashboard</p>
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
          
          {/* Interview Preparation Progress */}
          <InterviewPrepProgress interviewPrep={interviewPrep} />

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
  <Link to={to} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center">
    <div className="p-3 rounded-full bg-gray-100 mr-4">{icon}</div>
    <div>
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  </Link>
);

const StatsCard = ({ stats }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Briefcase className="h-5 w-5 mr-2" />
      Application Stats
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="border rounded-md p-4 text-center">
          <p className="text-3xl font-bold text-primary-600">{value}</p>
          <p className="text-gray-600 capitalize">{key}</p>
        </div>
      ))}
    </div>
  </div>
);

const TrainingProgress = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold flex items-center">
        <BookOpen className="h-5 w-5 mr-2" />
        Your Training Progress
      </h2>
      <Link to="/training" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
        View All Courses <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>

    <ProgressBar title="Web Development Bootcamp" percent={75} modules="6/8" lastAccessed="Yesterday" />
    <ProgressBar title="Data Science Fundamentals" percent={40} modules="4/10" lastAccessed="3 days ago" />
    <ProgressBar title="Technical Interview Preparation" percent={90} modules="9/10" lastAccessed="Today" />
  </div>
);

const ProgressBar = ({ title, percent, modules, lastAccessed }) => (
  <div className="border rounded-md p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold">{title}</h3>
      <span className="text-primary-600 font-medium">{percent}% Complete</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percent}%` }}></div>
    </div>
    <div className="mt-3 flex justify-between text-sm text-gray-600">
      <span>Modules completed: {modules}</span>
      <span>Last accessed: {lastAccessed}</span>
    </div>
  </div>
);

const Notifications = () => (
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
  <div className="flex items-start p-3 border-l-4 border-primary-500 bg-gray-50 mb-2">
    <div className="bg-primary-100 p-2 rounded-full mr-3">{icon}</div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-gray-600 text-sm">{message}</p>
      <p className="text-gray-500 text-xs mt-1">{time}</p>
    </div>
  </div>
);

const InterviewPrepProgress = ({ interviewPrep }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold flex items-center">
        <Video className="h-5 w-5 mr-2" />
        Interview Preparation Progress
      </h2>
      <Link to="/interview-prep" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
        Practice Now <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InterviewPrepCard 
        title="Technical Interview" 
        completed={interviewPrep.technical.completed} 
        total={interviewPrep.technical.total} 
        lastAccessed={interviewPrep.technical.lastAccessed}
        icon={<Code className="h-5 w-5 text-blue-500" />}
        color="blue"
      />
      <InterviewPrepCard 
        title="Behavioral Interview" 
        completed={interviewPrep.behavioral.completed} 
        total={interviewPrep.behavioral.total} 
        lastAccessed={interviewPrep.behavioral.lastAccessed}
        icon={<Users className="h-5 w-5 text-purple-500" />}
        color="purple"
      />
      <InterviewPrepCard 
        title="Case Study Interview" 
        completed={interviewPrep.caseStudy.completed} 
        total={interviewPrep.caseStudy.total} 
        lastAccessed={interviewPrep.caseStudy.lastAccessed}
        icon={<FileText className="h-5 w-5 text-green-500" />}
        color="green"
      />
      <InterviewPrepCard 
        title="Mock Interview Sessions" 
        completed={interviewPrep.mockInterview.completed} 
        total={interviewPrep.mockInterview.total} 
        lastAccessed={interviewPrep.mockInterview.lastAccessed}
        icon={<Video className="h-5 w-5 text-red-500" />}
        color="red"
      />
    </div>
  </div>
);

const InterviewPrepCard = ({ title, completed, total, lastAccessed, icon, color }) => {
  const percent = Math.round((completed / total) * 100);
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-start mb-2">
        <div className={`p-2 rounded-full bg-${color}-100 mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>{completed}/{total} Completed</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div className={`${colorClasses[color]} h-2.5 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{percent}% Complete</span>
        <span>Last practiced: {lastAccessed}</span>
      </div>
    </div>
  );
};

export default Dashboard;
