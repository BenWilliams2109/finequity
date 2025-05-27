'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import { useUserData } from '../../context/UserDataContext';
import { recommendAlternativeData } from '../../lib/loan-products';

export default function ImprovementPlan() {
  const router = useRouter();
  const { userData, setImprovementPlan } = useUserData();
  
  useEffect(() => {
    // Redirect if no loan is selected
    if (!userData.selectedLoan) {
      router.push('/loan-options');
      return;
    }
    
    // Generate recommendations if not already done
    if (userData.improvementPlan.length === 0) {
      const recommendations = recommendAlternativeData(userData.businessInfo);
      setImprovementPlan(recommendations);
    }
  }, [userData, setImprovementPlan, router]);
  
  if (!userData.selectedLoan) {
    return null;
  }
  
  const handleChatClick = () => {
    router.push('/chat');
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary">Your Financial Improvement Plan</h1>
              <p className="mt-4 text-gray-600">
                Based on your selected {userData.selectedLoan.name}, here are recommendations 
                to improve your chances of approval and potentially access better loan terms.
              </p>
            </div>
            
            <div className="mb-8 p-4 bg-secondary rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">Selected Loan</h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{userData.selectedLoan.name}</p>
                  <p className="text-gray-600">{userData.selectedLoan.amount} • {userData.selectedLoan.term}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-gray-700">Interest: {userData.selectedLoan.interestRate}</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-primary mb-4">Recommended Data to Collect</h2>
            <p className="text-gray-600 mb-6">
              Lenders are increasingly looking at alternative data sources to evaluate businesses 
              without traditional credit history. Start collecting these to strengthen your profile:
            </p>
            
            <div className="space-y-6">
              {userData.improvementPlan.map((item, index) => (
                <FadeTransition key={index} delay={0.1 * index}>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          item.impact === 'high' ? 'bg-green-100 text-green-600' : 
                          item.impact === 'medium' ? 'bg-blue-100 text-blue-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <span className="font-bold text-lg">{index + 1}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                            item.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.impact === 'high' ? 'bg-purple-100 text-purple-800' : 
                            item.impact === 'medium' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeTransition>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold text-primary mb-4">Need More Help?</h2>
              <p className="text-gray-600 mb-6">
                Our AI assistant can answer your questions about loans, alternative data, 
                and financial inclusion. Start a chat to learn more!
              </p>
              <Button
                onClick={handleChatClick}
                className="px-8 py-4 text-lg"
              >
                Chat With Our Financial Assistant
              </Button>
            </div>
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}