'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm your financial inclusion assistant. How can I help you with loans, alternative data, or financial education today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = {
        loan: "Loans designed for women-led SMBs often have more flexible terms. Alternative data can help you qualify even without a traditional credit history. Would you like to know more about specific loan options?",
        data: "Alternative data includes digital payments, supplier records, business social media activity, and inventory management. Lenders can use this to assess your business when traditional credit isn't available.",
        start: "To start collecting alternative data, consider: 1) Using digital payment platforms, 2) Creating business social media accounts, 3) Documenting customer reviews, and 4) Keeping detailed sales records.",
        requirements: "Traditional requirements often include business registration, financial statements, and credit history. Alternative lenders may look at your digital footprint, supplier relationships, and community standing instead."
      };
      
      // Simple logic to match keywords
      let botResponse = "I'm not sure I understand. Could you rephrase your question about loans, alternative data, or financial education?";
      
      const inputLower = input.toLowerCase();
      
      if (inputLower.includes('loan') || inputLower.includes('borrow') || inputLower.includes('credit')) {
        botResponse = botResponses.loan;
      } else if (inputLower.includes('data') || inputLower.includes('information')) {
        botResponse = botResponses.data;
      } else if (inputLower.includes('start') || inputLower.includes('how') || inputLower.includes('begin')) {
        botResponse = botResponses.start;
      } else if (inputLower.includes('require') || inputLower.includes('need')) {
        botResponse = botResponses.requirements;
      }
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-4 py-3 bg-primary text-white">
        <h3 className="text-lg font-medium">Financial Inclusion Assistant</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-secondary text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-light' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-secondary text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="input-field flex-1"
          />
          <Button type="submit" className="px-4">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;