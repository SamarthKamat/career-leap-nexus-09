import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const ResumeScanner = () => {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      simulateScan();
    }
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

      {!file && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf"
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
            <p className="text-gray-500 text-sm">PDF format only, max 5MB</p>
          </label>
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