
import React from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  locationFilter, 
  setLocationFilter, 
  showFilters,
  setShowFilters 
}) => {
  return (
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
    </div>
  );
};

export default SearchBar;
