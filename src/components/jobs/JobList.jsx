
import React from 'react';
import JobCard from './JobCard';
import NoJobsFound from './NoJobsFound';

const JobList = ({ jobs, resetFilters }) => {
  if (jobs.length === 0) {
    return <NoJobsFound resetFilters={resetFilters} />;
  }
  
  return (
    <div className="space-y-6">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
