
import React from 'react';
import { motion } from 'framer-motion';

const FilterDropdowns = ({ 
  showFilters, 
  jobTypeFilter,
  setJobTypeFilter,
  experienceFilter,
  setExperienceFilter 
}) => {
  return (
    <>
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
    </>
  );
};

export default FilterDropdowns;
