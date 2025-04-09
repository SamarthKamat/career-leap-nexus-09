
import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchFilters from '../components/jobs/SearchFilters';
import JobList from '../components/jobs/JobList';
import jobsData from '../data/jobsData';

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
            <SearchFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              jobTypeFilter={jobTypeFilter}
              setJobTypeFilter={setJobTypeFilter}
              experienceFilter={experienceFilter}
              setExperienceFilter={setExperienceFilter}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              resetFilters={resetFilters}
            />
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
          </div>
          
          {/* Job Listings */}
          <JobList jobs={filteredJobs} resetFilters={resetFilters} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
