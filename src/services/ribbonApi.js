// Ribbon API Service

// Using Firebase Cloud Function as a proxy to handle CORS issues
const RIBBON_API_BASE_URL = 'https://app.ribbon.ai/be-api/v1';
const RIBBON_API_KEY = import.meta.env.VITE_RIBBON_API_KEY || 'your-api-key-here'; // Replace with actual API key in production

/**
 * Creates an interview flow with specified questions
 * @param {Object} flowData - Interview flow data
 * @param {string} flowData.org_name - Organization name
 * @param {string} flowData.title - Job title
 * @param {Array<string>} flowData.questions - Array of interview questions
 * @param {boolean} flowData.is_video_enabled - Whether to enable video recording
 * @returns {Promise<Object>} - Interview flow data with ID
 */
export const createInterviewFlow = async (flowData) => {
  try {
    console.log('Creating interview flow with API key:', RIBBON_API_KEY ? 'API key exists' : 'API key missing');
    console.log('Request payload:', JSON.stringify({
      org_name: flowData.org_name,
      title: flowData.title,
      questions: flowData.questions,
      interview_type: 'recruitment',
      is_video_enabled: flowData.is_video_enabled || true
    }));
    
    // Add timeout to fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${RIBBON_API_BASE_URL}/interview-flows`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${RIBBON_API_KEY}`,
        'content-type': 'application/json'
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({
        org_name: flowData.org_name,
        title: flowData.title,
        questions: flowData.questions,
        interview_type: 'recruitment',
        is_video_enabled: flowData.is_video_enabled || true
      }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Server responded with ${response.status}: ${errorText}`);
      throw new Error(`Failed to create interview flow: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating interview flow:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection or if the API endpoint is accessible.');
    }
    throw error;
  }
};

/**
 * Creates an interview with a single-use link
 * @param {Object} interviewData - Interview data
 * @param {string} interviewData.interview_flow_id - ID of the interview flow
 * @param {string} interviewData.interviewee_email_address - Email of the interviewee
 * @param {string} interviewData.interviewee_first_name - First name of the interviewee
 * @param {string} interviewData.interviewee_last_name - Last name of the interviewee
 * @returns {Promise<Object>} - Interview data with ID and link
 */
export const createInterview = async (interviewData) => {
  try {
    console.log('Creating interview with API key:', RIBBON_API_KEY ? 'API key exists' : 'API key missing');
    console.log('Request payload:', JSON.stringify({
      interview_flow_id: interviewData.interview_flow_id,
      interviewee_email_address: interviewData.interviewee_email_address,
      interviewee_first_name: interviewData.interviewee_first_name,
      interviewee_last_name: interviewData.interviewee_last_name
    }));
    
    // Add timeout to fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${RIBBON_API_BASE_URL}/interviews`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${RIBBON_API_KEY}`,
        'content-type': 'application/json'
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({
        interview_flow_id: interviewData.interview_flow_id,
        interviewee_email_address: interviewData.interviewee_email_address,
        interviewee_first_name: interviewData.interviewee_first_name,
        interviewee_last_name: interviewData.interviewee_last_name
      }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Server responded with ${response.status}: ${errorText}`);
      throw new Error(`Failed to create interview: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating interview:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection or if the API endpoint is accessible.');
    }
    throw error;
  }
};

/**
 * Retrieves all interviews
 * @returns {Promise<Array<Object>>} - Array of interview data
 */
export const getInterviews = async () => {
  try {
    console.log('Fetching interviews with API key:', RIBBON_API_KEY ? 'API key exists' : 'API key missing');
    
    // Add timeout to fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${RIBBON_API_BASE_URL}/interviews`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${RIBBON_API_KEY}`,
        'mode': 'cors'
      },
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Server responded with ${response.status}: ${errorText}`);
      throw new Error(`Failed to retrieve interviews: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error retrieving interviews:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection or if the API endpoint is accessible.');
    }
    throw error;
  }
};

/**
 * Retrieves a specific interview by ID
 * @param {string} interviewId - ID of the interview to retrieve
 * @returns {Promise<Object>} - Interview data
 */
export const getInterviewById = async (interviewId) => {
  try {
    console.log('Fetching interview by ID with API key:', RIBBON_API_KEY ? 'API key exists' : 'API key missing');
    
    // Add timeout to fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${RIBBON_API_BASE_URL}/interviews/${interviewId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${RIBBON_API_KEY}`,
        'mode': 'cors'
      },
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`Server responded with ${response.status}: ${errorText}`);
      throw new Error(`Failed to retrieve interview: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error retrieving interview:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    } else if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection or if the API endpoint is accessible.');
    }
    throw error;
  }
};