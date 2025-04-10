
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Authheader';
import Footer from '../components/Footer';
import DomainSelector from '../components/interview/DomainSelector';
import InterviewChat from '../components/interview/InterviewChat';
import ResumeScanner from '../components/ResumeScanner';
import { 
  Video, 
  Monitor, 
  MessageSquare, 
  Code, 
  BookOpen,
  Check,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const InterviewPrep = () => {
  const { currentUser } = useAuth();
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleDomainSelect = (options) => {
    setSelectedOptions(options);
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20 pt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Interview Preparation</h1>
            <p className="text-xl mb-8">
              Practice and master your interview skills with our AI-powered interview simulator
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/interview-prep/simulator" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-3">
                Practice Interviews
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Interview Preparation Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Interview Simulator</h3>
              <p className="text-gray-600">
                Practice with our AI interviewer powered by Ribbon API with video recording and real-time feedback
              </p>
              <Link to="/interview-prep/simulator" className="mt-4 inline-block text-primary hover:underline">
                Try AI Interview →
              </Link>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Response Analysis</h3>
              <p className="text-gray-600">
                Get feedback on your body language, eye contact, and non-verbal cues
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Answer Analysis</h3>
              <p className="text-gray-600">
                Receive detailed feedback on your responses with improvement suggestions
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Technical Challenges</h3>
              <p className="text-gray-600">
                Practice coding problems and system design questions with real-time feedback
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Practice Interview Section */}
      <section id="practice" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {!currentUser ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Sign in to Start Practicing</h2>
              <p className="text-gray-600 mb-8">Create an account or sign in to access the interview practice feature.</p>
              <div className="flex justify-center gap-4">
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-outline">Sign Up</Link>
              </div>
            </div>
          ) : selectedOptions ? (
            <div className="max-w-4xl mx-auto">
              <InterviewChat
                domain={selectedOptions.domain}
                difficulty={selectedOptions.difficulty}
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <DomainSelector onSelect={handleDomainSelect} />
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose an Interview Type</h3>
              <p className="text-gray-600">
                Select from various interview types based on your industry, role, or specific skills you want to improve
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete the Interview</h3>
              <p className="text-gray-600">
                Answer questions from our AI interviewer, which adapts based on your responses for a realistic experience
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Detailed Feedback</h3>
              <p className="text-gray-600">
                Get instant analysis of your performance with specific suggestions for improvement
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resume Scanner Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Resume Analysis</h2>
          <div className="max-w-4xl mx-auto">
            <ResumeScanner />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Interview Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interview Question Library</h3>
              <p className="text-gray-600 mb-4">
                Access our library of 10,000+ real interview questions from top companies across various industries
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Categorized by job role and industry</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Sample answers and explanation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Difficulty ratings and popularity</span>
                </li>
              </ul>
              <Link to="/resources/questions" className="text-primary-600 font-medium flex items-center">
                Browse Questions <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interview Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Watch expert-led video tutorials on mastering different types of interviews
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Body language and presentation tips</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>STAR method for behavioral questions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Technical interview strategies</span>
                </li>
              </ul>
              <Link to="/resources/tutorials" className="text-primary-600 font-medium flex items-center">
                Watch Tutorials <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mock Interviews</h3>
              <p className="text-gray-600 mb-4">
                Schedule live mock interviews with industry professionals for personalized feedback
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>1-on-1 interviews with experts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Detailed performance evaluation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <span>Personalized improvement plan</span>
                </li>
              </ul>
              <Link id="schedule" to="/mock-interviews" className="text-primary-600 font-medium flex items-center">
                Schedule a Session <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Practice makes perfect. Start preparing today and boost your confidence for your next interview.
          </p>
          <Link to="#practice" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
            Start Practicing Now
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default InterviewPrep;
