// Firestore collection schema for interviews

/*
Interviews Collection Schema

Collection: 'interviews'
Document ID: auto-generated
Fields:
- applicationId: string (required) - ID of the job application
- jobId: string (required) - ID of the job
- employerId: string (required) - ID of the employer
- candidateId: string (required) - ID of the candidate
- scheduledTime: timestamp (required) - When the interview is scheduled
- duration: number (required) - Duration in minutes
- type: string (required) - 'online', 'in-person', or 'phone'
- status: string (required) - 'scheduled', 'completed', 'cancelled', or 'rescheduled'
- location: string - Interview location (for in-person) or meeting link (for online)
- notes: string - Interview notes or instructions
- feedback: string - Post-interview feedback
- rating: number - Interview performance rating (1-5)
- createdAt: timestamp (required) - When the interview was created
- updatedAt: timestamp - When the interview was last updated
*/

import { db } from './config';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { setApplicationInterview } from './applicationsCollection';

// Collection reference
const interviewsCollectionRef = collection(db, 'interviews');

// Create a new interview
export const createInterview = async (interviewData) => {
  try {
    const interviewToAdd = {
      ...interviewData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: 'scheduled'
    };

    const docRef = await addDoc(interviewsCollectionRef, interviewToAdd);
    
    // Update the application with the interview ID
    await setApplicationInterview(interviewData.applicationId, docRef.id);
    
    return { id: docRef.id, ...interviewToAdd };
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
};

// Get an interview by ID
export const getInterviewById = async (interviewId) => {
  try {
    const interviewDoc = await getDoc(doc(db, 'interviews', interviewId));
    if (interviewDoc.exists()) {
      return { id: interviewDoc.id, ...interviewDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting interview:', error);
    throw error;
  }
};

// Get interviews by candidate ID
export const getInterviewsByCandidateId = async (candidateId) => {
  try {
    const q = query(
      interviewsCollectionRef, 
      where("candidateId", "==", candidateId),
      orderBy("scheduledTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting candidate interviews:', error);
    throw error;
  }
};

// Get interviews by employer ID
export const getInterviewsByEmployerId = async (employerId) => {
  try {
    const q = query(
      interviewsCollectionRef, 
      where("employerId", "==", employerId),
      orderBy("scheduledTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting employer interviews:', error);
    throw error;
  }
};

// Get interviews by job ID
export const getInterviewsByJobId = async (jobId) => {
  try {
    const q = query(
      interviewsCollectionRef, 
      where("jobId", "==", jobId),
      orderBy("scheduledTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting job interviews:', error);
    throw error;
  }
};

// Update interview status
export const updateInterviewStatus = async (interviewId, status) => {
  try {
    const interviewRef = doc(db, 'interviews', interviewId);
    await updateDoc(interviewRef, {
      status,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating interview status:', error);
    throw error;
  }
};

// Update interview
export const updateInterview = async (interviewId, interviewData) => {
  try {
    const interviewRef = doc(db, 'interviews', interviewId);
    await updateDoc(interviewRef, {
      ...interviewData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating interview:', error);
    throw error;
  }
};

// Add interview feedback
export const addInterviewFeedback = async (interviewId, feedback, rating) => {
  try {
    const interviewRef = doc(db, 'interviews', interviewId);
    await updateDoc(interviewRef, {
      feedback,
      rating,
      status: 'completed',
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error adding interview feedback:', error);
    throw error;
  }
};

// Delete interview
export const deleteInterview = async (interviewId) => {
  try {
    await deleteDoc(doc(db, 'interviews', interviewId));
    return true;
  } catch (error) {
    console.error('Error deleting interview:', error);
    throw error;
  }
};