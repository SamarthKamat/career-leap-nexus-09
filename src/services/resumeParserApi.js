// Resume Parser API Service

const RESUME_PARSER_API_BASE_URL = 'https://api.apilayer.com/resume_parser';
const RESUME_PARSER_API_KEY = import.meta.env.VITE_API_LAYER_KEY || 'DHwqX8MSv2XJdujUfOZBFEpNw7W2Ks9s';

/**
 * Parse a resume file using the Resume Parser API
 * @param {File} file - The resume file to parse (PDF, DOCX, etc.)
 * @returns {Promise<Object>} - Parsed resume data
 */
export const parseResumeFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${RESUME_PARSER_API_BASE_URL}/api/parse`, {
      method: 'POST',
      headers: {
        'apikey': RESUME_PARSER_API_KEY
      },
      body: formData,
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Server responded with ${response.status}: ${errorText}`);
      throw new Error(`Failed to parse resume: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing resume:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection or if the API endpoint is accessible.');
    }
    throw error;
  }
};

/**
 * Parse a resume from a URL using the Resume Parser API
 * @param {string} url - The URL of the resume to parse
 * @returns {Promise<Object>} - Parsed resume data
 */
export const parseResumeUrl = async (url) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${RESUME_PARSER_API_BASE_URL}/api/parse-by-url`, {
      method: 'POST',
      headers: {
        'apikey': RESUME_PARSER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Server responded with ${response.status}: ${errorText}`);
      throw new Error(`Failed to parse resume from URL: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing resume from URL:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection or if the API endpoint is accessible.');
    }
    throw error;
  }
};