// src/app/loan-options/page.js - Improved mobile formatting with clearer loan details
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import { useUserData } from '../../context/UserDataContext';
import { loanProducts } from '../../lib/loan-products';
import RiskAssessmentDashboard from '../../components/risk/RiskAssessmentDashboard';

export default function LoanOptions() {
  const router = useRouter();
  const { userData, selectLoan } = useUserData();
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVisaModal, setShowVisaModal] = useState(false);
  
  useEffect(() => {
    // Redirect if no business info
    if (!userData.businessInfo.name) {
      router.push('/business-profile');
      return;
    }

    // Helper functions moved inside useEffect
    const calculateMaxLoan = (score, revenue) => {
      const baseMultiplier = score >= 720 ? 6 : score >= 650 ? 4 : 2.5;
      return Math.round(revenue * baseMultiplier);
    };
    
    const calculateApprovalProbability = (score) => {
      if (score >= 720) return 0.92;
      if (score >= 680) return 0.78;
      if (score >= 640) return 0.65;
      return 0.45;
    };

    const calculateRiskAssessment = (businessInfo) => {
      // Enhanced risk calculation with Visa data
      let baseScore = 600; // Starting score
      
      // Business fundamentals
      const yearsInBusiness = new Date().getFullYear() - parseInt(businessInfo.yearEstablished || 2020);
      baseScore += Math.min(yearsInBusiness * 15, 60); // Up to 60 points for experience
      
      // Revenue impact
      const monthlyRevenue = parseInt(businessInfo.monthlyRevenue || 0);
      if (monthlyRevenue > 5000) baseScore += 40;
      else if (monthlyRevenue > 2000) baseScore += 25;
      else if (monthlyRevenue > 1000) baseScore += 15;
      
      // Industry risk adjustment
      const industryScores = {
        'Food': 20, 'Retail': 15, 'Services': 10, 
        'Crafts': 25, 'Agriculture': 5, 'Technology': 30
      };
      baseScore += industryScores[businessInfo.industry] || 0;
      
      // Visa merchant bonus
      if (businessInfo.hasVisaMerchant && businessInfo.visaData) {
        baseScore += 80; // Significant boost for Visa data
        
        if (businessInfo.visaData.accountAge > 1) baseScore += 20;
        if (businessInfo.visaData.riskScore < 0.15) baseScore += 15;
      }
      
      // Alternative data bonuses
      let altDataScore = 0;
      if (businessInfo.mobileMoneyPhone) altDataScore += 15;
      if (businessInfo.facebookPage) altDataScore += 10;
      if (businessInfo.instagramAccount) altDataScore += 10;
      if (businessInfo.communityReferences) altDataScore += 20;
      
      const finalScore = Math.min(baseScore + altDataScore, 850);
      
      return {
        overallScore: finalScore,
        breakdown: {
          businessFundamentals: Math.min(baseScore - 600, 100),
          visaData: businessInfo.hasVisaMerchant ? 80 : 0,
          alternativeData: altDataScore,
          total: finalScore
        },
        riskLevel: finalScore >= 720 ? 'Low' : finalScore >= 650 ? 'Medium' : 'High',
        interestRateAdjustment: businessInfo.hasVisaMerchant ? -3 : 0,
        maxLoanAmount: calculateMaxLoan(finalScore, monthlyRevenue),
        approvalProbability: calculateApprovalProbability(finalScore)
      };
    };

    // Simulate risk assessment calculation
    setTimeout(() => {
      const assessment = calculateRiskAssessment(userData.businessInfo);
      setRiskAssessment(assessment);
      setLoading(false);
    }, 1500);
  }, [userData.businessInfo, router]);
  
  const getEnhancedLoanProducts = () => {
    if (!riskAssessment) return loanProducts;
    
    return loanProducts.map(loan => {
      const baseRate = parseFloat(loan.interestRate.split(' - ')[0].replace('%', ''));
      const adjustedRate = Math.max(baseRate + riskAssessment.interestRateAdjustment, 8);
      
      // Adjust loan amounts based on risk assessment
      const maxAmount = riskAssessment.maxLoanAmount;
      let adjustedAmount = loan.amount;
      
      if (loan.id === 'micro-loan' && maxAmount >= 5000) {
        adjustedAmount = '$500 - $8,000';
      } else if (loan.id === 'growth-loan' && maxAmount >= 25000) {
        adjustedAmount = '$5,000 - $35,000';
      } else if (loan.id === 'expansion-loan' && maxAmount >= 50000) {
        adjustedAmount = '$25,000 - $150,000';
      }
      
      return {
        ...loan,
        amount: adjustedAmount,
        interestRate: `${adjustedRate}% - ${adjustedRate + 4}%`,
        approvalProbability: riskAssessment.approvalProbability,
        riskLevel: riskAssessment.riskLevel,
        visaDiscount: userData.businessInfo.hasVisaMerchant
      };
    });
  };
  
  const handleSelectLoan = (loan) => {
    selectLoan({
      ...loan,
      riskAssessment: riskAssessment
    });
    router.push('/improvement-plan');
  };

  const handleVisaSignup = () => {
    // Simulate Visa merchant signup process
    alert('Redirecting to Visa Merchant Services signup...');
    // In real app: window.open('https://visa.com/merchant-signup', '_blank');
    setShowVisaModal(false);
  };

  const VisaModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Visa Merchant Benefits</h3>
          <button 
            onClick={() => setShowVisaModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🚀 Immediate Benefits</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Accept credit card payments</li>
              <li>• Increase sales by 20-30%</li>
              <li>• Build payment history</li>
              <li>• Professional business image</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">💰 Loan Improvements</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Up to 3% lower interest rates</li>
              <li>• +100 credit score points</li>
              <li>• Higher approval chances</li>
              <li>• Larger loan amounts</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">📊 Business Insights</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Customer spending patterns</li>
              <li>• Sales analytics dashboard</li>
              <li>• Fraud protection</li>
              <li>• 24/7 customer support</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <Button onClick={handleVisaSignup} className="w-full">
            Get Started with Visa
          </Button>
          <Button 
            variant="text" 
            onClick={() => setShowVisaModal(false)}
            className="w-full text-gray-600"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
  
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Analyzing Your Profile...</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Calculating personalized loan options
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <FadeTransition>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Loan Options</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Personalized for <span className="font-semibold">{userData.businessInfo.name}</span>
            </p>
          </div>
        </FadeTransition>

        {/* Compact Risk Assessment */}
        {riskAssessment && (
          <FadeTransition delay={0.2}>
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800">Credit Assessment</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{riskAssessment.overallScore}</div>
                  <div className="text-xs text-gray-500">Credit Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-sm font-semibold text-gray-800">
                    {Math.round(riskAssessment.approvalProbability * 100)}%
                  </div>
                  <div className="text-xs text-gray-600">Approval Rate</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-sm font-semibold text-gray-800">{riskAssessment.riskLevel}</div>
                  <div className="text-xs text-gray-600">Risk Level</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-sm font-semibold text-gray-800">
                    ${riskAssessment.maxLoanAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Max Amount</div>
                </div>
              </div>
            </div>
          </FadeTransition>
        )}
        
        {/* Enhanced Mobile-Optimized Loan Cards */}
        <FadeTransition delay={0.4}>
          <div className="space-y-4">
            {getEnhancedLoanProducts().map((loan, index) => (
              <FadeTransition key={loan.id} delay={0.1 * index}>
                <div className="bg-white rounded-xl p-4 shadow-sm relative">
                  {loan.visaDiscount && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Visa Discount
                    </div>
                  )}
                  
                  {/* Header with Loan Name */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{loan.name}</h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      loan.approvalProbability >= 0.8 ? 'bg-green-100 text-green-800' : 
                      loan.approvalProbability >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {Math.round(loan.approvalProbability * 100)}% approval chance
                    </div>
                  </div>
                  
                  {/* Key Loan Details - Prominently Displayed */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 gap-3">
                      {/* Loan Amount */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">💰 Loan Amount:</span>
                        <span className="text-lg font-bold text-gray-900">{loan.amount}</span>
                      </div>
                      
                      {/* Loan Term */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">⏰ Loan Term:</span>
                        <span className="text-lg font-bold text-gray-900">{loan.term}</span>
                      </div>
                      
                      {/* Interest Rate */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">📊 Interest Rate:</span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{loan.interestRate}</span>
                          {loan.visaDiscount && (
                            <div className="text-xs text-blue-600 font-medium">(-3% Visa discount)</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar for Approval Probability */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Approval Likelihood</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round(loan.approvalProbability * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          loan.approvalProbability >= 0.8 ? 'bg-green-500' : 
                          loan.approvalProbability >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${loan.approvalProbability * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">{loan.description}</p>
                  
                  {/* Collapsible Details */}
                  <details className="mb-4">
                    <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 flex items-center">
                      <span>View Requirements & Data Sources</span>
                      <svg className="w-4 h-4 ml-1 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-700">
                          {loan.requirements && loan.requirements.slice(0, 3).map((req, i) => (
                            <li key={i} className="flex items-start mb-1">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Data Sources:</h4>
                        <ul className="text-sm text-gray-700">
                          {userData.businessInfo.hasVisaMerchant && (
                            <li className="flex items-start mb-1">
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              <span className="text-blue-600 font-medium">Visa Transaction History</span>
                            </li>
                          )}
                          {loan.alternativeDataUsed && loan.alternativeDataUsed.slice(0, 2).map((data, i) => (
                            <li key={i} className="flex items-start mb-1">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span>{data}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                  
                  {/* Action Button */}
                  <Button
                    onClick={() => handleSelectLoan(loan)}
                    className="w-full text-lg py-3 font-semibold"
                  >
                    Select This Loan
                  </Button>
                </div>
              </FadeTransition>
            ))}
          </div>
        </FadeTransition>

        {/* Visa Merchant CTA - Now Functional */}
        {!userData.businessInfo.hasVisaMerchant && (
          <FadeTransition delay={0.6}>
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  💡
                </div>
                <h3 className="text-lg font-semibold">Want Better Terms?</h3>
              </div>
              
              <p className="text-sm text-blue-100 mb-4">
                Become a Visa merchant to unlock up to 3% lower rates and +100 credit score points.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => setShowVisaModal(true)}
                  className="bg-white text-blue-600 hover:bg-blue-700 flex-1"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </FadeTransition>
        )}
      </div>
      
      {/* Visa Modal */}
      {showVisaModal && <VisaModal />}
    </div>
  );
}