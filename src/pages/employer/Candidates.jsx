import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronDown, 
  Mail, 
  Calendar, 
  Download, 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Phone,
  MessageSquare,
  Upload,
  Link as LinkIcon,
  Loader2,
  AlertCircle
} from 'lucide-react';

const Candidates = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Resume Checker States
  const [resumeUrl, setResumeUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [showResumeChecker, setShowResumeChecker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Sample candidate data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      jobTitle: "Senior Frontend Developer",
      jobId: 1,
      appliedDate: "April 12, 2025",
      status: "shortlisted",
      rating: 4,
      resumeUrl: "#",
      coverLetterUrl: "#",
      experience: "5 years",
      skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"]
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 (555) 987-6543",
      jobTitle: "UX/UI Designer",
      jobId: 2,
      appliedDate: "April 10, 2025",
      status: "interview",
      rating: 5,
      resumeUrl: "#",
      coverLetterUrl: "#",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping"]
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 456-7890",
      jobTitle: "DevOps Engineer",
      jobId: 3,
      appliedDate: "April 15, 2025",
      status: "new",
      rating: 3,
      resumeUrl: "#",
      coverLetterUrl: "#",
      experience: "3 years",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 789-0123",
      jobTitle: "Senior Frontend Developer",
      jobId: 1,
      appliedDate: "April 11, 2025",
      status: "rejected",
      rating: 2,
      resumeUrl: "#",
      coverLetterUrl: "#",
      experience: "2 years",
      skills: ["JavaScript", "React", "CSS", "HTML"]
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1 (555) 234-5678",
      jobTitle: "UX/UI Designer",
      jobId: 2,
      appliedDate: "April 14, 2025",
      status: "new",
      rating: 4,
      resumeUrl: "#",
      coverLetterUrl: "#",
      experience: "6 years",
      skills: ["Sketch", "Adobe XD", "UI Design", "UX Research"]
    }
  ]);

  // Sample job postings for filter
  const jobPostings = [
    { id: 1, title: "Senior Frontend Developer" },
    { id: 2, title: "UX/UI Designer" },
    { id: 3, title: "DevOps Engineer" },
    { id: 4, title: "Marketing Specialist" },
    { id: 5, title: "Backend Developer" }
  ];

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-yellow-100 text-yellow-700',
    interview: 'bg-purple-100 text-purple-700',
    hired: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    new: Clock,
    shortlisted: Star,
    interview: Calendar,
    hired: CheckCircle,
    rejected: XCircle
  };

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter(candidate => jobFilter === 'all' || candidate.jobId === parseInt(jobFilter))
    .filter(candidate => statusFilter === 'all' || candidate.status === statusFilter)
    .filter(candidate =>
      searchQuery === '' ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
    ));
  };

  // Resume Checker Functions
  const parseResumeUrl = async () => {
    if (!resumeUrl || !apiKey) {
      setError('Please provide both a resume URL and API key');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResumeData(null);

    try {
      // Encode the URL
      const encodedUrl = encodeURIComponent(resumeUrl);
      const response = await fetch(`https://api.apilayer.com/resume_parser/url?url=${encodedUrl}`, {
        method: 'GET',
        headers: {
          'apikey': apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed: Please check your API key is valid and active');
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();
      setResumeData(data);
    } catch (err) {
      setError(err.message || 'Failed to parse resume. Please check your URL and API key.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Reset any previous data
      setResumeData(null);
      setError(null);
    }
  };

  // Function to parse uploaded resume file
  const parseUploadedResume = async () => {
    if (!uploadedFile || !apiKey) {
      setError('Please provide both a resume file and API key');
      return;
    }

    setIsLoading(true);
    setIsUploading(true);
    setError(null);
    setResumeData(null);
    setUploadProgress(0);

    try {
      // Create FormData object to send the file
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      
      // Create a promise to handle the async operation
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else if (xhr.status === 401) {
            reject(new Error('Authentication failed: Please check your API key is valid and active'));
          } else {
            reject(new Error(`Error: ${xhr.status} - ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error occurred'));
        };
      });

      // Open and send the request
      xhr.open('POST', 'https://api.apilayer.com/resume_parser/upload');
      xhr.setRequestHeader('apikey', apiKey);
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.send(formData);

      // Wait for the upload to complete
      const data = await uploadPromise;
      setResumeData(data);
    } catch (err) {
      setError(err.message || 'Failed to parse resume. Please check your file and API key.');
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  // Function to parse resume (either URL or file)
  const parseResume = () => {
    if (uploadedFile) {
      parseUploadedResume();
    } else {
      parseResumeUrl();
    }
  };

  const toggleResumeChecker = () => {
    setShowResumeChecker(!showResumeChecker);
    // Reset states when toggling
    if (!showResumeChecker) {
      setResumeUrl('');
      setResumeData(null);
      setError(null);
    }
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold flex items-center">
                <Users className="mr-2 h-6 w-6 text-primary-600" />
                Candidates
              </h1>
              <button 
                onClick={toggleResumeChecker}
                className={`btn ${showResumeChecker ? 'btn-secondary' : 'btn-primary'}`}
              >
                {showResumeChecker ? 'Hide Resume Checker' : 'Resume Checker'}
              </button>
            </div>
            
            {/* Resume Checker Section */}
            {showResumeChecker && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary-600" />
                  Resume Checker
                </h2>
                <p className="text-gray-600 mb-4">
                  Parse any resume to extract structured data including skills, education, and experience.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                      APILayer API Key
                    </label>
                    <p className="text-xs text-gray-500 mb-1">Get your API key from <a href="https://apilayer.com/marketplace/resume_parser-api" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">APILayer Resume Parser</a></p>
                    <input
                      type="password"
                      id="apiKey"
                      className="input-field w-full"
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2">Choose an option:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* URL Input Option */}
                    <div className="border rounded-lg p-4 hover:border-primary-500 transition-colors">
                      <h4 className="font-medium mb-2 flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2 text-primary-600" />
                        Parse from URL
                      </h4>
                      <div className="relative">
                        <input
                          type="url"
                          id="resumeUrl"
                          className="input-field w-full"
                          placeholder="https://example.com/resume.pdf"
                          value={resumeUrl}
                          onChange={(e) => {
                            setResumeUrl(e.target.value);
                            setUploadedFile(null); // Clear any uploaded file
                          }}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    
                    {/* File Upload Option */}
                    <div className="border rounded-lg p-4 hover:border-primary-500 transition-colors">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Upload className="h-4 w-4 mr-2 text-primary-600" />
                        Upload Resume
                      </h4>
                      <div className="flex flex-col space-y-2">
                        <input
                          type="file"
                          id="resumeFile"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          disabled={isLoading}
                        />
                        <label 
                          htmlFor="resumeFile" 
                          className="btn btn-outline w-full flex items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploadedFile ? 'Change File' : 'Select File'}
                        </label>
                        {uploadedFile && (
                          <div className="text-sm text-gray-600 truncate">
                            Selected: {uploadedFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={parseResume} 
                    disabled={isLoading || (!resumeUrl && !uploadedFile) || !apiKey}
                    className="btn btn-primary"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isUploading ? `Uploading ${uploadProgress}%` : 'Processing...'}
                      </>
                    ) : 'Parse Resume'}
                  </button>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}
                
                {/* Resume Data Display */}
                {resumeData && (
                  <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-white p-4">
                      <h3 className="text-lg font-semibold mb-4">Parsed Resume Data</h3>
                      
                      {/* Basic Info */}
                      <div className="mb-4 pb-4 border-b">
                        <h4 className="text-md font-medium mb-2">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-500 text-sm">Name:</span>
                            <p className="font-medium">{resumeData.name || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">Email:</span>
                            <p className="font-medium">{resumeData.email || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="mb-4 pb-4 border-b">
                        <h4 className="text-md font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills && resumeData.skills.length > 0 ? (
                            resumeData.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No skills found</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Education */}
                      <div className="mb-4 pb-4 border-b">
                        <h4 className="text-md font-medium mb-2">Education</h4>
                        {resumeData.education && resumeData.education.length > 0 ? (
                          <div className="space-y-3">
                            {resumeData.education.map((edu, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded">
                                <p className="font-medium">{edu.name || 'Unknown Institution'}</p>
                                {edu.dates && <p className="text-sm text-gray-600">Year: {edu.dates}</p>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No education history found</p>
                        )}
                      </div>
                      
                      {/* Experience */}
                      <div>
                        <h4 className="text-md font-medium mb-2">Experience</h4>
                        {resumeData.experience && resumeData.experience.length > 0 ? (
                          <div className="space-y-3">
                            {resumeData.experience.map((exp, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded">
                                <p className="font-medium">{exp.title || 'Unknown Position'}</p>
                                <p className="text-sm">{exp.organization || 'Unknown Company'}</p>
                                <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-600">
                                  {exp.dates && <span>Period: {exp.dates}</span>}
                                  {exp.location && <span>Location: {exp.location}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No work experience found</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input-field pl-10 w-full"
                  placeholder="Search candidates by name, email, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 text-sm">Job:</span>
                  <select
                    className="input-field py-1"
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                  >
                    <option value="all">All Jobs</option>
                    {jobPostings.map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 text-sm">Status:</span>
                  <select
                    className="input-field py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interview">Interview</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
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
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Candidates List */}
            <div className="space-y-4">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => {
                  const StatusIcon = statusIcons[candidate.status];
                  return (
                    <div key={candidate.id} className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                        {/* Candidate Info */}
                        <div className="md:col-span-2">
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold">
                              {candidate.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold">{candidate.name}</h3>
                              <p className="text-gray-600 text-sm">{candidate.jobTitle}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Mail className="h-4 w-4 mr-1" />
                                <span>{candidate.email}</span>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Phone className="h-4 w-4 mr-1" />
                                <span>{candidate.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Application Details */}
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Applied on {candidate.appliedDate}</div>
                          <div className="text-sm text-gray-500 mb-1">Experience: {candidate.experience}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {candidate.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{candidate.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Status and Actions */}
                        <div className="flex flex-col justify-between">
                          <div className="flex items-center justify-end">
                            <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusColors[candidate.status]}`}>
                              <StatusIcon className="h-4 w-4 mr-1" />
                              <span className="capitalize">{candidate.status}</span>
                            </span>
                          </div>
                          
                          <div className="flex justify-end space-x-2 mt-2">
                            <button className="p-1 text-gray-500 hover:text-primary-600" title="Download Resume">
                              <Download className="h-5 w-5" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-primary-600" title="View Resume">
                              <FileText className="h-5 w-5" />
                            </button>
                            <Link to={`/employer-dashboard/candidates/${candidate.id}/message`} className="p-1 text-gray-500 hover:text-primary-600" title="Message">
                              <MessageSquare className="h-5 w-5" />
                            </Link>
                            <Link to={`/employer-dashboard/candidates/${candidate.id}`} className="btn btn-sm btn-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-2">
                        <div className="relative group">
                          <button className="btn btn-sm btn-outline flex items-center">
                            Change Status <ChevronDown className="ml-1 h-4 w-4" />
                          </button>
                          <div className="absolute z-10 right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <button
                              onClick={() => handleStatusChange(candidate.id, 'new')}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Mark as New
                            </button>
                            <button
                              onClick={() => handleStatusChange(candidate.id, 'shortlisted')}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Shortlist
                            </button>
                            <button
                              onClick={() => handleStatusChange(candidate.id, 'interview')}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Schedule Interview
                            </button>
                            <button
                              onClick={() => handleStatusChange(candidate.id, 'hired')}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Mark as Hired
                            </button>
                            <button
                              onClick={() => handleStatusChange(candidate.id, 'rejected')}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/employer-dashboard/interviews/schedule/${candidate.id}`} 
                          className="btn btn-primary btn-sm"
                        >
                          Schedule Interview
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No candidates found matching the criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Candidates;
