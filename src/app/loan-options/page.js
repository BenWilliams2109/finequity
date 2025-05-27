// src/app/loan-options/page.js - Enhanced version
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
  
  useEffect(() => {
    // Redirect if no business info
    if (!userData.businessInfo.name) {
      router.push('/business-profile');
      return;
    }

    // Simulate risk assessment calculation
    setTimeout(() => {
      const assessment = calculateRiskAssessment(userData.businessInfo);
      setRiskAssessment(assessment);
      setLoading(false);
    }, 1500);
  }, [userData.businessInfo, router]);

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
  
  if (loading) {
    return (
      <div className="bg-secondary min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Analyzing Your Business Profile...</h2>
            <p className="text-gray-600 mt-2">
              We're processing your information and calculating personalized loan options
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Your Personalized Loan Options</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your business profile for {userData.businessInfo.name}, here are your tailored loan recommendations.
            </p>
          </div>
        </FadeTransition>

        {/* Risk Assessment Dashboard */}
        {riskAssessment && (
          <FadeTransition delay={0.2}>
            <RiskAssessmentDashboard 
              riskData={riskAssessment} 
              businessInfo={userData.businessInfo}
            />
          </FadeTransition>
        )}
        
        {/* Loan Products */}
        <FadeTransition delay={0.4}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            {getEnhancedLoanProducts().map((loan, index) => (
              <FadeTransition key={loan.id} delay={0.1 * index}>
                <div className="card hover:shadow-lg h-full flex flex-col relative">
                  {loan.visaDiscount && (
                    <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Visa Discount Applied
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold text-primary">{loan.name}</h2>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-lg font-semibold">{loan.amount}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-700">{loan.term}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-gray-600">Interest: {loan.interestRate}</span>
                    {loan.visaDiscount && (
                      <span className="text-blue-600 text-sm font-medium">(-3% Visa discount)</span>
                    )}
                  </div>
                  
                  {/* Approval Probability */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Approval Probability</span>
                      <span className={`text-sm font-bold ${
                        loan.approvalProbability >= 0.8 ? 'text-green-600' : 
                        loan.approvalProbability >= 0.6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {Math.round(loan.approvalProbability * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          loan.approvalProbability >= 0.8 ? 'bg-green-500' : 
                          loan.approvalProbability >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${loan.approvalProbability * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
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
                    <h3 className="font-medium text-primary mb-2">Data Sources Used:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {userData.businessInfo.hasVisaMerchant && (
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-blue-600 font-medium">Visa Transaction History ✓</span>
                        </li>
                      )}
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
        </FadeTransition>

        {/* Visa Merchant Onboarding CTA */}
        {!userData.businessInfo.hasVisaMerchant && (
          <FadeTransition delay={0.6}>
            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                💡 Want Even Better Terms?
              </h2>
              <p className="text-blue-700 mb-4">
                Becoming a Visa merchant can improve your credit score by up to 100 points and 
                reduce your interest rates by 3%. Plus, you'll get access to business analytics 
                and customer insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Learn About Visa Merchant Services
                </Button>
                <Button variant="text" className="text-blue-600">
                  Continue with Current Options →
                </Button>
              </div>
            </div>
          </FadeTransition>
        )}
      </div>
    </div>
  );
}