
import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, ChevronDown } from 'lucide-react';

const JobCard = ({ job, onJobClick }) => {
  return (
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
        <p className="text-gray-700 line-clamp-2">{job.description}</p>
        <button 
          onClick={() => onJobClick(job.id)}
          className="mt-2 text-primary-600 hover:text-primary-800 font-medium flex items-center"
        >
          View Details <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
