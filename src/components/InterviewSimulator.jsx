import React, { useState, useRef } from 'react';
import { Video, Mic, Play, Square, RefreshCw, Download, CheckCircle, AlertCircle } from 'lucide-react';

const InterviewSimulator = () => {
  const [recording, setRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Sample interview questions and AI feedback
  const questions = [
    {
      id: 1,
      question: 'Tell me about yourself and your experience with web development.',
      tips: ['Focus on relevant experience', 'Keep it concise (2-3 minutes)', 'Highlight key achievements']
    },
    {
      id: 2,
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      tips: ['Use the STAR method', 'Be specific about your role', 'Emphasize problem-solving skills']
    },
    {
      id: 3,
      question: 'Where do you see yourself in 5 years?',
      tips: ['Show ambition but be realistic', 'Align with career growth', 'Demonstrate commitment to learning']
    }
  ];

  const sampleFeedback = {
    confidence_score: 85,
    eye_contact: 90,
    speech_clarity: 88,
    pace: 82,
    body_language: 85,
    improvements: [
      'Try to reduce filler words like "um" and "uh"',
      'Maintain more consistent eye contact',
      'Consider using more specific examples'
    ],
    strengths: [
      'Clear and structured responses',
      'Professional demeanor',
      'Good engagement with questions'
    ]
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const startRecording = () => {
    if (videoStream) {
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(videoStream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = simulateAIAnalysis;
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const simulateAIAnalysis = () => {
    // Simulate AI processing delay
    setTimeout(() => {
      setFeedback(sampleFeedback);
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setFeedback(null);
  };

  const renderScore = (score) => {
    const color = score >= 90 ? 'text-green-500' :
                 score >= 70 ? 'text-yellow-500' :
                 'text-red-500';
    return <span className={`text-xl font-bold ${color}`}>{score}%</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">AI Interview Simulator</h2>
          <p className="text-gray-600">Practice and get real-time feedback</p>
        </div>
      </div>

      {/* Question Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-3">Question {currentQuestion + 1}:</h3>
        <p className="text-gray-800 text-lg mb-4">{questions[currentQuestion].question}</p>
        <div className="space-y-2">
          <p className="font-medium">Tips:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {questions[currentQuestion].tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Video Preview */}
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6 relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {!videoStream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Video className="h-12 w-12 mb-4" />
            <button
              onClick={startCamera}
              className="btn btn-primary"
            >
              Start Camera
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {videoStream && (
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`btn ${recording ? 'btn-error' : 'btn-primary'} flex items-center`}
            >
              {recording ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Recording
                </>
              )}
            </button>
          )}
        </div>
        <button
          onClick={nextQuestion}
          className="btn btn-outline flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Next Question
        </button>
      </div>

      {/* AI Feedback */}
      {feedback && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">AI Analysis Results</h3>
          
          {/* Scores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Confidence</p>
              {renderScore(feedback.confidence_score)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Eye Contact</p>
              {renderScore(feedback.eye_contact)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Speech Clarity</p>
              {renderScore(feedback.speech_clarity)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Pace</p>
              {renderScore(feedback.pace)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Body Language</p>
              {renderScore(feedback.body_language)}
            </div>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Strengths</h4>
              <ul className="space-y-2">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="ml-2 text-gray-600">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Areas for Improvement</h4>
              <ul className="space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="ml-2 text-gray-600">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulator;