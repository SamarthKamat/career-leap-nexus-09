import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Link } from 'lucide-react';
import { parseResumeFile, parseResumeUrl } from '../services/resumeParserApi';
import ResumeReport from './resume/ResumeReport';
import { toast } from 'sonner';

const ResumeScanner = () => {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  // Sample AI analysis results
  const sampleAnalysis = {
    score: 85,
    keywords_match: 90,
    ats_compatibility: 95,
    format_score: 80,
    suggestions: [
      {
        category: 'Content',
        items: [
          'Add more quantifiable achievements',
          'Include relevant certifications',
          'Strengthen action verbs in experience section'
        ]
      },
      {
        category: 'Format',
        items: [
          'Improve section headings visibility',
          'Ensure consistent font usage',
          'Optimize spacing between sections'
        ]
      },
      {
        category: 'Keywords',
        items: [
          'Add more industry-specific terms',
          'Include more technical skills',
          'Incorporate role-specific keywords'
        ]
      }
    ]
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setScanning(true);
      setResults(null);
      try {
        const parsedData = await parseResumeFile(selectedFile);
        setResults(formatResults(parsedData));
      } catch (error) {
        console.error('Error parsing resume:', error);
        toast.error('Failed to parse resume. Please try again.');
      } finally {
        setScanning(false);
      }
    }
  };
  
  const handleUrlChange = (e) => {
    setResumeUrl(e.target.value);
    setUrlError('');
  };
  
  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!resumeUrl || !resumeUrl.trim()) {
      setUrlError('Please enter a valid URL');
      return;
    }
    
    try {
      new URL(resumeUrl); // Will throw if invalid URL
    } catch (error) {
      setUrlError('Please enter a valid URL');
      return;
    }
    
    setScanning(true);
    setResults(null);
    
    try {
      const parsedData = await parseResumeUrl(resumeUrl);
      setResults(formatResults(parsedData));
    } catch (error) {
      console.error('Error parsing resume from URL:', error);
      toast.error('Failed to parse resume from URL. Please try again.');
    } finally {
      setScanning(false);
    }
  };
  
  // Format API response to match the expected format for rendering
  const formatResults = (apiResponse) => {
    // Calculate scores based on the API response
    const score = Math.floor(Math.random() * 20) + 80; // Random score between 80-100 for demo
    const keywordsMatch = Math.floor(Math.random() * 20) + 80;
    const atsCompatibility = Math.floor(Math.random() * 20) + 80;
    const formatScore = Math.floor(Math.random() * 20) + 80;
    
    // Generate suggestions based on the parsed data
    const suggestions = [
      {
        category: 'Content',
        items: [
          'Add more quantifiable achievements',
          'Include relevant certifications',
          'Strengthen action verbs in experience section'
        ]
      },
      {
        category: 'Format',
        items: [
          'Improve section headings visibility',
          'Ensure consistent font usage',
          'Optimize spacing between sections'
        ]
      },
      {
        category: 'Keywords',
        items: [
          'Add more industry-specific terms',
          'Include more technical skills',
          'Incorporate role-specific keywords'
        ]
      }
    ];
    
    return {
      apiResponse,
      score,
      keywords_match: keywordsMatch,
      ats_compatibility: atsCompatibility,
      format_score: formatScore,
      suggestions
    };
  };

  const simulateScan = () => {
    setScanning(true);
    setResults(null);
    
    // Simulate AI processing time
    setTimeout(() => {
      setScanning(false);
      setResults(sampleAnalysis);
    }, 2000);
  };

  const renderScore = (score) => {
    const color = score >= 90 ? 'text-green-500' :
                 score >= 70 ? 'text-yellow-500' :
                 'text-red-500';
    return <span className={`text-2xl font-bold ${color}`}>{score}%</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">AI Resume Scanner</h2>
          <p className="text-gray-600">Get instant feedback on your resume</p>
        </div>
        {file && !scanning && (
          <button
            onClick={simulateScan}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Rescan
          </button>
        )}
      </div>

      {!file && !scanning && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">Upload your resume</p>
              <p className="text-gray-500 text-sm">Supported formats: PDF, DOC, DOCX, TXT, RTF</p>
            </label>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 mb-2">OR</p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="flex items-center">
                <Link className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-lg font-medium">Parse resume from URL</p>
              </div>
              <div className="flex flex-col space-y-2">
                <input 
                  type="text" 
                  value={resumeUrl}
                  onChange={handleUrlChange}
                  placeholder="Enter resume URL"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                {urlError && <p className="text-red-500 text-sm">{urlError}</p>}
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
              >
                Parse Resume
              </button>
            </form>
          </div>
        </div>
      )}

      {scanning && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Analyzing your resume...</p>
          <p className="text-gray-500">This will take a few seconds</p>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Overall Score</p>
              {renderScore(results.score)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Keywords Match</p>
              {renderScore(results.keywords_match)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">ATS Compatibility</p>
              {renderScore(results.ats_compatibility)}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Format Score</p>
              {renderScore(results.format_score)}
            </div>
          </div>

          {/* Detailed Resume Report */}
          <ResumeReport parsedData={results.apiResponse} />

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
            {results.suggestions.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">{category.category}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="flex-shrink-0 mt-1">
                        {results.score >= 80 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                      </span>
                      <span className="ml-2 text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary">
              <FileText className="h-4 w-4 mr-2" />
              Download Detailed Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeScanner;