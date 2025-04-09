import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Briefcase, MapPin, DollarSign, Clock, Calendar, Users, Info } from 'lucide-react';

const PostJob = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    locationType: 'onsite', // onsite, remote, hybrid
    employmentType: 'full-time', // full-time, part-time, contract, internship
    experienceLevel: 'mid-level', // entry-level, mid-level, senior, executive
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: '',
    applicationDeadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically save the job posting to your database
      // For example using Firebase:
      // const { doc, setDoc, collection } = await import('firebase/firestore');
      // const { db } = await import('../../firebase/config');
      // const jobRef = doc(collection(db, "jobs"));
      // await setDoc(jobRef, {
      //   ...formData,
      //   employerId: currentUser.uid,
      //   employerName: currentUser.displayName,
      //   createdAt: new Date(),
      //   status: 'active'
      // });
      
      // Show success message
      alert('Job posted successfully!');
      
      // Redirect to manage jobs page
      navigate('/employer-dashboard/manage-jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
              <Briefcase className="mr-2 h-6 w-6 text-primary-600" />
              Post a New Job
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Basics */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Job Basics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="e.g. Acme Inc."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input-field w-full pl-10"
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="locationType" className="block text-sm font-medium text-gray-700 mb-1">
                      Location Type*
                    </label>
                    <select
                      id="locationType"
                      name="locationType"
                      value={formData.locationType}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                    >
                      <option value="onsite">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="employmentType"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        required
                        className="input-field w-full pl-10"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="experienceLevel"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        required
                        className="input-field w-full pl-10"
                      >
                        <option value="entry-level">Entry Level</option>
                        <option value="mid-level">Mid Level</option>
                        <option value="senior">Senior</option>
                        <option value="executive">Executive</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Min)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="salaryMin"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className="input-field w-full pl-10"
                        placeholder="e.g. 50000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Max)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="salaryMax"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className="input-field w-full pl-10"
                        placeholder="e.g. 80000"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="applicationDeadline"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      className="input-field w-full pl-10"
                    />
                  </div>
                </div>
              </div>
              
              {/* Job Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Job Details</h2>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field w-full"
                    placeholder="Describe the role, responsibilities, and ideal candidate..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements*
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input-field w-full"
                    placeholder="List the skills, qualifications, and experience required..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Use bullet points for better readability (e.g. - 3+ years of experience)
                  </p>
                </div>
                
                <div>
                  <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    rows={4}
                    className="input-field w-full"
                    placeholder="List the benefits, perks, and advantages of working at your company..."
                  ></textarea>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Your job posting will be reviewed before being published. Make sure all information is accurate and follows our community guidelines.
                </p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/employer-dashboard')}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PostJob;