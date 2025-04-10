import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Star, Clock, Zap, Filter, Search, TrendingUp } from 'lucide-react';

const JobRecommendations = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    matchScore: 'all',
    jobType: 'all',
    location: 'all'
  });

  // Sample user skills and preferences
  const userProfile = {
    skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'UI/UX Design'],
    experience: 2,
    preferredLocations: ['Remote', 'San Francisco, CA', 'New York, NY'],
    preferredRoles: ['Frontend Developer', 'Full Stack Developer', 'UI Developer'],
    salaryRange: {
      min: 80000,
      max: 150000
    }
  };

  // Sample recommended jobs with AI matching scores
  const sampleRecommendations = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechNova Solutions',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      postedDate: '2d ago',
      description: 'Looking for an experienced frontend developer to join our dynamic team...',
      matchReasons: [
        'Skills match: 95% alignment with your expertise',
        'Location preference match',
        'Salary range within your expectations',
        'Role aligns with your career goals'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      matchScore: 88,
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      postedDate: '1d ago',
      description: 'Join our remote team and work on cutting-edge projects...',
      matchReasons: [
        'Remote work matches your preference',
        'Tech stack aligns with your skills',
        'Company culture fits your profile',
        'Growth opportunities available'
      ]
    },
    {
      id: 3,
      title: 'UI Developer',
      company: 'DesignCraft',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$90,000 - $120,000',
      matchScore: 85,
      skills: ['React', 'JavaScript', 'CSS', 'UI/UX'],
      postedDate: '3d ago',
      description: 'Create beautiful and intuitive user interfaces for our products...',
      matchReasons: [
        'Strong UI/UX skill match',
        'Location in your preferred cities',
        'Project variety matches your interests',
        'Collaborative team environment'
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call to get personalized recommendations
    const fetchRecommendations = () => {
      setLoading(true);
      setTimeout(() => {
        setRecommendations(sampleRecommendations);
        setLoading(false);
      }, 1500);
    };

    fetchRecommendations();
  }, []);

  const filteredJobs = recommendations.filter(job => {
    if (filters.matchScore !== 'all' && job.matchScore < parseInt(filters.matchScore)) {
      return false;
    }
    if (filters.jobType !== 'all' && job.type !== filters.jobType) {
      return false;
    }
    if (filters.location !== 'all' && job.location !== filters.location) {
      return false;
    }
    return true;
  });

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">AI-Powered Job Recommendations</h2>
          <p className="text-gray-600">Personalized matches based on your profile</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="pl-10 w-full input"
            value={filters.matchScore}
            onChange={(e) => setFilters({ ...filters, matchScore: e.target.value })}
          >
            <option value="all">All Match Scores</option>
            <option value="90">90% and above</option>
            <option value="80">80% and above</option>
            <option value="70">70% and above</option>
          </select>
        </div>

        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="pl-10 w-full input"
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="all">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="pl-10 w-full input"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="all">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="New York, NY">New York, NY</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect matches...</p>
        </div>
      )}

      {/* Job Recommendations */}
      {!loading && (
        <div className="space-y-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getMatchScoreColor(job.matchScore)} flex items-center`}>
                    <Zap className="h-5 w-5 mr-1" />
                    {job.matchScore}% Match
                  </div>
                  <span className="text-sm text-gray-500 flex items-center justify-end mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.postedDate}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{job.description}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  Why this matches you
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.matchReasons.map((reason, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 mr-1 text-green-500" />
                  {job.salary}
                </div>
                <button className="btn btn-primary">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;