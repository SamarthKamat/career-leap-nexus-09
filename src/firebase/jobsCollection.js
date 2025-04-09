// Firestore collection schema for jobs

/*
Jobs Collection Schema

Collection: 'jobs'
Document ID: auto-generated
Fields:
- title: string (required) - Job title
- company: string (required) - Company name
- location: string (required) - Job location
- locationType: string (required) - 'onsite', 'remote', or 'hybrid'
- employmentType: string (required) - 'full-time', 'part-time', 'contract', or 'internship'
- experienceLevel: string (required) - 'entry-level', 'mid-level', 'senior', or 'executive'
- salaryMin: number - Minimum salary
- salaryMax: number - Maximum salary
- description: string (required) - Job description
- requirements: string (required) - Job requirements
- benefits: string - Job benefits
- applicationDeadline: timestamp - Application deadline
- employerId: string (required) - ID of the employer who posted the job
- employerName: string (required) - Name of the employer who posted the job
- createdAt: timestamp (required) - When the job was created
- updatedAt: timestamp - When the job was last updated
- status: string (required) - 'active', 'paused', or 'expired'
- applicantCount: number - Number of applicants (default: 0)
- viewCount: number - Number of views (default: 0)
- skills: array - Required skills for the job
*/

import { db } from './config';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';

// Collection reference
const jobsCollectionRef = collection(db, 'jobs');

// Create a new job posting
export const createJob = async (jobData, employerId, employerName) => {
  try {
    const jobToAdd = {
      ...jobData,
      employerId,
      employerName,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: 'active',
      applicantCount: 0,
      viewCount: 0
    };

    const docRef = await addDoc(jobsCollectionRef, jobToAdd);
    return { id: docRef.id, ...jobToAdd };
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Get a job by ID
export const getJobById = async (jobId) => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));
    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting job:', error);
    throw error;
  }
};

// Get all jobs
export const getAllJobs = async () => {
  try {
    const querySnapshot = await getDocs(jobsCollectionRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting all jobs:', error);
    throw error;
  }
};

// Get jobs by employer ID
export const getJobsByEmployerId = async (employerId) => {
  try {
    const q = query(jobsCollectionRef, where("employerId", "==", employerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting employer jobs:', error);
    throw error;
  }
};

// Get active jobs
export const getActiveJobs = async () => {
  try {
    const q = query(
      jobsCollectionRef, 
      where("status", "==", "active"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting active jobs:', error);
    throw error;
  }
};

// Update a job
export const updateJob = async (jobId, jobData) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      ...jobData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

// Update job status
export const updateJobStatus = async (jobId, status) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      status,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating job status:', error);
    throw error;
  }
};

// Increment applicant count
export const incrementApplicantCount = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
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
    console.error('Error incrementing applicant count:', error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, 'jobs', jobId));
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};