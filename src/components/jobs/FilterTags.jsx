
import React from 'react';
import { X } from 'lucide-react';

const FilterTags = ({ 
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  jobTypeFilter,
  setJobTypeFilter,
  experienceFilter,
  setExperienceFilter,
  resetFilters
}) => {
  const hasFilters = searchTerm || locationFilter || jobTypeFilter || experienceFilter;
  
  return (
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
      
      {hasFilters && (
        <button 
          onClick={resetFilters} 
          className="text-primary-600 text-sm hover:underline"
        >
          Reset all
        </button>
      )}
    </div>
  );
};

export default FilterTags;
