'use client';

import FadeTransition from '../../components/ui/FadeTransition';
import ChatInterface from '../../components/chatbot/ChatInterface';

export default function Chat() {
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Chat With Our Financial Assistant</h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Ask questions about loans, alternative data, or financial education. 
              Our AI assistant is here to guide you on your financial inclusion journey.
            </p>
          </div>
        </FadeTransition>
        
        <FadeTransition delay={0.2}>
          <div className="h-[600px]">
            <ChatInterface />
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}