import React, { useState, useEffect, useRef } from 'react';
import { X, Bot } from 'lucide-react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessage = {
    id: Date.now(),
    sender: 'bot',
    text: 'Hello! I can help you with:\n1. Virtual Job Fairs\n2. Employer Interactions\n3. Q&A Sessions\n4. Chat Features\n\nWhat would you like to explore?',
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const getBotResponse = async (userInput) => {
    const lowerCaseInput = userInput.toLowerCase().trim();

    // Specific responses
    if (lowerCaseInput.includes('virtual job fair') || lowerCaseInput.includes('job fair') || lowerCaseInput === '1') {
      return "Great! Virtual Job Fairs allow you to connect with multiple employers online. You can explore booths, attend presentations, and sometimes even have initial interviews. Do you have specific questions about attending or hosting one?";
    }
    if (lowerCaseInput.includes('employer interaction') || lowerCaseInput.includes('interaction') || lowerCaseInput === '2') {
      return "Employer interactions are key! In a virtual setting, this often happens via text chat, video calls within booths, or scheduled 1-on-1 sessions. Preparation is important - research the companies beforehand! What aspect interests you most?";
    }
    if (lowerCaseInput.includes('q&a session') || lowerCaseInput.includes('q&a') || lowerCaseInput.includes('question') || lowerCaseInput === '3') {
      return "Q&A sessions, often live or pre-recorded, let you ask questions directly to recruiters or company representatives. It's a good chance to learn about company culture, specific roles, or the application process. Do you want tips on asking good questions?";
    }
    if (lowerCaseInput.includes('chat feature') || lowerCaseInput.includes('chat') || lowerCaseInput === '4') {
      return "The chat feature is central to virtual events. You can use public chat in presentations, private chat with recruiters, or group chats in virtual booths. It's used for asking questions, networking, and expressing interest. Any specific chat functionality you're curious about?";
    }

    // Friendly general responses
    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      return "Hello there! How can I help you with virtual job fairs today?";
    }
    if (lowerCaseInput.includes('thanks') || lowerCaseInput.includes('thank you')) {
      return "You're welcome! Let me know if anything else comes up.";
    }
    if (lowerCaseInput.includes('bye')) {
      return "Goodbye! Hope the job search goes well.";
    }
    if (lowerCaseInput.includes('how are you')) {
      return "I'm just a bot, but I'm ready to help you with your questions about virtual job fairs!";
    }

    // Fallback to Gemini
    const geminiResponse = await getGeminiReply(userInput);
    return geminiResponse || "Hmm, I couldn't quite get that. Could you ask in a different way?";
  };

  const getGeminiReply = async (prompt) => {
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAW2j0pGYK2a6CC53lZ4TX18cGguTPqnnk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const parts = data?.candidates?.[0]?.content?.parts;
      if (parts && Array.isArray(parts)) {
        return parts.map(part => part.text).join('\n');
      }

      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond to that.";
    } catch (error) {
      console.error('Gemini API error:', error);
      return "Sorry, I'm having trouble fetching a response right now.";
    }
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedInput,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsBotTyping(true);

    const botText = await getBotResponse(trimmedInput);
    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: botText,
    };

    setMessages(prev => [...prev, botMessage]);
    setIsBotTyping(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-wrapper">
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <Bot size={24} />
      </button>
      {isOpen && (
        <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Job Fair Assistant</h3>
        <button
          className="close-button"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}</p>
          </div>
        ))}
        {isBotTyping && (
          <div className="message bot typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
      )}
    </div>
  );
}

export default Chatbot;
