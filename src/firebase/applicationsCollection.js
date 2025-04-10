// Firestore collection schema for job applications

/*
Applications Collection Schema

Collection: 'applications'
Document ID: auto-generated
Fields:
- jobId: string (required) - ID of the job being applied for
- userId: string (required) - ID of the user applying for the job
- employerId: string (required) - ID of the employer who posted the job
- status: string (required) - 'new', 'reviewed', 'shortlisted', 'rejected', 'interview', 'offered', 'hired', 'declined'
- appliedAt: timestamp (required) - When the application was submitted
- updatedAt: timestamp - When the application was last updated
- resumeUrl: string - URL to the user's resume
- coverLetterUrl: string - URL to the user's cover letter
- notes: string - Employer notes about the application
- rating: number - Employer rating of the candidate (1-5)
- interviewScheduled: boolean - Whether an interview has been scheduled
- interviewId: string - ID of the scheduled interview (if any)
*/

import { db } from './config';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { incrementApplicantCount } from './jobsCollection';

// Collection reference
const applicationsCollectionRef = collection(db, 'applications');

// Create a new application
export const createApplication = async (applicationData) => {
  try {
    const applicationToAdd = {
      ...applicationData,
      status: 'new',
      appliedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      interviewScheduled: false
    };

    const docRef = await addDoc(applicationsCollectionRef, applicationToAdd);
    
    // Increment the applicant count for the job
    await incrementApplicantCount(applicationData.jobId);
    
    return { id: docRef.id, ...applicationToAdd };
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

// Get an application by ID
export const getApplicationById = async (applicationId) => {
  try {
    const applicationDoc = await getDoc(doc(db, 'applications', applicationId));
    if (applicationDoc.exists()) {
      return { id: applicationDoc.id, ...applicationDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting application:', error);
    throw error;
  }
};

// Get applications by user ID
export const getApplicationsByUserId = async (userId) => {
  try {
    const q = query(
      applicationsCollectionRef, 
      where("userId", "==", userId),
      orderBy("appliedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user applications:', error);
    throw error;
  }
};

// Get applications by employer ID
export const getApplicationsByEmployerId = async (employerId) => {
  try {
    const q = query(
      applicationsCollectionRef, 
      where("employerId", "==", employerId),
      orderBy("appliedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting employer applications:', error);
    throw error;
  }
};

// Get applications by job ID
export const getApplicationsByJobId = async (jobId) => {
  try {
    const q = query(
      applicationsCollectionRef, 
      where("jobId", "==", jobId),
      orderBy("appliedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting job applications:', error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, {
      status,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// Update application
export const updateApplication = async (applicationId, applicationData) => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, {
      ...applicationData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

// Set interview for application
export const setApplicationInterview = async (applicationId, interviewId) => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, {
      interviewScheduled: true,
      interviewId,
      status: 'interview',
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error setting application interview:', error);
    throw error;
  }
};

// Delete application
export const deleteApplication = async (applicationId) => {
  try {
    await deleteDoc(doc(db, 'applications', applicationId));
    return true;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};