'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm your financial inclusion assistant. I can help you with loans, alternative data, financial education, and business growth strategies. What would you like to know?",
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

  // Comprehensive response system
  const getResponse = (userInput) => {
    const inputLower = userInput.toLowerCase();
    
    // Loan Types
    if (inputLower.includes('micro loan') || inputLower.includes('microloan')) {
      return "💰 Micro loans are perfect for starting or expanding small businesses! They typically range from $500-$8,000 with flexible terms. These loans often require minimal documentation and can use alternative data like mobile money transactions or social media presence to assess creditworthiness.";
    }
    
    if (inputLower.includes('growth loan')) {
      return "📈 Growth loans help established businesses expand! Usually $5,000-$35,000 for inventory, equipment, or marketing. Lenders look at your business history, revenue trends, and digital payment records. Having Visa merchant data can reduce interest rates by up to 3%!";
    }
    
    if (inputLower.includes('expansion loan')) {
      return "🚀 Expansion loans are for significant business growth! $25,000-$150,000 for new locations, major equipment, or hiring. These require strong business fundamentals and credit history, but alternative data like customer reviews and supplier relationships can strengthen your application.";
    }
    
    // Alternative Data Topics
    if (inputLower.includes('visa') || inputLower.includes('merchant')) {
      return "💳 Visa merchant accounts are game-changers! They let you accept card payments, which increases sales by 20-30% AND provides transaction data that lenders love. This data can boost your credit score by 80+ points and unlock better loan terms. Want to know how to apply?";
    }
    
    if (inputLower.includes('alternative data')) {
      return "📊 Alternative data includes: mobile money transactions, social media business activity, customer reviews, supplier invoices, inventory records, and community references. Lenders use this when traditional credit history isn't available. It levels the playing field for women entrepreneurs!";
    }
    
    if (inputLower.includes('mobile money')) {
      return "📱 Mobile money records show consistent payment patterns and business activity. Regular transactions demonstrate cash flow stability. Platforms like M-Pesa in Kenya or similar services create a digital trail that lenders can verify, making you more creditworthy.";
    }
    
    if (inputLower.includes('social media')) {
      return "📲 Business social media demonstrates customer engagement and market presence! Active Facebook/Instagram accounts with customer interactions, reviews, and regular posts show business legitimacy. This alternative data can add 10-20 points to your credit assessment.";
    }
    
    // Financial Education
    if (inputLower.includes('credit score') || inputLower.includes('credit rating')) {
      return "⭐ Credit scores range from 300-850. Here's how to improve yours: 1) Use digital payments consistently, 2) Build customer reviews, 3) Document all business relationships, 4) Apply for a Visa merchant account, 5) Keep detailed financial records. Each step can boost your score!";
    }
    
    if (inputLower.includes('interest rate')) {
      return "📊 Interest rates vary by loan type and risk. Micro loans: 12-18%, Growth loans: 10-15%, Expansion loans: 8-12%. Having Visa data can reduce rates by 3%! Alternative data sources like social media and mobile money can also help secure better terms.";
    }
    
    if (inputLower.includes('approval') || inputLower.includes('qualify')) {
      return "✅ To improve approval chances: 1) Maintain consistent revenue records, 2) Use digital payment platforms, 3) Build online business presence, 4) Collect customer testimonials, 5) Document supplier relationships. Each completed step increases your approval probability!";
    }
    
    // Business Growth
    if (inputLower.includes('start') || inputLower.includes('begin') || inputLower.includes('how to')) {
      return "🎯 Getting started steps: 1) Register your business officially, 2) Open a business bank account, 3) Start using digital payments, 4) Create business social media, 5) Collect customer contacts, 6) Document all transactions. Want detailed guidance on any of these?";
    }
    
    if (inputLower.includes('revenue') || inputLower.includes('sales') || inputLower.includes('income')) {
      return "💹 Boosting revenue strategies: 1) Accept card payments (increases sales 20-30%), 2) Build online presence, 3) Offer customer loyalty programs, 4) Document and share customer success stories, 5) Network with other businesses. Which strategy interests you most?";
    }
    
    if (inputLower.includes('document') || inputLower.includes('records')) {
      return "📋 Essential business documentation: 1) Daily sales records, 2) Customer contact lists, 3) Supplier invoices, 4) Digital payment receipts, 5) Business registration, 6) Customer testimonials. Good records = better loan terms!";
    }
    
    // Specific Industries
    if (inputLower.includes('food') || inputLower.includes('restaurant') || inputLower.includes('catering')) {
      return "🍽️ Food businesses have great loan opportunities! Lenders love food businesses because of consistent demand. Focus on: health permits, customer reviews, supplier relationships, and daily sales tracking. Food industry growth loans often have favorable terms!";
    }
    
    if (inputLower.includes('retail') || inputLower.includes('shop') || inputLower.includes('store')) {
      return "🛍️ Retail businesses benefit from inventory-based lending! Track: product turnover, seasonal sales patterns, supplier relationships, customer loyalty. Digital payment acceptance is crucial - it increases average transaction size and provides valuable data to lenders.";
    }
    
    if (inputLower.includes('craft') || inputLower.includes('handmade') || inputLower.includes('artisan')) {
      return "🎨 Artisan businesses have unique advantages! Your creativity and community connections are valuable. Focus on: online portfolio, customer testimonials, craft fair participation, social media showcasing work. Many lenders offer special programs for creative entrepreneurs!";
    }
    
    // Financial Challenges
    if (inputLower.includes('no credit') || inputLower.includes('bad credit') || inputLower.includes('poor credit')) {
      return "🔄 No credit history? No problem! Alternative lenders focus on: business activity, customer relationships, revenue consistency, digital footprint. Start building credit with: business bank account, digital payments, supplier trade references, micro-loans.";
    }
    
    if (inputLower.includes('rejected') || inputLower.includes('denied') || inputLower.includes('turned down')) {
      return "💪 Loan rejection isn't the end! Common reasons: insufficient data, poor credit, unclear business model. Solutions: build alternative data, improve credit score, create detailed business plan, consider micro-loans first. Want specific improvement strategies?";
    }
    
    if (inputLower.includes('collateral') || inputLower.includes('guarantee')) {
      return "🏠 Many alternative lenders don't require traditional collateral! Instead, they use: business assets, revenue projections, alternative data, group guarantees. Focus on building business reputation and consistent income rather than worrying about collateral.";
    }
    
    // ESG and Sustainability
    if (inputLower.includes('sustainable') || inputLower.includes('green') || inputLower.includes('environment')) {
      return "🌱 Sustainable business practices can improve loan terms! Many lenders offer green financing with better rates. Focus on: waste reduction, community impact, fair employment, environmental responsibility. ESG scores are becoming important for lending decisions.";
    }
    
    if (inputLower.includes('women') || inputLower.includes('female') || inputLower.includes('gender')) {
      return "👩‍💼 Many lenders have special programs for women-owned businesses. Benefits include: lower interest rates, mentorship programs, flexible terms, business training. Alternative data especially helps women who may lack traditional credit history.";
    }
    
    // Technology and Digital
    if (inputLower.includes('digital') || inputLower.includes('online') || inputLower.includes('technology')) {
      return "💻 Digital transformation improves loan access. Key steps: 1) Digital payment acceptance, 2) Online business presence, 3) Customer management systems, 4) Digital record keeping, 5) E-commerce capabilities. Each step creates valuable data for lenders!";
    }
    
    if (inputLower.includes('app') || inputLower.includes('platform') || inputLower.includes('system')) {
      return "📱 Digital platforms that help with lending: mobile money apps, business banking apps, POS systems, accounting software, social media platforms. These create digital trails that lenders can verify and trust. Which platforms are you currently using?";
    }
    
    // General Loan Questions
    if (inputLower.includes('loan') || inputLower.includes('borrow') || inputLower.includes('finance')) {
      return "We have micro loans ($500-$8K), growth loans ($5-35K), and expansion loans ($25-150K). Each has different requirements and uses alternative data differently. Which loan type interests you, or would you like me to recommend based on your needs?";
    }
    
    if (inputLower.includes('requirement') || inputLower.includes('need') || inputLower.includes('criteria')) {
      return "📝 Basic requirements vary by loan type, but generally include: business registration, 6+ months operation, revenue records, and identification. Alternative lenders also consider: digital payment history, social media presence, customer reviews, supplier relationships. What specific loan are you considering?";
    }
    
    // Helpful prompts for common questions
    if (inputLower.includes('help') || inputLower.includes('guide') || inputLower.includes('advice')) {
      return "🤝 I'm here to help! I can assist with: loan options and requirements, building alternative data, improving credit scores, business growth strategies, digital payment setup, documentation tips. What specific area would you like guidance on?";
    }
    
    if (inputLower.includes('thanks') || inputLower.includes('thank you')) {
      return "😊 You're welcome! I'm always here to help with your financial and business questions. Feel free to ask about loans, alternative data, business growth, or anything else related to financial inclusion!";
    }
    
    // Default responses for unmatched queries
    const defaultResponses = [
      "Could you be more specific about what you'd like to know? I can assist with loan options, alternative data, credit building, or business growth strategies.",
      "I specialize in loans, alternative data, and financial inclusion. Could you rephrase your question so I can provide the most helpful information?",
      "I'm knowledgeable about micro loans, growth loans, expansion loans, alternative data sources, and business development. What specific topic interests you?",
      "I can provide information about loan requirements, interest rates, alternative data collection, credit score improvement, or business growth strategies. Which area would be most helpful?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

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
    const currentInput = input; // Store input before clearing
    setInput('');
    setIsTyping(true);
    
    // Generate bot response after delay
    setTimeout(() => {
      const botResponse = getResponse(currentInput);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  // Quick action buttons
  const quickActions = [
    { text: "Tell me about micro loans", action: "micro loans" },
    { text: "How do I improve my credit score?", action: "credit score" },
    { text: "What is alternative data?", action: "alternative data" },
    { text: "How to get started?", action: "how to start" }
  ];

  const handleQuickAction = (action) => {
    setInput(action);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h3 className="text-lg font-medium">Financial Inclusion Assistant</h3>
        <p className="text-xs text-blue-100">Ask me about loans, alternative data, and business growth!</p>
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
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
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
      
      {/* Quick Action Buttons */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-gray-100">
          <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about loans, alternative data, credit building..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <Button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;