// src/app/improvement-plan/page.js - Enhanced version
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import { useUserData } from '../../context/UserDataContext';
import { recommendAlternativeData } from '../../lib/loan-products';
import MLPredictionsDashboard from '../../components/ml/MLPredictionsDashboard';
import ESGAssessment from '../../components/sustainability/ESGAssessment';

export default function ImprovementPlan() {
  const router = useRouter();
  const { userData, setImprovementPlan } = useUserData();
  const [activeTab, setActiveTab] = useState('plan');
  const [mlPredictions, setMLPredictions] = useState(null);
  const [esgScore, setESGScore] = useState(null);
  
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

    // Generate ML predictions
    generateMLPredictions();
    generateESGScore();
  }, [userData, setImprovementPlan, router]);

  const generateMLPredictions = () => {
    // Simulate ML prediction API call
    setTimeout(() => {
      const currentScore = userData.selectedLoan?.riskAssessment?.overallScore || 650;
      const hasVisa = userData.businessInfo.hasVisaMerchant;
      
      setMLPredictions({
        currentScore: currentScore,
        projectedScore: {
          '3months': currentScore + (hasVisa ? 25 : 35),
          '6months': currentScore + (hasVisa ? 45 : 65),
          '12months': currentScore + (hasVisa ? 70 : 95)
        },
        loanSuccessProbability: 0.78 + (hasVisa ? 0.15 : 0.08),
        recommendedActions: [
          {
            action: hasVisa ? "Maintain consistent Visa transaction volume" : "Apply for Visa merchant account",
            impact: hasVisa ? 15 : 45,
            timeframe: hasVisa ? "Ongoing" : "2-3 weeks",
            priority: "High"
          },
          {
            action: "Establish social media business presence",
            impact: 20,
            timeframe: "1-2 weeks", 
            priority: userData.businessInfo.facebookPage ? "Low" : "Medium"
          },
          {
            action: "Collect customer testimonials and reviews",
            impact: 15,
            timeframe: "2-4 weeks",
            priority: "Medium"
          },
          {
            action: "Document supplier relationships",
            impact: 10,
            timeframe: "1 week",
            priority: "Low"
          }
        ],
        businessGrowthProjection: {
          currentRevenue: parseInt(userData.businessInfo.monthlyRevenue),
          projectedRevenue: {
            '6months': parseInt(userData.businessInfo.monthlyRevenue) * 1.3,
            '12months': parseInt(userData.businessInfo.monthlyRevenue) * 1.6,
            '24months': parseInt(userData.businessInfo.monthlyRevenue) * 2.1
          }
        }
      });
    }, 1000);
  };

  const generateESGScore = () => {
    // Simulate ESG assessment
    setTimeout(() => {
      const industryESGScores = {
        'Food': { environmental: 75, social: 85, governance: 70 },
        'Crafts': { environmental: 85, social: 90, governance: 65 },
        'Agriculture': { environmental: 90, social: 80, governance: 60 },
        'Retail': { environmental: 65, social: 75, governance: 80 },
        'Services': { environmental: 70, social: 85, governance: 75 },
        'Manufacturing': { environmental: 60, social: 70, governance: 70 },
        'Technology': { environmental: 75, social: 80, governance: 85 }
      };

      const baseScores = industryESGScores[userData.businessInfo.industry] || 
                        { environmental: 70, social: 75, governance: 70 };
      
      // Adjust based on available data
      if (userData.businessInfo.communityReferences) {
        baseScores.social += 10;
        baseScores.governance += 5;
      }

      const overallESG = Math.round((baseScores.environmental + baseScores.social + baseScores.governance) / 3);
      
      setESGScore({
        overall: overallESG,
        breakdown: baseScores,
        recommendations: [
          {
            category: "Environmental",
            suggestion: "Implement waste reduction practices",
            impact: "Reduce costs by 10-15%",
            creditBenefit: "+5 credit score points"
          },
          {
            category: "Social", 
            suggestion: "Document community involvement",
            impact: "Strengthen local relationships",
            creditBenefit: "+8 credit score points"
          },
          {
            category: "Governance",
            suggestion: "Formalize business processes",
            impact: "Improve operational efficiency",
            creditBenefit: "+12 credit score points"
          }
        ],
        certificationOpportunities: [
          "Fair Trade Certification",
          "Women-Owned Business Certification", 
          "Local Sustainability Recognition"
        ]
      });
    }, 1200);
  };
  
  if (!userData.selectedLoan) {
    return null;
  }
  
  const handleChatClick = () => {
    router.push('/chat');
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Your Financial Growth Plan</h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Comprehensive roadmap to improve your business profile, access better loan terms, 
              and build long-term financial success.
            </p>
          </div>
        </FadeTransition>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            {[
              { id: 'plan', label: 'Improvement Plan', icon: '📈' },
              { id: 'predictions', label: 'ML Predictions', icon: '🤖' },
              { id: 'sustainability', label: 'ESG Score', icon: '🌱' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'plan' && (
          <div className="space-y-8">
            {/* Selected Loan Summary */}
            <FadeTransition>
              <div className="card">
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <h2 className="text-xl font-semibold text-primary mb-4">Selected Loan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium">{userData.selectedLoan.name}</p>
                      <p className="text-gray-600">{userData.selectedLoan.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-700">Interest: {userData.selectedLoan.interestRate}</p>
                      <p className="text-gray-600">Term: {userData.selectedLoan.term}</p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Approval Probability: 
                        <span className="font-semibold text-green-600 ml-2">
                          {Math.round(userData.selectedLoan.approvalProbability * 100)}%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-primary mb-6">Recommended Improvements</h2>
                
                <div className="space-y-6">
                  {userData.improvementPlan.map((item, index) => (
                    <FadeTransition key={index} delay={0.1 * index}>
                      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
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
                          <div className="ml-4 flex-grow">
                            <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                            <div className="mt-3 flex items-center space-x-4">
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
              </div>
            </FadeTransition>
          </div>
        )}

        {activeTab === 'predictions' && mlPredictions && (
          <FadeTransition>
            <MLPredictionsDashboard predictions={mlPredictions} businessInfo={userData.businessInfo} />
          </FadeTransition>
        )}

        {activeTab === 'sustainability' && esgScore && (
          <FadeTransition>
            <ESGAssessment esgData={esgScore} businessInfo={userData.businessInfo} />
          </FadeTransition>
        )}

        {/* Chat CTA */}
        <FadeTransition delay={0.8}>
          <div className="card text-center mt-12">
            <h2 className="text-xl font-semibold text-primary mb-4">Need More Help?</h2>
            <p className="text-gray-600 mb-6">
              Our AI assistant can answer your questions about loans, alternative data, 
              financial inclusion, and help you understand your improvement plan.
            </p>
            <Button
              onClick={handleChatClick}
              className="px-8 py-4 text-lg"
            >
              Chat With Our Financial Assistant
            </Button>
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}