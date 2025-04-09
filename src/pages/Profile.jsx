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
      
      <div className="bg-gray-50 min-h-screen py-10 pt-24">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="w-32 h-32 bg-primary-600 text-white rounded-full flex items-center justify-center text-4xl font-bold">
                  {userData.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{userData.title}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {userData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      to="/profile/edit"
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </Link>
                    <button className="btn btn-outline flex items-center gap-2">
                      <Download size={16} />
                      Download CV
                    </button>
                    <button className="btn btn-outline flex items-center gap-2">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    {userData.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {userData.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    {userData.university}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Experience Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Experience
                </h2>
                <div className="space-y-6">
                  {userData.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary-600 pl-4">
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-gray-500 text-sm">{exp.duration}</p>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </h2>
                <div className="space-y-6">
                  {userData.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-primary-600 pl-4">
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.duration}</p>
                      <p className="mt-2">GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications
                </h2>
                <div className="space-y-4">
                  {userData.certifications.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-gray-600 text-sm">{cert.issuer}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
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