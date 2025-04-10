import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInterviewById } from '../services/ribbonApi';
import { MessageSquare, User, Clock, ArrowLeft, Loader } from 'lucide-react';

const InterviewResults = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        setLoading(true);
        const data = await getInterviewById(interviewId);
        setInterview(data);
      } catch (err) {
        console.error('Error fetching interview:', err);
        setError('Failed to load interview data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (interviewId) {
      fetchInterviewData();
    }
  }, [interviewId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading interview results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Error</h3>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/interview-prep')} 
          className="mt-4 btn btn-outline"
        >
          Back to Interview Prep
        </button>
      </div>
    );
  }

  if (!interview || !interview.interview_data) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Interview Not Found</h3>
        <p>The interview you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/interview-prep')} 
          className="mt-4 btn btn-outline"
        >
          Back to Interview Prep
        </button>
      </div>
    );
  }

  const { transcript, transcript_with_timestamp, status } = interview.interview_data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/interview-prep')} 
          className="btn btn-ghost mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold">Interview Results</h2>
          <p className="text-gray-600">Review your interview performance</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-600" />
            <span className="font-medium">Interview ID: {interviewId}</span>
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {status || 'Completed'}
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Interview Transcript</h3>
        
        {transcript_with_timestamp && transcript_with_timestamp.length > 0 ? (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            {transcript_with_timestamp.map((entry, index) => (
              <div key={index} className={`flex ${entry.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${entry.role === 'agent' ? 'bg-gray-200' : 'bg-primary-100'}`}>
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-sm">
                      {entry.role === 'agent' ? 'AI Interviewer' : 'You'}
                    </span>
                    {entry.words && entry.words.length > 0 && (
                      <span className="text-xs text-gray-500 ml-2">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {Math.round(entry.words[0].start)}s
                      </span>
                    )}
                  </div>
                  <p>{entry.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : transcript ? (
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
            {transcript}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No transcript available for this interview.</p>
          </div>
        )}
      </div>

      {/* AI Analysis Section - This would be expanded with actual analysis data */}
      <div>
        <h3 className="text-lg font-medium mb-4">AI Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 mb-4">
            Based on your interview performance, here's an analysis of your responses:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h4 className="font-medium mb-1">Communication</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">85% - Very Good</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h4 className="font-medium mb-1">Relevance</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">90% - Excellent</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h4 className="font-medium mb-1">Confidence</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">75% - Good</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Strengths:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Clear and structured responses</li>
                <li>Good use of specific examples</li>
                <li>Professional communication style</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Areas for Improvement:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Consider reducing filler words</li>
                <li>Provide more quantifiable achievements</li>
                <li>Expand on technical skills when relevant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;