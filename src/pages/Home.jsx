
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Users, 
  MapPin, 
  Award, 
  ArrowRight, 
  Search, 
  BarChart, 
  Video,
  Calendar
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center text-white pt-16 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7)',
          }}
        />
        
        {/* Content with higher z-index */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                <span className="block text-white">Apply Today and</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Build Your Career
                </span>
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Connect with top employers, develop your skills, and land your dream job
                through our comprehensive training and placement platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/jobs" 
                  className="btn btn-primary px-8 py-3 text-lg flex items-center justify-center transition-all duration-300 hover:bg-primary-600 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Browse Jobs
                </Link>
                <Link 
                  to="/training" 
                  className="btn btn-outline px-8 py-3 text-lg flex items-center justify-center transition-all duration-300 border-2 border-primary text-primary hover:bg-primary hover:text-white hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explore Training <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden md:flex justify-end"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-md">
                <h3 className="text-gray-800 text-xl font-bold mb-6 text-center">Resume</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <p>Professional profile with 3+ years of experience</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <p>Bachelor's degree in Computer Science</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <p>Technical skills: React, Node.js, Python</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <p>Project management and team leadership</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link to="/resume-builder" className="btn btn-primary inline-flex items-center">
                    Build Your Resume <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">
              Leading employers already using our platform to find and train future talent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="service-card"
            >
              <div className="service-icon bg-primary-100">
                <FileText size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resume Builder</h3>
              <p className="text-gray-600">
                Create professional resumes with our easy-to-use builder to stand out from the crowd.
              </p>
              <Link to="/resume-builder" className="mt-4 inline-flex items-center text-primary-600 font-medium">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Service 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="service-card"
            >
              <div className="service-icon bg-secondary-100">
                <BookOpen size={32} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Training Programs</h3>
              <p className="text-gray-600">
                Access industry-relevant courses designed to enhance your skills and employability.
              </p>
              <Link to="/training" className="mt-4 inline-flex items-center text-secondary-600 font-medium">
                Browse Courses <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Service 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="service-card"
            >
              <div className="service-icon bg-accent-100">
                <MapPin size={32} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Job Search</h3>
              <p className="text-gray-600">
                Find opportunities that match your skills and career goals from top employers.
              </p>
              <Link to="/jobs" className="mt-4 inline-flex items-center text-accent-600 font-medium">
                Find Jobs <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Service 4 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="service-card"
            >
              <div className="service-icon bg-primary-100">
                <Video size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interview Prep</h3>
              <p className="text-gray-600">
                Practice with simulated interviews and get feedback to improve your performance.
              </p>
              <Link to="/interview-prep" className="mt-4 inline-flex items-center text-primary-600 font-medium">
                Start Practicing <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">AI-Powered Resume Scanner</h2>
              <p className="text-lg text-gray-600">
                Our advanced AI technology analyzes your resume and provides instant feedback to help you stand out to employers.
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 bg-primary-100 p-2 rounded-full">
                    <Search size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Keyword Analysis</h4>
                    <p className="text-gray-600">Identifies job-specific keywords to increase visibility to recruiters.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 bg-primary-100 p-2 rounded-full">
                    <BarChart size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Skill Assessment</h4>
                    <p className="text-gray-600">Evaluates your skills against job requirements and suggests improvements.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 bg-primary-100 p-2 rounded-full">
                    <Award size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Achievement Highlighting</h4>
                    <p className="text-gray-600">Identifies and emphasizes your key achievements for maximum impact.</p>
                  </div>
                </li>
              </ul>
              <div>
                <Link to="/resume-builder" className="btn btn-primary inline-block">
                  Scan Your Resume
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6"
            >
              <img 
                src="/public/placeholder.svg" 
                alt="AI Resume Scanner" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold mb-2">10,000+</div>
              <p className="text-lg opacity-90">Registered Students</p>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <p className="text-lg opacity-90">Partner Companies</p>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold mb-2">5,000+</div>
              <p className="text-lg opacity-90">Successful Placements</p>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold mb-2">200+</div>
              <p className="text-lg opacity-90">Training Courses</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg">
              Hear from students and employers who have benefited from our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold">AR</span>
                </div>
                <div>
                  <h4 className="font-semibold">Amelia Rodriguez</h4>
                  <p className="text-sm text-gray-500">Software Developer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Thanks to JobGPT's training programs and resume builder, I was able to land my dream job at TechCorp. The interview preparation tools were invaluable during my job search."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                  <span className="text-secondary-600 font-semibold">JT</span>
                </div>
                <div>
                  <h4 className="font-semibold">James Thompson</h4>
                  <p className="text-sm text-gray-500">HR Manager at InnovateX</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an employer, JobGPT has made our recruitment process significantly more efficient. We've found exceptionally talented candidates who were well-prepared for their roles."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                  <span className="text-accent-600 font-semibold">SP</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Patel</h4>
                  <p className="text-sm text-gray-500">Data Analyst at FinServe</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI resume scanner helped me identify gaps in my resume that I never would have noticed. After making the suggested improvements, I started receiving interview calls within a week!"
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who have transformed their careers through JobGPT
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
              Get Started Today
            </Link>
            <Link to="/training" className="btn border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg">
              Explore Training Programs
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;
