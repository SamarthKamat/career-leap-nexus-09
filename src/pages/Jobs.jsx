import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Building, Filter, X, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Dummy job data (in a real app, this would come from Firebase)
const jobsData = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '$80,000 - $120,000',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    posted: '2 days ago',
    description: 'We are looking for a frontend developer with strong React skills to join our team. You will be responsible for building user interfaces and implementing designs.',
    logo: 'https://via.placeholder.com/50'
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'AnalyticsPro',
    location: 'Remote',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '$70,000 - $90,000',
    skills: ['SQL', 'Python', 'Excel', 'Tableau'],
    posted: '5 days ago',
    description: 'Seeking a data analyst to help us extract insights from our datasets. You will be working with large datasets and creating visualizations.',
    logo: 'https://via.placeholder.com/50'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'Contract',
    experience: '3-5 years',
    salary: '$100,000 - $130,000',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    posted: '1 week ago',
    description: 'Looking for a UX designer with strong portfolio to join our creative team. You will be working on designing user-centered digital products.',
    logo: 'https://via.placeholder.com/50'
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'ServerSide Inc',
    location: 'Austin, TX',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '$90,000 - $130,000',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    posted: '3 days ago',
    description: 'Backend developer role focusing on building scalable APIs and server-side applications. Experience with Node.js and databases required.',
    logo: 'https://via.placeholder.com/50'
  },
  {
    id: 5,
    title: 'Marketing Coordinator',
    company: 'GrowthMarketing',
    location: 'Chicago, IL',
    type: 'Part-time',
    experience: '1-2 years',
    salary: '$45,000 - $60,000',
    skills: ['Social Media', 'Content Writing', 'SEO', 'Analytics'],
    posted: '1 day ago',
    description: 'Seeking a marketing coordinator to help with our digital marketing efforts. You will be responsible for social media management, content creation, and analytics.',
    logo: 'https://via.placeholder.com/50'
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Seattle, WA',
    type: 'Full-time',
    experience: '4+ years',
    salary: '$110,000 - $150,000',
    skills: ['Product Development', 'Agile', 'User Stories', 'Market Research'],
    posted: '1 week ago',
    description: 'Experienced product manager needed to lead our product development efforts. You will work with cross-functional teams to deliver innovative products.',
    logo: 'https://via.placeholder.com/50'
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    setFilteredJobs(jobsData.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesLocation = 
        locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
        
      const matchesJobType =
        jobTypeFilter === '' || job.type.toLowerCase() === jobTypeFilter.toLowerCase();
        
      const matchesExperience =
        experienceFilter === '' || job.experience.toLowerCase().includes(experienceFilter.toLowerCase());
      
      return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
    }));
  }, [searchTerm, locationFilter, jobTypeFilter, experienceFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('');
    setExperienceFilter('');
  };

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-lg text-gray-600">
              Browse through hundreds of job listings from top companies
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Main Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search jobs, skills, or companies"
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="input-field pl-10"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                
                <button 
                  className="md:hidden btn btn-primary flex items-center justify-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </button>
                
                {/* Desktop Filter Dropdowns */}
                <div className="hidden md:flex gap-4">
                  <select
                    className="input-field"
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                  >
                    <option value="">Job Type (Any)</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  
                  <select
                    className="input-field"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                  >
                    <option value="">Experience (Any)</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>
              
              {/* Mobile Filters */}
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden space-y-4 border-t border-gray-200 pt-4"
                >
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                      className="input-field"
                      value={jobTypeFilter}
                      onChange={(e) => setJobTypeFilter(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <select
                      className="input-field"
                      value={experienceFilter}
                      onChange={(e) => setExperienceFilter(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                </motion.div>
              )}
              
              {/* Filter Tags & Reset */}
              <div className="flex flex-wrap gap-2 mt-4">
                {searchTerm && (
                  <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-primary-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {locationFilter && (
                  <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Location: {locationFilter}
                    <button onClick={() => setLocationFilter('')} className="ml-2 hover:text-primary-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {jobTypeFilter && (
                  <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Type: {jobTypeFilter}
                    <button onClick={() => setJobTypeFilter('')} className="ml-2 hover:text-primary-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {experienceFilter && (
                  <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                    Experience: {experienceFilter}
                    <button onClick={() => setExperienceFilter('')} className="ml-2 hover:text-primary-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {(searchTerm || locationFilter || jobTypeFilter || experienceFilter) && (
                  <button 
                    onClick={resetFilters} 
                    className="text-primary-600 text-sm hover:underline"
                  >
                    Reset all
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
          </div>
          
          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    {/* Company Logo */}
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Job Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <div className="flex items-center mt-1">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{job.company}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{job.location}</span>
                      </div>
                      <div className="mt-2">
                        <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded">
                          {job.type}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          Posted {job.posted}
                        </span>
                      </div>
                      
                      {/* Skills */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Salary and Apply Button */}
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start md:items-end">
                      <div className="text-lg font-bold text-gray-900">{job.salary}</div>
                      <div className="text-sm text-gray-600 mb-4">{job.experience}</div>
                      <button className="btn btn-primary">Apply Now</button>
                    </div>
                  </div>
                  
                  {/* Job Description */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700">{job.description}</p>
                    <button className="mt-2 text-primary-600 hover:text-primary-800 font-medium flex items-center">
                      View Details <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find more results.
                </p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 btn btn-outline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
