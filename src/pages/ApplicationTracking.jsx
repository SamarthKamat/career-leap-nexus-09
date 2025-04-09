import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  Filter,
  Search,
  Plus
} from 'lucide-react';

const ApplicationTracking = () => {
  const { currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample application data
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'TechNova Solutions',
      position: 'Frontend Developer',
      location: 'San Francisco, CA',
      appliedDate: '2025-03-15',
      status: 'interview',
      nextStep: 'Technical Interview',
      nextStepDate: '2025-03-20',
      notes: 'Completed initial screening call. Technical interview scheduled.',
      salary: '$120,000 - $150,000'
    },
    {
      id: 2,
      company: 'DataViz Corp',
      position: 'Data Analyst',
      location: 'New York, NY',
      appliedDate: '2025-03-10',
      status: 'applied',
      nextStep: 'Waiting for response',
      nextStepDate: null,
      notes: 'Application submitted through company website',
      salary: '$90,000 - $110,000'
    },
    {
      id: 3,
      company: 'InnovateTech',
      position: 'Software Engineer',
      location: 'Remote',
      appliedDate: '2025-03-05',
      status: 'rejected',
      nextStep: null,
      nextStepDate: null,
      notes: 'Position filled internally',
      salary: '$130,000 - $160,000'
    },
    {
      id: 4,
      company: 'DesignCraft',
      position: 'UX Designer',
      location: 'Austin, TX',
      appliedDate: '2025-03-18',
      status: 'offer',
      nextStep: 'Review offer letter',
      nextStepDate: '2025-03-25',
      notes: 'Received offer letter. Need to review compensation package.',
      salary: '$100,000 - $125,000'
    }
  ]);

  const statusColors = {
    applied: 'bg-blue-100 text-blue-700',
    interview: 'bg-yellow-100 text-yellow-700',
    offer: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    applied: AlertCircle,
    interview: Clock,
    offer: CheckCircle,
    rejected: XCircle
  };

  const filteredApplications = applications
    .filter(app => filterStatus === 'all' || app.status === filterStatus)
    .filter(app =>
      searchQuery === '' ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interview: applications.filter(app => app.status === 'interview').length,
    offer: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Application Tracking</h1>
                <p className="text-gray-600">Track and manage your job applications</p>
              </div>
              <button className="btn btn-primary flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Application
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Briefcase className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Applied</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Interviewing</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.interview}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Offers</p>
                  <p className="text-2xl font-bold text-green-600">{stats.offer}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by company or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full input"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company & Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Step</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{app.company}</div>
                          <div className="text-gray-500">{app.position}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {app.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                          {React.createElement(statusIcons[app.status], { className: 'h-4 w-4 mr-1' })}
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {app.nextStep && (
                          <div>
                            <div>{app.nextStep}</div>
                            {app.nextStepDate && (
                              <div className="text-xs text-gray-400">
                                {new Date(app.nextStepDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{app.salary}</td>
                    </tr>
                  ))}
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

export default ApplicationTracking;