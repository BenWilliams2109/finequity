'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import { useUserData } from '../../context/UserDataContext';
import { loanProducts } from '../../lib/loan-products';

export default function LoanOptions() {
  const router = useRouter();
  const { userData, selectLoan } = useUserData();
  
  useEffect(() => {
    // Redirect if no business info
    if (!userData.businessInfo.name) {
      router.push('/business-profile');
    }
  }, [userData.businessInfo, router]);
  
  const handleSelectLoan = (loan) => {
    selectLoan(loan);
    router.push('/improvement-plan');
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary">Available Loan Options</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Based on the information you provided, here are some loan options that might be suitable for {userData.businessInfo.name}.
            </p>
          </div>
        </FadeTransition>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {loanProducts.map((loan, index) => (
            <FadeTransition key={loan.id} delay={0.1 * index}>
              <div className="card hover:shadow-lg h-full flex flex-col">
                <h2 className="text-2xl font-bold text-primary">{loan.name}</h2>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-lg font-semibold">{loan.amount}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-700">{loan.term}</span>
                </div>
                <p className="mt-2 text-gray-600">Interest: {loan.interestRate}</p>
                <p className="mt-4 text-gray-700 flex-grow">{loan.description}</p>
                
                <div className="mt-6">
                  <h3 className="font-medium text-primary mb-2">Requirements:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {loan.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-primary mb-2">Alternative Data Used:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {loan.alternativeDataUsed.map((data, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{data}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleSelectLoan(loan)}
                    className="w-full"
                  >
                    Select This Loan
                  </Button>
                </div>
              </div>
            </FadeTransition>
          ))}
        </div>
      </div>
    </div>
  );
}