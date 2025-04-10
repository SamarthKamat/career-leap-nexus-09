import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
const { db } = await import('../firebase/config');
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchFilters from '../components/jobs/SearchFilters';
import JobList from '../components/jobs/JobList';
import ErrorBoundary from '../components/ErrorBoundary';

const JobDetails = () => {
  const location = useLocation();
  const jobId = location.pathname.split('/').pop();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const jobData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const foundJob = jobData.find(j => j.id === jobId);
        if (!foundJob) {
          setError('Job not found');
        }
        setJob(foundJob || null);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-white text-center py-10">{error}</div>;
  if (!job) return <div className="text-white text-center py-10">Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-48 h-48 object-contain rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-4xl font-semibold">
                  {job.company?.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">{job.title}</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Company Details</h2>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-600">{job.location}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {(job.skills || []).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

            </div>
            <button className="btn btn-primary w-full md:w-auto">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const jobData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllJobs(jobData);
        setFilteredJobs(jobData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    try {
      setFilteredJobs(
        allJobs.filter(job => {
          if (!job) return false;
          
          const matchesSearch =
            (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (job.skills || []).some(skill => skill?.toLowerCase().includes(searchTerm.toLowerCase()));

          const matchesLocation =
            locationFilter === '' || (job.location?.toLowerCase().includes(locationFilter.toLowerCase()) ?? false);

          const matchesJobType =
            jobTypeFilter === '' || (job.type?.toLowerCase() === jobTypeFilter.toLowerCase() ?? false);

          const matchesExperience =
            experienceFilter === '' || (job.experience?.toLowerCase().includes(experienceFilter.toLowerCase()) ?? false);

          return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
        })
      );
    } catch (err) {
      console.error('Error filtering jobs:', err);
      setError('Error filtering jobs. Please try different search criteria.');
    }
  }, [searchTerm, locationFilter, jobTypeFilter, experienceFilter, allJobs]);

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('');
    setExperienceFilter('');
  };

  if (loading) return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-700 via-primary-800 to-slate-800 flex items-center justify-center">
      <div className="text-white text-xl">Loading jobs...</div>
    </div>
  );

  if (error) return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-700 via-primary-800 to-slate-800 flex items-center justify-center">
      <div className="text-white text-xl">{error}</div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-700 via-primary-800 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-bold mb-4 text-white">Find Your Dream Job</h1>
          <p className="text-lg text-gray-200">
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
          <h2 className="text-xl font-semibold text-white">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h2>
        </div>

        {/* Job Listings */}
        <JobList jobs={filteredJobs} onJobClick={handleJobClick} resetFilters={resetFilters} />
      </div>
    </div>
  );
};

const Jobs = () => {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export { JobListing, JobDetails };
export default Jobs;
