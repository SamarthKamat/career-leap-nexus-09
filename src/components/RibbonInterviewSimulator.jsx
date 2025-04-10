import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, MessageSquare, User, Briefcase, Calendar, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createInterviewFlow, createInterview, getInterviews } from '../services/ribbonApi';

const RibbonInterviewSimulator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [interviewLink, setInterviewLink] = useState('');
  const [pastInterviews, setPastInterviews] = useState([]);
  const [formData, setFormData] = useState({
    org_name: '',
    title: '',
    questions: ['', '', ''],
    is_video_enabled: true,
    interviewee_email_address: '',
    interviewee_first_name: '',
    interviewee_last_name: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch past interviews when component mounts
    fetchPastInterviews();
  }, []);

  const fetchPastInterviews = async () => {
    try {
      setLoading(true);
      const response = await getInterviews();
      if (response && response.interviews) {
        setPastInterviews(response.interviews);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching interviews:', err);
      setError('Failed to load past interviews. Please try again later.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = value;
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Step 1: Create interview flow
      const flowResponse = await createInterviewFlow({
        org_name: formData.org_name,
        title: formData.title,
        questions: formData.questions.filter(q => q.trim() !== ''),
        is_video_enabled: formData.is_video_enabled
      });
      
      if (!flowResponse || !flowResponse.interview_flow_id) {
        throw new Error('Failed to create interview flow');
      }
      
      // Step 2: Create interview with the flow ID
      const interviewResponse = await createInterview({
        interview_flow_id: flowResponse.interview_flow_id,
        interviewee_email_address: formData.interviewee_email_address,
        interviewee_first_name: formData.interviewee_first_name,
        interviewee_last_name: formData.interviewee_last_name
      });
      
      if (!interviewResponse || !interviewResponse.interview_link) {
        throw new Error('Failed to create interview');
      }
      
      // Success! Set the interview link
      setInterviewLink(interviewResponse.interview_link);
      setSuccess(true);
      
      // Refresh the list of past interviews
      fetchPastInterviews();
    } catch (err) {
      console.error('Error creating interview:', err);
      setError(err.message || 'Failed to create interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">AI-Powered Interview Simulator</h2>
          <p className="text-gray-600">Create and take AI interviews with Ribbon</p>
        </div>
      </div>

      {/* Create Interview Form */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Create New Interview</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <input
                type="text"
                name="org_name"
                value={formData.org_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Acme Inc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Frontend Developer"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Questions</label>
            {formData.questions.map((question, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`Question ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                name="interviewee_email_address"
                value={formData.interviewee_email_address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="interviewee_first_name"
                value={formData.interviewee_first_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="interviewee_last_name"
                value={formData.interviewee_last_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_video_enabled"
                checked={formData.is_video_enabled}
                onChange={(e) => setFormData(prev => ({ ...prev, is_video_enabled: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Enable video recording during interview</span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Creating Interview...
              </>
            ) : 'Create Interview'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {success && interviewLink && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Interview created successfully!</span>
            </div>
            <p className="mb-3">Your interview is ready. Use the link below to start:</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="text"
                value={interviewLink}
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-md bg-white"
              />
              <a
                href={interviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary whitespace-nowrap"
              >
                Start Interview
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Past Interviews Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Your Past Interviews</h3>
        
        {loading && !pastInterviews.length ? (
          <div className="flex justify-center items-center p-8">
            <Loader className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : pastInterviews.length > 0 ? (
          <div className="space-y-4">
            {pastInterviews.map((interview, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">
                      {interview.interview_data?.interview_flow_id || 'Interview'} #{index + 1}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Status: <span className={`font-medium ${interview.interview_data?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {interview.interview_data?.status || 'Pending'}
                      </span>
                    </p>
                  </div>
                  {interview.interview_data?.status === 'completed' && (
                    <button
                      onClick={() => navigate(`/interview-prep/results/${interview.interview_data.interview_id}`)}
                      className="btn btn-outline mt-2 md:mt-0"
                    >
                      View Results
                    </button>
                  )}
                </div>
                {interview.interview_data?.transcript && (
                  <div className="bg-gray-50 p-3 rounded-md mt-2">
                    <p className="text-sm font-medium mb-1">Transcript Preview:</p>
                    <p className="text-sm text-gray-600">
                      {interview.interview_data.transcript.substring(0, 150)}...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No past interviews found. Create your first interview above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RibbonInterviewSimulator;