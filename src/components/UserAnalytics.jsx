import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Star
} from 'lucide-react';

const UserAnalytics = ({ userData }) => {
  if (!userData) return <p className="text-center py-4 text-gray-500">Loading analytics...</p>;

  // Extract data from userData
  const { interviewPrep } = userData;
  
  // Calculate overall completion percentage
  const totalCompleted = Object.values(interviewPrep).reduce(
    (sum, category) => sum + category.completed, 0
  );
  const totalRequired = Object.values(interviewPrep).reduce(
    (sum, category) => sum + category.total, 0
  );
  const overallCompletionRate = Math.round((totalCompleted / totalRequired) * 100);

  // Prepare data for charts
  const completionData = Object.entries(interviewPrep).map(([key, value]) => ({
    name: formatCategoryName(key),
    completed: value.completed,
    remaining: value.total - value.completed,
    completionRate: Math.round((value.completed / value.total) * 100)
  }));

  // Sample skill assessment data (would be replaced with real data from Firebase)
  const skillAssessmentData = [
    { skill: 'JavaScript', score: 85 },
    { skill: 'React', score: 78 },
    { skill: 'Node.js', score: 65 },
    { skill: 'SQL', score: 72 },
    { skill: 'Problem Solving', score: 80 },
    { skill: 'Communication', score: 90 }
  ];

  // Sample interview performance data
  const interviewPerformanceData = [
    { category: 'Technical', score: 75 },
    { category: 'Behavioral', score: 85 },
    { category: 'Problem Solving', score: 70 },
    { category: 'Communication', score: 90 },
    { category: 'Cultural Fit', score: 80 }
  ];

  // Sample weekly progress data
  const weeklyProgressData = [
    { week: 'Week 1', interviews: 2, score: 65 },
    { week: 'Week 2', interviews: 3, score: 70 },
    { week: 'Week 3', interviews: 2, score: 75 },
    { week: 'Week 4', interviews: 4, score: 82 },
    { week: 'Week 5', interviews: 3, score: 85 }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  const categoryColors = {
    technical: '#4299E1',
    behavioral: '#9F7AEA',
    caseStudy: '#48BB78',
    mockInterview: '#F56565'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold flex items-center mb-6">
        <BarChart2 className="h-5 w-5 mr-2" />
        Your Interview Preparation Analytics
      </h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <CheckCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Overall Completion</p>
            <h3 className="text-2xl font-bold">{overallCompletionRate}%</h3>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <div className="p-2 rounded-full bg-purple-100 mr-3">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Practice Sessions</p>
            <h3 className="text-2xl font-bold">{totalCompleted}</h3>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <div className="p-2 rounded-full bg-green-100 mr-3">
            <Star className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Avg. Performance</p>
            <h3 className="text-2xl font-bold">78%</h3>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <div className="p-2 rounded-full bg-yellow-100 mr-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Areas to Improve</p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Interview Preparation Progress */}
        <div>
          <h3 className="font-semibold mb-3">Interview Preparation Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Completed" fill="#4299E1" />
              <Bar dataKey="remaining" name="Remaining" fill="#CBD5E0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress Trend */}
        <div>
          <h3 className="font-semibold mb-3">Weekly Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" name="Performance Score" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="interviews" name="Interviews" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Assessment Radar */}
        <div>
          <h3 className="font-semibold mb-3">Skill Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={skillAssessmentData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Skills" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Interview Performance by Category */}
        <div>
          <h3 className="font-semibold mb-3">Interview Performance by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={interviewPerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="score"
                nameKey="category"
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
              >
                {interviewPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Personalized Recommendations</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-700 font-medium">Focus Areas</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Improve your Node.js skills with our advanced backend course
            </li>
            <li className="flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Practice more case study interviews to improve problem-solving
            </li>
            <li className="flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Schedule a mock interview session with a career coach
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function to format category names
const formatCategoryName = (key) => {
  switch(key) {
    case 'technical': return 'Technical';
    case 'behavioral': return 'Behavioral';
    case 'caseStudy': return 'Case Study';
    case 'mockInterview': return 'Mock Interview';
    default: return key;
  }
};

export default UserAnalytics;