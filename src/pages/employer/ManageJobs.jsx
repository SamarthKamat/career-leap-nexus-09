import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const ManageJobs = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Sample job postings data
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      locationType: "hybrid",
      employmentType: "full-time",
      postedDate: "April 5, 2025",
      expiryDate: "May 5, 2025",
      applicants: 24,
      status: "active",
      views: 156,
      description: "We are looking for a Senior Frontend Developer to join our team...",
      salary: "$120,000 - $150,000"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      locationType: "remote",
      employmentType: "full-time",
      postedDate: "April 8, 2025",
      expiryDate: "May 8, 2025",
      applicants: 18,
      status: "active",
      views: 98,
      description: "We are seeking a talented UX/UI Designer to create amazing user experiences...",
      salary: "$90,000 - $120,000"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      locationType: "onsite",
      employmentType: "full-time",
      postedDate: "April 10, 2025",
      expiryDate: "May 10, 2025",
      applicants: 12,
      status: "active",
      views: 76,
      description: "Join our DevOps team to build and maintain our infrastructure...",
      salary: "$130,000 - $160,000"
    },
    {
      id: 4,
      title: "Marketing Specialist",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      locationType: "hybrid",
      employmentType: "part-time",
      postedDate: "March 15, 2025",
      expiryDate: "April 15, 2025",
      applicants: 32,
      status: "expired",
      views: 210,
      description: "We're looking for a Marketing Specialist to help grow our brand...",
      salary: "$70,000 - $90,000"
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      locationType: "remote",
      employmentType: "contract",
      postedDate: "April 2, 2025",
      expiryDate: "May 2, 2025",
      applicants: 15,
      status: "paused",
      views: 88,
      description: "Join our backend team to develop robust APIs and services...",
      salary: "$110,000 - $140,000"
    }
  ]);

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    expired: 'bg-red-100 text-red-700',
    draft: 'bg-gray-100 text-gray-700'
  };

  const statusIcons = {
    active: CheckCircle,
    paused: Clock,
    expired: XCircle,
    draft: AlertCircle
  };

  // Filter and sort job postings
  const filteredJobs = jobPostings
    .filter(job => statusFilter === 'all' || job.status === statusFilter)
    .filter(job =>
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.postedDate) - new Date(b.postedDate);
      } else if (sortBy === 'applicants') {
        return b.applicants - a.applicants;
      } else if (sortBy === 'views') {
        return b.views - a.views;
      }
      return 0;
    });

  const handleStatusChange = (jobId, newStatus) => {
    setJobPostings(jobPostings.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      setJobPostings(jobPostings.filter(job => job.id !== jobId));
    }
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-primary-600" />
                Manage Job Postings
              </h1>
              
              <Link to="/employer-dashboard/post-job" className="btn btn-primary mt-4 md:mt-0">
                Post a New Job
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input-field pl-10 w-full"
                  placeholder="Search job postings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 text-sm">Status:</span>
                  <select
                    className="input-field py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="expired">Expired</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 text-sm">Sort:</span>
                  <select
                    className="input-field py-1"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="applicants">Most Applicants</option>
                    <option value="views">Most Views</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Job Postings Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => {
                      const StatusIcon = statusIcons[job.status];
                      return (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-primary-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                <div className="text-sm text-gray-500">{job.company}</div>
                                <div className="text-xs text-gray-500">{job.location}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 capitalize">{job.employmentType.replace('-', ' ')}</div>
                            <div className="text-sm text-gray-500 capitalize">{job.locationType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-900">{job.applicants} Applicants</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Eye className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">{job.views} Views</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[job.status]}`}>
                              <StatusIcon className="h-4 w-4 mr-1" />
                              <span className="capitalize">{job.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.postedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.expiryDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link to={`/employer-dashboard/jobs/${job.id}/applicants`} className="text-primary-600 hover:text-primary-900" title="View Applicants">
                                <Users className="h-5 w-5" />
                              </Link>
                              <Link to={`/employer-dashboard/jobs/${job.id}/edit`} className="text-blue-600 hover:text-blue-900" title="Edit Job">
                                <Edit className="h-5 w-5" />
                              </Link>
                              <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-900" title="Delete Job">
                                <Trash2 className="h-5 w-5" />
                              </button>
                              <div className="relative group">
                                <button className="text-gray-600 hover:text-gray-900" title="More Actions">
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                                <div className="absolute z-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                  {job.status === 'active' ? (
                                    <button
                                      onClick={() => handleStatusChange(job.id, 'paused')}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      Pause Job
                                    </button>
                                  ) : job.status === 'paused' ? (
                                    <button
                                      onClick={() => handleStatusChange(job.id, 'active')}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      Activate Job
                                    </button>
                                  ) : job.status === 'expired' ? (
                                    <button
                                      onClick={() => handleStatusChange(job.id, 'active')}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      Renew Job
                                    </button>
                                  ) : null}
                                  <Link
                                    to={`/jobs/${job.id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  >
                                    View Public Listing
                                  </Link>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  >
                                    Duplicate Job
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No job postings found. <Link to="/employer-dashboard/post-job" className="text-primary-600 hover:underline">Post a new job</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ManageJobs;