import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { sentimentAnalysis } from '../../lib/aiTools';

const InterviewChat = ({ domain, difficulty }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const functions = getFunctions();

  // Function to generate a new question using the Gemini API
  const generateQuestion = async () => {
    try {
      setIsLoading(true);
      const generateGeminiQuestion = httpsCallable(functions, 'generateGeminiQuestion');
      
      // Get the last message for context
      const lastMessage = messages[messages.length - 1];
      const context = lastMessage?.type === 'response' ? lastMessage.content : undefined;
      
      const response = await generateGeminiQuestion({
        domain,
        difficulty,
        context,
        previousQuestions: messages
          .filter(msg => msg.type === 'question')
          .map(msg => msg.content)
      });

      const newQuestion = response.data;
      
      setMessages(prev => [...prev, {
        id: generateUniqueId(),
        type: 'question',
        content: newQuestion.question,
        metadata: {
          expectedAnswer: newQuestion.expectedAnswer,
          difficulty: newQuestion.difficulty,
          domain: newQuestion.domain,
          type: newQuestion.type,
          keywords: newQuestion.keywords
        },
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error generating question:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: generateUniqueId(),
        type: 'error',
        content: 'Sorry, I encountered an error generating the next question. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save user's response to Firestore
  const saveResponse = async (questionId, response) => {
    try {
      const userResponsesRef = collection(db, 'users', currentUser.uid, 'interviewResponses');
      await addDoc(userResponsesRef, {
        questionId,
        response,
        domain,
        difficulty,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving response to Firestore:', error);
    }
  };

  // Function to analyze sentiment of user's response
  const analyzeSentiment = async (response) => {
    try {
      const sentiment = await sentimentAnalysis(response);
      setMessages(prev => [...prev, {
        id: generateUniqueId(),
        type: 'sentiment',
        content: `Sentiment: ${sentiment}`,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
  
    const lastQuestion = messages.findLast(msg => msg.type === 'question');
    
    // Add user's response to messages
    const newMessage = {
      id: generateUniqueId(),
      type: 'response',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
  
    // Save response if there was a previous question
    if (lastQuestion) {
      await saveResponse(lastQuestion.id, inputMessage);
    }
  
    // Analyze sentiment of the response
    await analyzeSentiment(inputMessage);
  
    // Generate next question after a short delay
    setTimeout(() => {
      generateQuestion();
    }, 1000);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Generate first question when component mounts
  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">{domain} Interview Practice</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">Difficulty: {difficulty}</p>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'response' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'response' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className="flex-shrink-0">
                {message.type === 'response' ? (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-secondary-600" />
                  </div>
                )}
              </div>
              <div
                className={`p-3 rounded-lg ${message.type === 'response' ? 'bg-primary-100 text-primary-900' : message.type === 'error' ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-900'}`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">Generating question...</div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary px-4 py-2"
            disabled={!inputMessage.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewChat;

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;