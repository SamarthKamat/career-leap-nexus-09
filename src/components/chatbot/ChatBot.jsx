import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API with the correct API version
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiVersion: 'v1',
});

// Initial system message to set the context for the chat
const INITIAL_CONTEXT = "You are a helpful career advisor assistant who provides guidance on job searching, resume building, interview preparation, and career development.";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, the chat service is not properly configured. Please check the API key configuration.'
      }]);
      setIsLoading(false);
      return;
    }

    try {
      // Initialize the chat model with the correct model name
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      // Start a chat with proper configuration
      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: INITIAL_CONTEXT }] },
          { role: 'model', parts: [{ text: 'I understand. I will act as a career advisor assistant.' }] }
        ],
      });

      // Generate response
      const result = await chat.sendMessage([{ text: inputMessage }]);
      const response = await result.response;
      const text = response.text();

      const assistantMessage = {
        role: 'assistant',
        content: text
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.message || 'Sorry, I encountered an error. Please try again later.';
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link flex items-center text-gray-200 hover:text-blue-400"
      >
        {isOpen ? (
          <X className="h-5 w-5 mr-1" />
        ) : (
          <Bot className="h-5 w-5 mr-1" />
        )}
        Chat
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div ref={chatWindowRef} className="fixed bottom-20 right-4 w-96 bg-white/10 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 overflow-hidden z-[100] transition-all duration-300 ease-in-out transform scale-100 hover:scale-[1.02] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 p-4 text-white backdrop-blur-lg border-b border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6" />
                <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 animate-pulse">Career Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/5 to-gray-900/10 backdrop-blur-sm scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-white/10">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-[0_4px_16px_rgba(96,165,250,0.3)]'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/20 shadow-[0_4px_16px_rgba(255,255,255,0.1)]'
                    } transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-[0_4px_16px_rgba(255,255,255,0.1)] border border-white/20 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-white/80 animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-white/20 p-4 bg-white/10 backdrop-blur-md">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about career advice..."
                className="flex-1 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white p-2 rounded-xl hover:shadow-[0_4px_16px_rgba(96,165,250,0.3)] transition-all duration-200 disabled:opacity-50 flex items-center justify-center w-10 h-10 hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

