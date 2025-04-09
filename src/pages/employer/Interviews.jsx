import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Calendar, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  MessageSquare,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const Interviews = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('upcoming'); // upcoming, past, calendar
  
  // Interviews state
  const [interviews, setInterviews] = useState([]);
  const [isLoadingInterviews, setIsLoadingInterviews] = useState(true);
  const [interviewsError, setInterviewsError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  // Fetch interviews, applications, and jobs from Firestore
  useEffect(() => {
    const fetchInterviewsData = async () => {
      try {
        setIsLoadingInterviews(true);
        
        // Get all jobs posted by this employer
        const { getJobsByEmployerId } = await import('../../firebase/jobsCollection');
        const jobsData = await getJobsByEmployerId(currentUser.uid);
        setJobs(jobsData);
        
        // Get all applications for this employer
        const { getApplicationsByEmployerId } = await import('../../firebase/applicationsCollection');
        const applicationsData = await getApplicationsByEmployerId(currentUser.uid);
        setApplications(applicationsData);
        
        // Get all interviews for this employer
        const { getInterviewsByEmployerId } = await import('../../firebase/interviewsCollection');
        const interviewsData = await getInterviewsByEmployerId(currentUser.uid);
        
        // Format the interviews data
        const formattedInterviews = interviewsData.map(interview => {
          // Find the job and application this interview is for
          const job = jobsData.find(j => j.id === interview.jobId) || {};
          const application = applicationsData.find(a => a.id === interview.applicationId) || {};
          
          return {
            id: interview.id,
            candidate: {
              id: interview.candidateId,
              name: `Candidate ${interview.candidateId.substring(0, 5)}`,
              email: `candidate${interview.candidateId.substring(0, 5)}@example.com`,
              phone: '+1 (555) 000-0000'
            },
            job: {
              id: job.id || '',
              title: job.title || 'Unknown Position'
            },
            date: new Date(interview.scheduledTime.seconds * 1000).toISOString().split('T')[0],
            startTime: new Date(interview.scheduledTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            endTime: new Date((interview.scheduledTime.seconds + interview.duration * 60) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            type: interview.type || 'video',
            location: interview.location || 'Online Meeting',
            notes: interview.notes || '',
            status: interview.status || 'scheduled'
          };
        });

        setInterviews(formattedInterviews);
        setIsLoadingInterviews(false);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setInterviewsError(error.message);
        setIsLoadingInterviews(false);
      }
    };

    fetchInterviewsData();
  }, [currentUser.uid]);

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    'no-show': 'bg-yellow-100 text-yellow-700'
  };

  const statusIcons = {
    scheduled: Calendar,
    completed: CheckCircle,
    cancelled: XCircle,
    'no-show': AlertCircle
  };

  const interviewTypeIcons = {
    video: Video,
    phone: Phone,
    'in-person': MapPin
  };

  // Get current date for filtering
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

  // Filter and sort interviews
  const filteredInterviews = interviews
    .filter(interview => statusFilter === 'all' || interview.status === statusFilter)
    .filter(interview =>
      searchQuery === '' ||
      interview.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(interview => {
      if (viewMode === 'upcoming') {
        return interview.date >= currentDateString;
      } else if (viewMode === 'past') {
        return interview.date < currentDateString;
      }
      return true; // calendar view shows all
    })
    .sort((a, b) => {
      // Sort by date and then by start time
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.startTime.localeCompare(b.startTime);
    });

  const handleStatusChange = (interviewId, newStatus) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId ? { ...interview, status: newStatus } : interview
    ));
  };

  const handleDeleteInterview = (interviewId) => {
    if (window.confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      setInterviews(interviews.filter(interview => interview.id !== interviewId));
    }
  };

  // Group interviews by date for better display
  const interviewsByDate = filteredInterviews.reduce((acc, interview) => {
    if (!acc[interview.date]) {
      acc[interview.date] = [];
    }
    acc[interview.date].push(interview);
    return acc;
  }, {});

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-primary-600" />
                Interview Management
              </h1>
              
              <Link to="/employer-dashboard/interviews/schedule" className="btn btn-primary mt-4 md:mt-0">
                Schedule New Interview
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              {/* View Mode Tabs */}
              <div className="flex border rounded-md overflow-hidden">
                <button
                  className={`px-4 py-2 text-sm font-medium ${viewMode === 'upcoming' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${viewMode === 'past' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('past')}
                >
                  Past
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${viewMode === 'calendar' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar View
                </button>
              </div>
              
              {/* Search and Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder="Search interviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 text-sm">Status:</span>
                  <select
                    className="input-field py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Calendar View */}
            {viewMode === 'calendar' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">April 2025</h2>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                  {/* Calendar header */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <div key={i} className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-700">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2; // Adjust to start April on the correct day
                    return (
                      <div key={i} className={`bg-white p-2 min-h-[100px] ${day < 1 || day > 30 ? 'text-gray-400' : 'text-gray-700'}`}>
                        <div className="font-medium">{day < 1 ? 31 + day : day > 30 ? day - 30 : day}</div>
                        {filteredInterviews.map(interview => {
                          const interviewDate = new Date(interview.date);
                          if (interviewDate.getDate() === day && interviewDate.getMonth() === 3) { // April is month 3
                            return (
                              <div key={interview.id} className="mt-1 p-1 text-xs bg-blue-100 text-blue-700 rounded truncate">
                                {interview.startTime} - {interview.candidate.name}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* List View */}
            {viewMode !== 'calendar' && (
              <div className="space-y-6">
                {Object.keys(interviewsByDate).length > 0 ? (
                  Object.entries(interviewsByDate).map(([date, dayInterviews]) => (
                    <div key={date} className="space-y-4">
                      <h2 className="text-lg font-semibold border-b pb-2">{formatDate(date)}</h2>
                      
                      <div className="space-y-4">
                        {dayInterviews.map((interview) => {
                          const StatusIcon = statusIcons[interview.status];
                          const TypeIcon = interviewTypeIcons[interview.type];
                          return (
                            <div key={interview.id} className="border rounded-lg overflow-hidden">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                                {/* Time and Type */}
                                <div className="flex items-start">
                                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                    <Clock className="h-6 w-6" />
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{interview.startTime} - {interview.endTime}</h3>
                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                      <TypeIcon className="h-4 w-4 mr-1" />
                                      <span className="capitalize">{interview.type.replace('-', ' ')} Interview</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">{interview.location}</div>
                                  </div>
                                </div>
                                
                                {/* Candidate Info */}
                                <div>
                                  <div className="text-sm font-medium">Candidate</div>
                                  <div className="text-sm font-semibold mt-1">{interview.candidate.name}</div>
                                  <div className="text-sm text-gray-500 mt-1">{interview.candidate.email}</div>
                                  <div className="text-sm text-gray-500 mt-1">{interview.candidate.phone}</div>
                                </div>
                                
                                {/* Job Info */}
                                <div>
                                  <div className="text-sm font-medium">Position</div>
                                  <div className="text-sm font-semibold mt-1">{interview.job.title}</div>
                                  {interview.notes && (
                                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                      Notes: {interview.notes}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Status and Actions */}
                                <div className="flex flex-col justify-between">
                                  <div className="flex items-center justify-end">
                                    <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusColors[interview.status]}`}>
                                      <StatusIcon className="h-4 w-4 mr-1" />
                                      <span className="capitalize">{interview.status.replace('-', ' ')}</span>
                                    </span>
                                  </div>
                                  
                                  <div className="flex justify-end space-x-2 mt-2">
                                    {interview.status === 'scheduled' && interview.type === 'video' && (
                                      <button className="btn btn-sm btn-outline">
                                        Join Meeting
                                      </button>
                                    )}
                                    <Link to={`/employer-dashboard/candidates/${interview.candidate.id}/message`} className="p-1 text-gray-500 hover:text-primary-600" title="Message Candidate">
                                      <MessageSquare className="h-5 w-5" />
                                    </Link>
                                    <Link to={`/employer-dashboard/interviews/${interview.id}/edit`} className="p-1 text-gray-500 hover:text-blue-600" title="Edit Interview">
                                      <Edit className="h-5 w-5" />
                                    </Link>
                                    <button onClick={() => handleDeleteInterview(interview.id)} className="p-1 text-gray-500 hover:text-red-600" title="Delete Interview">
                                      <Trash2 className="h-5 w-5" />
                                    </button>
                                    <div className="relative group">
                                      <button className="p-1 text-gray-500 hover:text-gray-700" title="More Actions">
                                        <MoreVertical className="h-5 w-5" />
                                      </button>
                                      <div className="absolute z-10 right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        {interview.status === 'scheduled' && (
                                          <>
                                            <button
                                              onClick={() => handleStatusChange(interview.id, 'completed')}
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                              Mark as Completed
                                            </button>
                                            <button
                                              onClick={() => handleStatusChange(interview.id, 'cancelled')}
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                              Cancel Interview
                                            </button>
                                            <button
                                              onClick={() => handleStatusChange(interview.id, 'no-show')}
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                              Mark as No-Show
                                            </button>
                                          </>
                                        )}
                                        <Link
                                          to={`/employer-dashboard/interviews/${interview.id}/feedback`}
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                          Add Feedback
                                        </Link>
                                        <Link
                                          to={`/employer-dashboard/interviews/schedule?reschedule=${interview.id}`}
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                          Reschedule
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No interviews found</h3>
                    <p className="text-gray-500 mb-4">
                      {viewMode === 'upcoming' ? "You don't have any upcoming interviews scheduled." : "You don't have any past interviews."}
                    </p>
                    <Link to="/employer-dashboard/interviews/schedule" className="btn btn-primary">
                      Schedule New Interview
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Interviews;