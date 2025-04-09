
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, Award, CheckCircle, Clock, Users } from 'lucide-react';

const TrainingPrograms = () => {
  // Sample training program data
  const programs = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      students: 1240,
      rating: 4.8,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Data Science Specialization",
      description: "Learn data analysis, visualization, machine learning, and AI fundamentals",
      duration: "16 weeks",
      level: "Intermediate",
      students: 950,
      rating: 4.7,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Cloud Computing & DevOps",
      description: "Deploy scalable applications with AWS, Docker, Kubernetes, and CI/CD pipelines",
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      students: 780,
      rating: 4.9,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Create cross-platform mobile applications with React Native and Flutter",
      duration: "14 weeks",
      level: "Intermediate",
      students: 860,
      rating: 4.6,
      image: "/placeholder.svg"
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry-Focused Training Programs</h1>
            <p className="text-xl mb-8">
              Enhance your skills with our specialized programs designed by industry experts
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="#programs" className="btn btn-secondary px-8 py-3">
                Browse Programs
              </Link>
              <Link to="/register" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-3">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Program Listing */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Featured Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map(program => (
              <div key={program.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="h-5 w-5 mr-2" />
                      <span>{program.level}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{program.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Award className="h-5 w-5 mr-2" />
                      <span>{program.rating}/5.0 rating</span>
                    </div>
                  </div>
                  
                  <Link to={`/training/${program.id}`} className="btn btn-primary w-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Training Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry-Relevant Curriculum</h3>
              <p className="text-gray-600">
                Regularly updated content based on current industry demands and technologies
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-secondary-100 text-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced professionals with extensive industry experience
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-accent-100 text-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hands-on Projects</h3>
              <p className="text-gray-600">
                Build real-world projects to enhance your portfolio and practical skills
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry Certifications</h3>
              <p className="text-gray-600">
                Earn recognized certifications to validate your skills and boost your resume
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our training programs today and gain the skills needed to succeed in today's competitive job market
          </p>
          <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
            Enroll Now
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default TrainingPrograms;
