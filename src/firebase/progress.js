import { useEffect, useState } from 'react';
import { db } from '../firebase'; // your Firebase init
import { doc, getDoc } from 'firebase/firestore';

const useEmployerProgress = (userId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const ref = doc(db, 'users', userId); // Your path
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const userData = snap.data();
        const { progress } = userData;

        // Calculate AI metrics
        const totalInterviews = progress?.interviewsCompleted || 0;
        const assessments = progress?.skillAssessments || [];

        const conversionRate = totalInterviews > 0
          ? (assessments.length / totalInterviews) * 100
          : 0;

        const avgSkillScore = assessments.length
          ? assessments.reduce((acc, a) => acc + a.score, 0) / assessments.length
          : 0;

        // Weekly interview trend
        const weekMap = {};
        assessments.forEach(a => {
          const date = new Date(a.timestamp);
          const week = `${date.getFullYear()}-W${getWeek(date)}`;
          if (!weekMap[week]) weekMap[week] = [];
          weekMap[week].push(a.score);
        });

        const weeklySkillTrend = Object.entries(weekMap).map(([week, scores]) => ({
          week,
          avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
        }));

        setData({
          totalInterviews,
          conversionRate: conversionRate.toFixed(2),
          avgSkillScore: avgSkillScore.toFixed(2),
          weeklySkillTrend,
        });
      }
    };

    fetchProgress();
  }, [userId]);

  return data;
};

// Helper: Get week number
const getWeek = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};

export default useEmployerProgress;
