
import React from 'react';

const NoJobsFound = ({ resetFilters }) => {
  return (
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
  );
};

export default NoJobsFound;
