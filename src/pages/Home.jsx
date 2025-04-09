
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
import '../styles/effects.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSlideshow from '../components/HeroSlideshow';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center relative mb-0">
        <HeroSlideshow />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white -mt-1 section-glow">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Our Services</h2>
            <p className="text-lg text-gray-300 text-glow">
              Leading employers already using our platform to find and train future talent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 - Resume Builder */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect hover-glow p-8 rounded-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg mb-6 backdrop-blur-sm">
                <FileText size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-glow-primary">Resume Builder</h3>
              <p className="text-gray-300 mb-6">
                Create professional resumes with our easy-to-use builder to stand out from the crowd.
              </p>
              <Link to="/resume-builder" className="inline-flex items-center text-white hover:text-primary-400 font-medium smooth-transition">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Service 2 - Training Programs */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect hover-glow p-8 rounded-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg mb-6 backdrop-blur-sm">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-glow-primary">Training Programs</h3>
              <p className="text-gray-300 mb-6">
                Access industry-relevant courses designed to enhance your skills and employability.
              </p>
              <Link to="/training" className="inline-flex items-center text-white hover:text-primary-400 font-medium">
                Browse Courses <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Service 3 - Job Search */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect hover-glow p-8 rounded-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg mb-6 backdrop-blur-sm">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-glow-primary">Job Search</h3>
              <p className="text-gray-300 mb-6">
                Find opportunities that match your skills and career goals from top employers.
              </p>
              <Link to="/jobs" className="inline-flex items-center text-white hover:text-primary-400 font-medium">
                Find Jobs <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Service 4 - Interview Prep */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect hover-glow p-8 rounded-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg mb-6 backdrop-blur-sm">
                <Video size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-glow-primary">Interview Prep</h3>
              <p className="text-gray-300 mb-6">
                Practice with simulated interviews and get feedback to improve your performance.
              </p>
              <Link to="/interview-prep" className="inline-flex items-center text-white hover:text-primary-400 font-medium">
                Start Practicing <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-20 section-glow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">AI-Powered Resume Scanner</h2>
              <p className="text-lg text-gray-600 smooth-transition">
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
                src="resume-scanner.jpg" 
                alt="AI Resume Scanner" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white section-glow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 glass-effect rounded-xl hover-glow">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-glow">10,000+</div>
              <p className="text-lg">Registered Students</p>
            </div>
            <div className="p-6 glass-effect rounded-xl hover-glow">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-glow">500+</div>
              <p className="text-lg">Partner Companies</p>
            </div>
            <div className="p-6 glass-effect rounded-xl hover-glow">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-glow">5,000+</div>
              <p className="text-lg">Successful Placements</p>
            </div>
            <div className="p-6 glass-effect rounded-xl hover-glow">
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-glow">200+</div>
              <p className="text-lg">Training Courses</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 section-glow">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Success Stories</h2>
            <p className="text-gray-300 text-lg text-glow">
              Hear from students and employers who have benefited from our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass-effect p-8 rounded-lg hover-glow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-glow">AR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-glow-primary">Amelia Rodriguez</h4>
                  <p className="text-sm text-gray-300">Software Developer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Thanks to JobGPT's training programs and resume builder, I was able to land my dream job at TechCorp. The interview preparation tools were invaluable during my job search."
              </p>
              <div className="flex text-yellow-400 mt-4 text-glow">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="glass-effect p-8 rounded-lg hover-glow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-glow">JT</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-glow-secondary">James Thompson</h4>
                  <p className="text-sm text-gray-300">HR Manager at InnovateX</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As an employer, JobGPT has made our recruitment process significantly more efficient. We've found exceptionally talented candidates who were well-prepared for their roles."
              </p>
              <div className="flex text-yellow-400 mt-4 text-glow">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="glass-effect p-8 rounded-lg hover-glow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-glow">SP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-glow-secondary">Sarah Patel</h4>
                  <p className="text-sm text-gray-300">Data Analyst at FinServe</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The AI resume scanner helped me identify gaps in my resume that I never would have noticed. After making the suggested improvements, I started receiving interview calls within a week!"
              </p>
              <div className="flex text-yellow-400 mt-4 text-glow">
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
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white section-glow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-glow">Ready to Advance Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-glow">
            Join thousands of students and professionals who have transformed their careers through JobGPT
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn-glow bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg rounded-lg">
              Get Started Today
            </Link>
            <Link to="/training" className="btn-glow border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg rounded-lg">
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
