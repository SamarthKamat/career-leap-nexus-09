// Firestore collection schema for job postings

/*
Job Postings Collection Schema

Collection: 'jobPostings'
Document ID: auto-generated
Fields:
- title: string (required) - Job title
- company: string (required) - Company name
- location: string (required) - Job location
- employmentType: string (required) - 'full-time', 'part-time', 'contract', or 'internship'
- experienceLevel: string (required) - 'entry', 'mid', 'senior', or 'lead'
- salaryRange: {
    min: number,
    max: number,
    currency: string
  }
- description: string (required) - Detailed job description
- requirements: array - List of job requirements
- responsibilities: array - List of job responsibilities
- skills: array - Required skills
- benefits: array - Job benefits
- employerId: string (required) - ID of the employer posting the job
- status: string (required) - 'active', 'closed', 'draft'
- applicationDeadline: timestamp - Application deadline
- postedAt: timestamp (required) - When the job was posted
- updatedAt: timestamp - Last update timestamp
- applicantCount: number - Number of applications received
- views: number - Number of times the job was viewed
*/

import { db } from './config';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';

// Collection reference
const jobPostingsRef = collection(db, 'jobPostings');

// Create a new job posting
export const createJobPosting = async (jobData, employerId) => {
  try {
    const jobToAdd = {
      ...jobData,
      employerId,
      status: 'active',
      postedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      applicantCount: 0,
      views: 0
    };

    const docRef = await addDoc(jobPostingsRef, jobToAdd);
    return { id: docRef.id, ...jobToAdd };
  } catch (error) {
    console.error('Error creating job posting:', error);
    throw error;
  }
};

// Get a job posting by ID
export const getJobPostingById = async (jobId) => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobPostings', jobId));
    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting job posting:', error);
    throw error;
  }
};

// Get all active job postings
export const getActiveJobPostings = async () => {
  try {
    const q = query(
      jobPostingsRef,
      where('status', '==', 'active'),
      orderBy('postedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting active job postings:', error);
    throw error;
  }
};

// Get job postings by employer ID
export const getJobPostingsByEmployerId = async (employerId) => {
  try {
    const q = query(
      jobPostingsRef,
      where('employerId', '==', employerId),
      orderBy('postedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting employer job postings:', error);
    throw error;
  }
};

// Update a job posting
export const updateJobPosting = async (jobId, updateData) => {
  try {
    const jobRef = doc(db, 'jobPostings', jobId);
    await updateDoc(jobRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating job posting:', error);
    throw error;
  }
};

// Update job posting status
export const updateJobPostingStatus = async (jobId, status) => {
  try {
    const jobRef = doc(db, 'jobPostings', jobId);
    await updateDoc(jobRef, {
      status,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating job posting status:', error);
    throw error;
  }
};

// Increment view count
export const incrementJobPostingViews = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobPostings', jobId);
    const jobDoc = await getDoc(jobRef);
    
    if (jobDoc.exists()) {
      const currentViews = jobDoc.data().views || 0;
      await updateDoc(jobRef, {
        views: currentViews + 1,
        updatedAt: Timestamp.now()
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error incrementing job posting views:', error);
    throw error;
  }
};

// Increment applicant count
export const incrementJobPostingApplicants = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobPostings', jobId);
    const jobDoc = await getDoc(jobRef);
    
    if (jobDoc.exists()) {
      const currentCount = jobDoc.data().applicantCount || 0;
      await updateDoc(jobRef, {
        applicantCount: currentCount + 1,
        updatedAt: Timestamp.now()
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error incrementing job posting applicants:', error);
    throw error;
  }
};

// Delete a job posting
export const deleteJobPosting = async (jobId) => {
  try {
    await deleteDoc(doc(db, 'jobPostings', jobId));
    return true;
  } catch (error) {
    console.error('Error deleting job posting:', error);
    throw error;
  }
};

// Search job postings
export const searchJobPostings = async (filters) => {
  try {
    let q = query(jobPostingsRef, where('status', '==', 'active'));
    
    // Add filters
    if (filters.company) {
      q = query(q, where('company', '==', filters.company));
    }
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    if (filters.employmentType) {
      q = query(q, where('employmentType', '==', filters.employmentType));
    }
    if (filters.experienceLevel) {
      q = query(q, where('experienceLevel', '==', filters.experienceLevel));
    }
    
    // Add sorting
    q = query(q, orderBy('postedAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error searching job postings:', error);
    throw error;
  }
};