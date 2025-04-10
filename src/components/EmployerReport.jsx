import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import useEmployerProgress from '../hooks/useEmployerProgress';
import { PieChartIcon, Users, CheckCircle, XCircle } from 'lucide-react';

const EmployerReport = ({ userId }) => {
  const report = useEmployerProgress(userId);

  if (!report) return <p>Loading...</p>;

  // Sample candidate status data for pie chart
  const candidateStatusData = [
    { name: 'Screening', value: 35, color: '#4299E1' },
    { name: 'Interview', value: 25, color: '#F6AD55' },
    { name: 'Technical Test', value: 15, color: '#9F7AEA' },
    { name: 'Offer', value: 10, color: '#48BB78' },
    { name: 'Rejected', value: 15, color: '#F56565' }
  ];

  // Sample skill distribution data
  const skillDistributionData = [
    { name: 'Technical', value: 45 },
    { name: 'Communication', value: 25 },
    { name: 'Problem Solving', value: 20 },
    { name: 'Leadership', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold flex items-center">
        <PieChartIcon className="h-5 w-5 mr-2" />
        AI Hiring Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded flex items-center">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Interviews</p>
            <h3 className="text-2xl font-bold">{report.totalInterviews}</h3>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded flex items-center">
          <div className="p-2 rounded-full bg-green-100 mr-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Conversion Rate</p>
            <h3 className="text-2xl font-bold">{report.conversionRate}%</h3>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded flex items-center">
          <div className="p-2 rounded-full bg-purple-100 mr-3">
            <XCircle className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Avg Skill Score</p>
            <h3 className="text-2xl font-bold">{report.avgSkillScore}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold mb-3">Weekly Skill Score Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={report.weeklySkillTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgScore" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Candidate Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={candidateStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {candidateStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Skill Assessment Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={skillDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              {skillDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployerReport;