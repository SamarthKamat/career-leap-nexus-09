import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Edit,
  Download,
  Share2
} from 'lucide-react';

const Profile = () => {
  const { currentUser } = useAuth();

  // Sample user data - in a real app, this would come from your backend
  const userData = {
    name: currentUser?.displayName || 'Student Name',
    email: currentUser?.email || 'student@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Computer Science Student',
    university: 'Tech University',
    graduationYear: '2025',
    skills: [
      'JavaScript',
      'React',
      'Node.js',
      'Python',
      'Data Analysis',
      'UI/UX Design'
    ],
    experience: [
      {
        id: 1,
        role: 'Software Development Intern',
        company: 'TechCorp Solutions',
        duration: 'Jun 2024 - Aug 2024',
        description: 'Developed and maintained web applications using React and Node.js'
      },
      {
        id: 2,
        role: 'Research Assistant',
        company: 'University Lab',
        duration: 'Jan 2024 - Present',
        description: 'Conducting research in machine learning and data analysis'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Tech University',
        duration: '2021 - 2025',
        gpa: '3.8/4.0'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'Web Development Bootcamp',
        issuer: 'CareerLeap Academy',
        date: 'March 2025'
      },
      {
        id: 2,
        name: 'Data Science Fundamentals',
        issuer: 'DataTech Institute',
        date: 'January 2025'
      }
    ]
  };

  return (
    <>
      <Header />
      
      <div className="bg-gradient-to-br from-slate-700 via-primary-800 to-slate-800 min-h-screen py-10 pt-24">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-auto flex flex-col items-center">
                <div className="w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full flex items-center justify-center shadow-lg">
                  {currentUser?.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={64} />
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-3 w-full">
                  <Link to="/profile/edit" className="btn btn-outline w-full flex items-center justify-center gap-2">
                    <Edit size={16} /> Edit Profile
                  </Link>
                  <button className="btn btn-outline w-full flex items-center justify-center gap-2">
                    <Download size={16} /> Download CV
                  </button>
                  <button className="btn btn-outline w-full flex items-center justify-center gap-2">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{userData.title}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Mail className="h-5 w-5 mr-3 text-primary-600" />
                    {userData.email}
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Phone className="h-5 w-5 mr-3 text-primary-600" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                    {userData.location}
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <GraduationCap className="h-5 w-5 mr-3 text-primary-600" />
                    {userData.university}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <Briefcase className="h-6 w-6 mr-3 text-primary-600" />
                  Experience
                </h2>
                <div className="space-y-8">
                  {userData.experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-primary-600 pl-6">
                      <h3 className="font-semibold text-xl text-gray-800">{exp.role}</h3>
                      <p className="text-primary-600 font-medium">{exp.company}</p>
                      <p className="text-gray-500 text-sm mt-1">{exp.duration}</p>
                      <p className="mt-3 text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <GraduationCap className="h-6 w-6 mr-3 text-primary-600" />
                  Education
                </h2>
                <div className="space-y-8">
                  {userData.education.map((edu) => (
                    <div key={edu.id} className="border-l-4 border-primary-600 pl-6">
                      <h3 className="font-semibold text-xl text-gray-800">{edu.degree}</h3>
                      <p className="text-primary-600 font-medium">{edu.institution}</p>
                      <p className="text-gray-500 text-sm mt-1">{edu.duration}</p>
                      <p className="mt-2 text-gray-600">GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <Award className="h-6 w-6 mr-3 text-primary-600" />
                  Certifications
                </h2>
                <div className="space-y-4">
                  {userData.certifications.map((cert) => (
                    <div key={cert.id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                      <p className="text-primary-600 text-sm mt-1">{cert.issuer}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Profile;