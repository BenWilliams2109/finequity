// src/app/improvement-plan/page.js - Fixed useEffect version
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
  const [completedTasks, setCompletedTasks] = useState(new Set());
  
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

    // Generate ML predictions - moved inside useEffect
    const generateMLPredictions = () => {
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
            currentRevenue: parseInt(userData.businessInfo.monthlyRevenue || '0') || 0,
            projectedRevenue: {
              '6months': (parseInt(userData.businessInfo.monthlyRevenue || '0') || 0) * 1.3,
              '12months': (parseInt(userData.businessInfo.monthlyRevenue || '0') || 0) * 1.6,
              '24months': (parseInt(userData.businessInfo.monthlyRevenue || '0') || 0) * 2.1
            }
          }
        });
      }, 1000);
    };

    // Generate ESG Score - moved inside useEffect
    const generateESGScore = () => {
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

    // Call the functions
    generateMLPredictions();
    generateESGScore();
    
  }, [userData, setImprovementPlan, router]); // All dependencies included

  const toggleTaskComplete = (index) => {
    const newCompleted = new Set(completedTasks);
    if (completedTasks.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedTasks(newCompleted);
  };

  const getProgress = () => {
    const total = userData.improvementPlan.length;
    const completed = completedTasks.size;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };
  
  if (!userData.selectedLoan) {
    return null;
  }
  
  const handleChatClick = () => {
    router.push('/chat');
  };

  const progress = getProgress();

  const TaskCard = ({ task, index, isCompleted, onToggle }) => (
    <div className={`bg-white rounded-lg p-4 border transition-all ${
      isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow-sm'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(index)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
            isCompleted 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {isCompleted && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-medium mb-1 ${isCompleted ? 'text-green-800 line-through' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className={`text-sm mb-3 ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
            {task.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 
              task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {task.difficulty === 'easy' ? '🟢 Easy' : 
               task.difficulty === 'medium' ? '🟡 Medium' : '🔴 Hard'}
            </span>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.impact === 'high' ? 'bg-purple-100 text-purple-700' : 
              task.impact === 'medium' ? 'bg-blue-100 text-blue-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {task.impact === 'high' ? '⚡ High Impact' : 
               task.impact === 'medium' ? '📈 Medium Impact' : '📊 Low Impact'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <FadeTransition>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Growth Plan</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Step-by-step roadmap to improve your loan terms
            </p>
          </div>
        </FadeTransition>

        {/* Mobile-Optimized Tab Navigation */}
        <div className="flex overflow-x-auto space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { id: 'plan', label: 'Action Plan', icon: '✅' },
            { id: 'predictions', label: 'Predictions', icon: '📊' },
            { id: 'sustainability', label: 'ESG Score', icon: '🌱' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            {/* Selected Loan Summary - Simplified */}
            <FadeTransition>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Selected Loan</h2>
                  <span className="text-sm font-medium text-green-600">
                    {Math.round(userData.selectedLoan.approvalProbability * 100)}% approval
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{userData.selectedLoan.name}</div>
                    <div className="text-gray-600">{userData.selectedLoan.amount}</div>
                  </div>
                  <div>
                    <div className="text-gray-700">{userData.selectedLoan.interestRate}</div>
                    <div className="text-gray-600">{userData.selectedLoan.term}</div>
                  </div>
                </div>
              </div>
            </FadeTransition>

            {/* Progress Tracker */}
            <FadeTransition delay={0.1}>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Progress</h3>
                  <span className="text-sm font-medium text-blue-600">
                    {progress.completed} of {progress.total} completed
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-gray-600">
                  {progress.percentage === 100 ? 
                    "🎉 All tasks completed! You're ready to reapply." :
                    `${Math.round(progress.percentage)}% complete - Keep going!`
                  }
                </div>
              </div>
            </FadeTransition>
                
            {/* Action Items - Simplified */}
            <FadeTransition delay={0.2}>
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h2>
                {userData.improvementPlan.map((item, index) => (
                  <TaskCard
                    key={index}
                    task={item}
                    index={index}
                    isCompleted={completedTasks.has(index)}
                    onToggle={toggleTaskComplete}
                  />
                ))}
              </div>
            </FadeTransition>

            {/* Quick Actions */}
            <FadeTransition delay={0.3}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                <h3 className="font-semibold mb-2">Need Help Getting Started?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Our AI assistant can guide you through each step and answer questions.
                </p>
                <Button
                  onClick={handleChatClick}
                  className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  💬 Get Help from AI Assistant
                </Button>
              </div>
            </FadeTransition>
          </div>
        )}

        {activeTab === 'predictions' && (
          <FadeTransition>
            {mlPredictions ? (
              <MLPredictionsDashboard predictions={mlPredictions} businessInfo={userData.businessInfo} />
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading predictions...</p>
              </div>
            )}
          </FadeTransition>
        )}

        {activeTab === 'sustainability' && (
          <FadeTransition>
            {esgScore ? (
              <ESGAssessment esgData={esgScore} businessInfo={userData.businessInfo} />
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Calculating ESG score...</p>
              </div>
            )}
          </FadeTransition>
        )}

        {/* Bottom Navigation - Mobile Friendly */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
          <div className="max-w-sm mx-auto">
            <Button
              onClick={handleChatClick}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              💬 Need Help? Chat with AI
            </Button>
          </div>
        </div>

        {/* Spacer for fixed bottom navigation */}
        <div className="h-20 sm:h-0"></div>
      </div>
    </div>
  );
}