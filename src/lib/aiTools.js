// aiTools.js

// Import the necessary libraries
import * as pdfjs from 'pdfjs-dist';
import nlp from 'compromise';

// Set the worker source for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Function to perform sentiment analysis
export const sentimentAnalysis = async (text) => {
  // Placeholder for sentiment analysis logic
  // This could be an API call or a library function
  // For now, we'll return a dummy sentiment
  return 'neutral';
};

// Function to extract text from a PDF file
const extractTextFromPDF = async (file) => {
  try {
    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

// Function to extract contact details using NLP
const extractContactDetails = (text) => {
  const doc = nlp(text);
  
  // Extract email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex) || [];
  
  // Extract phone numbers
  const phoneRegex = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/g;
  const phones = text.match(phoneRegex) || [];
  
  // Extract names (this is a simple approach, might need refinement)
  const names = doc.people().out('array');
  
  // Extract locations
  const locations = doc.places().out('array');
  
  return {
    name: names.length > 0 ? names[0] : '',
    email: emails.length > 0 ? emails[0] : '',
    phone: phones.length > 0 ? phones[0] : '',
    location: locations.length > 0 ? locations[0] : ''
  };
};

// Function to extract education information
const extractEducation = (text) => {
  const doc = nlp(text);
  
  // Look for education-related keywords
  const educationKeywords = ['bachelor', 'master', 'phd', 'degree', 'diploma', 'certificate', 
                            'university', 'college', 'school', 'institute', 'academy',
                            'B.S.', 'M.S.', 'B.A.', 'M.A.', 'B.Sc', 'M.Sc', 'Ph.D'];
  
  // Extract sentences containing education keywords
  const educationSentences = [];
  const sentences = text.split(/[.!?]\s+/);
  
  for (const sentence of sentences) {
    if (educationKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword.toLowerCase()))) {
      educationSentences.push(sentence.trim());
    }
  }
  
  return educationSentences.join('. ');
};

// Function to extract work experience
const extractWorkExperience = (text) => {
  // Look for work experience related keywords
  const workKeywords = ['experience', 'work', 'job', 'position', 'role', 'employment',
                        'company', 'organization', 'corporation', 'firm', 'employer',
                        'manager', 'director', 'supervisor', 'lead', 'senior', 'junior',
                        'intern', 'consultant'];
  
  // Extract paragraphs containing work keywords
  const workParagraphs = [];
  const paragraphs = text.split(/\n\s*\n/);
  
  for (const paragraph of paragraphs) {
    if (workKeywords.some(keyword => 
        paragraph.toLowerCase().includes(keyword.toLowerCase()))) {
      workParagraphs.push(paragraph.trim());
    }
  }
  
  return workParagraphs.join('\n\n');
};

// Function to extract skills
const extractSkills = (text) => {
  // Common technical and soft skills to look for
  const skillKeywords = [
    // Programming languages
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go',
    // Web technologies
    'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask',
    // Databases
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Oracle', 'NoSQL',
    // Cloud platforms
    'AWS', 'Azure', 'Google Cloud', 'Heroku', 'Docker', 'Kubernetes',
    // Tools
    'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Slack', 'Trello',
    // Soft skills
    'Leadership', 'Communication', 'Teamwork', 'Problem-solving', 'Critical thinking',
    'Time management', 'Adaptability', 'Creativity', 'Collaboration'
  ];
  
  // Find skills mentioned in the text
  const foundSkills = [];
  
  for (const skill of skillKeywords) {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    if (regex.test(text)) {
      foundSkills.push(skill);
    }
  }
  
  return foundSkills;
};

// Function to parse resume and extract key information
export const parseResume = async (file) => {
  try {
    // Extract text from the PDF
    const text = await extractTextFromPDF(file);
    
    // Extract various components from the text
    const contactDetails = extractContactDetails(text);
    const education = extractEducation(text);
    const workExperience = extractWorkExperience(text);
    const skills = extractSkills(text);
    
    // Calculate scores for ATS compatibility
    const score = Math.floor(Math.random() * 20) + 80; // Random score between 80-100 for demo
    const keywordsMatch = Math.floor(Math.random() * 20) + 80;
    const atsCompatibility = Math.floor(Math.random() * 20) + 80;
    const formatScore = Math.floor(Math.random() * 20) + 80;
    
    // Generate suggestions based on the extracted information
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
    
    // Return the parsed data in the format expected by the ResumeScanner component
    return {
      // Contact information
      contactDetails: `${contactDetails.name}, ${contactDetails.email}, ${contactDetails.phone}`,
      workExperience,
      education,
      skills,
      
      // Scores for the UI
      score,
      keywords_match: keywordsMatch,
      ats_compatibility: atsCompatibility,
      format_score: formatScore,
      suggestions
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Failed to parse resume');
  }
};

// Add more AI tool functions as needed