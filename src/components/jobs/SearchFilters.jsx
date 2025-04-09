
import React from 'react';
import SearchBar from './SearchBar';
import FilterDropdowns from './FilterDropdowns';
import FilterTags from './FilterTags';

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  jobTypeFilter,
  setJobTypeFilter,
  experienceFilter,
  setExperienceFilter,
  showFilters,
  setShowFilters,
  resetFilters
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      
      <FilterDropdowns
        showFilters={showFilters}
        jobTypeFilter={jobTypeFilter}
        setJobTypeFilter={setJobTypeFilter}
        experienceFilter={experienceFilter}
        setExperienceFilter={setExperienceFilter}
      />
      
      <FilterTags
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        jobTypeFilter={jobTypeFilter}
        setJobTypeFilter={setJobTypeFilter}
        experienceFilter={experienceFilter}
        setExperienceFilter={setExperienceFilter}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default SearchFilters;
