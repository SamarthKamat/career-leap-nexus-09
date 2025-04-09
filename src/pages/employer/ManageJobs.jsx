import React, { useState, useEffect } from 'react';
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

const { db } = await import('../../firebase/config') // make sure this path matches your setup
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const ManageJobs = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch jobs from Firebase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobPostings(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobPostings
    .filter(job => statusFilter === 'all' || job.status === statusFilter)
    .filter(job =>
      searchQuery === '' ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.postedDate) - new Date(b.postedDate);
      } else if (sortBy === 'applicants') {
        return (b.applicants || 0) - (a.applicants || 0);
      } else if (sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, { status: newStatus });
      setJobPostings(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteDoc(doc(db, 'jobs', jobId));
        setJobPostings(prev => prev.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
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

            {/* Jobs Table */}
            {loading ? (
              <p className="text-center py-10 text-gray-500">Loading jobs...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Details</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Applications</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Posted Date</th>
                      <th className="px-6 py-3">Expiry Date</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.length ? filteredJobs.map(job => {
                      const StatusIcon = statusIcons[job.status] || AlertCircle;
                      return (
                        <tr key={job.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="bg-primary-100 p-2 rounded-full">
                                <Briefcase className="h-5 w-5 text-primary-600" />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{job.title}</div>
                                <div className="text-sm text-gray-500">{job.company}</div>
                                <div className="text-xs text-gray-400">{job.location}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 capitalize text-sm">
                            {job.employmentType}<br />
                            <span className="text-gray-500">{job.locationType}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">{job.applicants || 0} Applicants</div>
                            <div className="text-xs text-gray-500">{job.views || 0} Views</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                              <StatusIcon className="w-4 h-4 mr-1" />
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{job.postedDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{job.expiryDate}</td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <Link to={`/employer-dashboard/jobs/${job.id}/edit`}>
                                <Edit className="text-blue-600 hover:text-blue-800 w-5 h-5" />
                              </Link>
                              <button onClick={() => handleDeleteJob(job.id)}>
                                <Trash2 className="text-red-600 hover:text-red-800 w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    }) : (
                      <tr>
                        <td colSpan="7" className="text-center py-10 text-gray-500">
                          No job postings found. <Link to="/employer-dashboard/post-job" className="text-primary-600 underline">Post one now</Link>.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ManageJobs;
