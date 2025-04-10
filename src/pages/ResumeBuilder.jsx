
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Plus, Trash2, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import Header from '../components/Authheader';
import Footer from '../components/Footer';
import { toast } from 'sonner';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    experience: [
      { id: 1, company: '', position: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { id: 1, institution: '', degree: '', field: '', startDate: '', endDate: '' }
    ],
    skills: [''],
    projects: [
      { id: 1, title: '', description: '', technologies: '', link: '' }
    ],
    certificates: [
      { id: 1, name: '', issuer: '', date: '', link: '' }
    ]
  });
  
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [resumeScore, setResumeScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeLink, setResumeLink] = useState(null);
  
  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };
  
  const addExperience = () => {
    const newId = resumeData.experience.length > 0 
      ? Math.max(...resumeData.experience.map(item => item.id)) + 1 
      : 1;
      
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: newId, company: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };
  
  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  
  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };
  
  const addEducation = () => {
    const newId = resumeData.education.length > 0 
      ? Math.max(...resumeData.education.map(item => item.id)) + 1 
      : 1;
      
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { id: newId, institution: '', degree: '', field: '', startDate: '', endDate: '' }
      ]
    });
  };
  
  const updateEducation = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  
  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };
  
  const updateSkill = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({ ...resumeData, skills: newSkills });
  };
  
  const addSkill = () => {
    setResumeData({ 
      ...resumeData, 
      skills: [...resumeData.skills, ''] 
    });
  };
  
  const removeSkill = (index) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    setResumeData({ ...resumeData, skills: newSkills });
  };
  
  const addProject = () => {
    const newId = resumeData.projects.length > 0 
      ? Math.max(...resumeData.projects.map(item => item.id)) + 1 
      : 1;
      
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: newId, title: '', description: '', technologies: '', link: '' }
      ]
    });
  };
  
  const updateProject = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };
  
  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
  };
  
  const addCertificate = () => {
    const newId = resumeData.certificates.length > 0 
      ? Math.max(...resumeData.certificates.map(item => item.id)) + 1 
      : 1;
      
    setResumeData({
      ...resumeData,
      certificates: [
        ...resumeData.certificates,
        { id: newId, name: '', issuer: '', date: '', link: '' }
      ]
    });
  };
  
  const updateCertificate = (id, field, value) => {
    setResumeData({
      ...resumeData,
      certificates: resumeData.certificates.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };
  
  const removeCertificate = (id) => {
    setResumeData({
      ...resumeData,
      certificates: resumeData.certificates.filter(cert => cert.id !== id)
    });
  };
  
  // Mock AI resume scanning function
  const scanResume = () => {
    // In a real app, this would call an API for AI analysis
    const scoreCalculator = () => {
      let score = 0;
      
      // Personal Info completeness
      const personalInfoFields = Object.values(resumeData.personalInfo);
      const filledPersonalFields = personalInfoFields.filter(field => field.trim() !== '').length;
      score += (filledPersonalFields / personalInfoFields.length) * 20;
      
      // Experience quality
      if (resumeData.experience.length > 0) {
        const expQuality = resumeData.experience.reduce((sum, exp) => {
          const hasCompany = exp.company.trim() !== '';
          const hasPosition = exp.position.trim() !== '';
          const hasDesc = exp.description.length > 30;
          const hasDates = exp.startDate.trim() !== '' && exp.endDate.trim() !== '';
          
          return sum + (hasCompany + hasPosition + hasDesc + hasDates) / 4;
        }, 0) / resumeData.experience.length;
        
        score += expQuality * 30;
      }
      
      // Education completeness
      if (resumeData.education.length > 0) {
        const eduCompleteness = resumeData.education.reduce((sum, edu) => {
          const hasInstitution = edu.institution.trim() !== '';
          const hasDegree = edu.degree.trim() !== '';
          const hasField = edu.field.trim() !== '';
          const hasDates = edu.startDate.trim() !== '' && edu.endDate.trim() !== '';
          
          return sum + (hasInstitution + hasDegree + hasField + hasDates) / 4;
        }, 0) / resumeData.education.length;
        
        score += eduCompleteness * 15;
      }
      
      // Skills variety
      const validSkills = resumeData.skills.filter(skill => skill.trim() !== '').length;
      score += Math.min(validSkills, 10) * 1.5;
      
      // Projects
      if (resumeData.projects.length > 0) {
        const projQuality = resumeData.projects.reduce((sum, proj) => {
          const hasTitle = proj.title.trim() !== '';
          const hasDesc = proj.description.length > 20;
          const hasTech = proj.technologies.trim() !== '';
          
          return sum + (hasTitle + hasDesc + hasTech) / 3;
        }, 0) / resumeData.projects.length;
        
        score += projQuality * 10;
      }
      
      // Summary
      if (resumeData.summary.length > 50) {
        score += 10;
      } else if (resumeData.summary.length > 20) {
        score += 5;
      }
      
      return Math.round(score);
    };
    
    return scoreCalculator();
  };
  
  const generateResume = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const score = scanResume();
    setResumeScore(score);
    
    // In a real app, this would generate and return a PDF download link
    setResumeLink('https://example.com/resume.pdf');
    setIsGenerating(false);
    
    toast.success('Resume generated successfully!');
  };
  
  // Helper function to render the score feedback
  const renderScoreFeedback = () => {
    if (resumeScore >= 80) {
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Excellent resume! You're ready to apply.</span>
        </div>
      );
    } else if (resumeScore >= 60) {
      return (
        <div className="flex items-center text-yellow-600">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>Good resume, but could use some improvements.</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>Your resume needs significant work to be competitive.</span>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-lg text-gray-600">
              Create a professional resume that stands out to employers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Sections Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Resume Sections</h2>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('personalInfo')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'personalInfo' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Personal Information
                  </button>
                  <button
                    onClick={() => setActiveSection('summary')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'summary' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Professional Summary
                  </button>
                  <button
                    onClick={() => setActiveSection('experience')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'experience' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Work Experience
                  </button>
                  <button
                    onClick={() => setActiveSection('education')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'education' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => setActiveSection('skills')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'skills' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveSection('projects')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'projects' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setActiveSection('certificates')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'certificates' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Certifications
                  </button>
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={generateResume}
                    disabled={isGenerating}
                    className={`w-full btn btn-primary flex justify-center items-center ${
                      isGenerating ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2" />
                        Generate Resume
                      </>
                    )}
                  </button>
                  
                  {resumeScore > 0 && (
                    <div className="mt-4">
                      <div className="text-center mb-2">
                        <span className="text-sm text-gray-500">Resume Score</span>
                        <div className="text-3xl font-bold">{resumeScore}/100</div>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            resumeScore >= 80 ? 'bg-green-500' : 
                            resumeScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${resumeScore}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-sm">
                        {renderScoreFeedback()}
                      </div>
                    </div>
                  )}
                  
                  {resumeLink && (
                    <a 
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full btn btn-outline flex justify-center items-center"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Main Content - Form Fields */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Personal Information Section */}
                {activeSection === 'personalInfo' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          className="input-field"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="input-field"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="input-field"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          className="input-field"
                          placeholder="City, State"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          id="linkedin"
                          className="input-field"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                          Portfolio/Website
                        </label>
                        <input
                          type="url"
                          id="portfolio"
                          className="input-field"
                          placeholder="https://yourwebsite.com"
                          value={resumeData.personalInfo.portfolio}
                          onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Summary Section */}
                {activeSection === 'summary' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Professional Summary</h2>
                    
                    <div className="form-group">
                      <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                        Summary
                      </label>
                      <textarea
                        id="summary"
                        rows="6"
                        className="input-field"
                        placeholder="Write a concise summary of your professional background and key strengths..."
                        value={resumeData.summary}
                        onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      ></textarea>
                      <p className="text-sm text-gray-500 mt-2">
                        A good summary is 3-5 sentences highlighting your experience, skills, and career goals.
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* Experience Section */}
                {activeSection === 'experience' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Work Experience</h2>
                      <button
                        type="button"
                        onClick={addExperience}
                        className="btn btn-outline flex items-center"
                      >
                        <Plus className="h-5 w-5 mr-1" />
                        Add Experience
                      </button>
                    </div>
                    
                    {resumeData.experience.map((exp, index) => (
                      <div 
                        key={exp.id}
                        className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold mb-4">Experience {index + 1}</h3>
                          {resumeData.experience.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeExperience(exp.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <input
                              type="month"
                              className="input-field"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <input
                              type="month"
                              className="input-field"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              placeholder="Current"
                            />
                            <div className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                className="mr-2"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateExperience(exp.id, 'endDate', 'Present');
                                  } else {
                                    updateExperience(exp.id, 'endDate', '');
                                  }
                                }}
                                checked={exp.endDate === 'Present'}
                              />
                              <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                                I currently work here
                              </label>
                            </div>
                          </div>
                          
                          <div className="md:col-span-2 form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              rows="4"
                              className="input-field"
                              placeholder="Describe your responsibilities and achievements..."
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            ></textarea>
                            <p className="text-sm text-gray-500 mt-1">
                              Use bullet points and action verbs for maximum impact.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Education Section */}
                {activeSection === 'education' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Education</h2>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="btn btn-outline flex items-center"
                      >
                        <Plus className="h-5 w-5 mr-1" />
                        Add Education
                      </button>
                    </div>
                    
                    {resumeData.education.map((edu, index) => (
                      <div 
                        key={edu.id}
                        className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold mb-4">Education {index + 1}</h3>
                          {resumeData.education.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeEducation(edu.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Institution
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Degree
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              placeholder="e.g. Bachelor's, Master's, Ph.D."
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              placeholder="e.g. Computer Science, Business"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Date
                                </label>
                                <input
                                  type="month"
                                  className="input-field"
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  End Date
                                </label>
                                <input
                                  type="month"
                                  className="input-field"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Skills Section */}
                {activeSection === 'skills' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Skills</h2>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="btn btn-outline flex items-center"
                      >
                        <Plus className="h-5 w-5 mr-1" />
                        Add Skill
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            className="input-field flex-1"
                            placeholder="e.g. JavaScript, Project Management, Data Analysis"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                          />
                          {resumeData.skills.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeSkill(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <p className="mt-4 text-sm text-gray-500">
                      Add both technical and soft skills that are relevant to the jobs you're applying for.
                    </p>
                  </motion.div>
                )}
                
                {/* Projects Section */}
                {activeSection === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Projects</h2>
                      <button
                        type="button"
                        onClick={addProject}
                        className="btn btn-outline flex items-center"
                      >
                        <Plus className="h-5 w-5 mr-1" />
                        Add Project
                      </button>
                    </div>
                    
                    {resumeData.projects.map((project, index) => (
                      <div 
                        key={project.id}
                        className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold mb-4">Project {index + 1}</h3>
                          {resumeData.projects.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeProject(project.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Project Title
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              value={project.title}
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              rows="3"
                              className="input-field"
                              placeholder="Describe the project and your role in it..."
                              value={project.description}
                              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            ></textarea>
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Technologies Used
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              placeholder="e.g. React, Node.js, MongoDB"
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Project Link (optional)
                            </label>
                            <input
                              type="url"
                              className="input-field"
                              placeholder="https://github.com/yourproject"
                              value={project.link}
                              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Certifications Section */}
                {activeSection === 'certificates' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Certifications</h2>
                      <button
                        type="button"
                        onClick={addCertificate}
                        className="btn btn-outline flex items-center"
                      >
                        <Plus className="h-5 w-5 mr-1" />
                        Add Certification
                      </button>
                    </div>
                    
                    {resumeData.certificates.map((cert, index) => (
                      <div 
                        key={cert.id}
                        className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold mb-4">Certification {index + 1}</h3>
                          {resumeData.certificates.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeCertificate(cert.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Certification Name
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              value={cert.name}
                              onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Issuing Organization
                            </label>
                            <input
                              type="text"
                              className="input-field"
                              placeholder="e.g. Microsoft, AWS, Google"
                              value={cert.issuer}
                              onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date Obtained
                            </label>
                            <input
                              type="month"
                              className="input-field"
                              value={cert.date}
                              onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Credential URL (optional)
                            </label>
                            <input
                              type="url"
                              className="input-field"
                              placeholder="https://credential.net/your-credential"
                              value={cert.link}
                              onChange={(e) => updateCertificate(cert.id, 'link', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  {activeSection === 'personalInfo' ? (
                    <div></div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const sections = ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certificates'];
                        const currentIndex = sections.indexOf(activeSection);
                        setActiveSection(sections[currentIndex - 1]);
                      }}
                      className="btn btn-outline"
                    >
                      Previous Section
                    </button>
                  )}
                  
                  {activeSection === 'certificates' ? (
                    <button
                      type="button"
                      onClick={generateResume}
                      disabled={isGenerating}
                      className={`btn btn-primary ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Resume'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const sections = ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certificates'];
                        const currentIndex = sections.indexOf(activeSection);
                        setActiveSection(sections[currentIndex + 1]);
                      }}
                      className="btn btn-primary"
                    >
                      Next Section
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResumeBuilder;
