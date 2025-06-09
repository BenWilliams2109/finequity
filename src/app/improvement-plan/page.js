// src/app/improvement-plan/page.js - Overhauled with better predictions and fixed button
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import { useUserData } from '../../context/UserDataContext';
import { recommendAlternativeData } from '../../lib/loan-products';

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

    // Generate comprehensive ML predictions
    const generateMLPredictions = () => {
      setTimeout(() => {
        const currentScore = userData.selectedLoan?.riskAssessment?.overallScore || 650;
        const hasVisa = userData.businessInfo.hasVisaMerchant;
        const currentRevenue = parseInt(userData.businessInfo.monthlyRevenue || '0') || 1000;
        
        setMLPredictions({
          currentScore: currentScore,
          projectedScore: {
            '3months': currentScore + (hasVisa ? 25 : 35),
            '6months': currentScore + (hasVisa ? 45 : 65),
            '12months': currentScore + (hasVisa ? 70 : 95)
          },
          loanSuccessProbability: {
            current: userData.selectedLoan?.approvalProbability || 0.65,
            '3months': Math.min((userData.selectedLoan?.approvalProbability || 0.65) + 0.15, 0.95),
            '6months': Math.min((userData.selectedLoan?.approvalProbability || 0.65) + 0.25, 0.98),
            '12months': Math.min((userData.selectedLoan?.approvalProbability || 0.65) + 0.30, 0.99)
          },
          recommendedActions: [
            {
              action: hasVisa ? "Maintain consistent Visa transaction volume" : "Apply for Visa merchant account",
              impact: hasVisa ? 15 : 45,
              timeframe: hasVisa ? "Ongoing" : "2-3 weeks",
              priority: "High",
              completed: false
            },
            {
              action: "Establish social media business presence",
              impact: 20,
              timeframe: "1-2 weeks", 
              priority: userData.businessInfo.facebookPage ? "Low" : "Medium",
              completed: !!userData.businessInfo.facebookPage
            },
            {
              action: "Collect customer testimonials and reviews",
              impact: 15,
              timeframe: "2-4 weeks",
              priority: "Medium",
              completed: false
            },
            {
              action: "Document supplier relationships",
              impact: 10,
              timeframe: "1 week",
              priority: "Low",
              completed: false
            }
          ],
          businessGrowthProjection: {
            currentRevenue: currentRevenue,
            projectedRevenue: {
              '3months': Math.round(currentRevenue * 1.15),
              '6months': Math.round(currentRevenue * 1.3),
              '12months': Math.round(currentRevenue * 1.6),
              '24months': Math.round(currentRevenue * 2.1)
            },
            factors: [
              { name: "Visa Payment Integration", impact: "+15-20% revenue" },
              { name: "Digital Marketing Presence", impact: "+10-15% customer reach" },
              { name: "Customer Reviews & Trust", impact: "+8-12% conversion rate" },
              { name: "Improved Credit Terms", impact: "+5-10% working capital" }
            ]
          },
          marketInsights: {
            industryGrowth: userData.businessInfo.industry === 'Food' ? 8.5 : 
                           userData.businessInfo.industry === 'Technology' ? 12.3 :
                           userData.businessInfo.industry === 'Retail' ? 6.2 : 7.8,
            localMarketTrends: [
              "Digital payment adoption increased 35% in your region",
              "Small business lending approval rates improved 12% this quarter",
              "Social commerce driving 25% more customer discovery"
            ],
            competitiveAdvantages: [
              hasVisa ? "Payment flexibility gives edge over cash-only competitors" : "Digital payment capability would differentiate from competitors",
              "Strong community ties provide customer loyalty advantage",
              "Growing market demand for " + (userData.businessInfo.industry || "your services").toLowerCase()
            ]
          }
        });
      }, 1000);
    };

    // Generate ESG Score
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
          ]
        });
      }, 1200);
    };

    generateMLPredictions();
    generateESGScore();
    
  }, [userData, setImprovementPlan, router]);

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

  // AI Predictions Dashboard Component
  const AIPredictionsDashboard = () => {
    if (!mlPredictions) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI predictions...</p>
        </div>
      );
    }

    // Prepare chart data for Recharts
    const creditScoreChartData = [
      { period: 'Current', score: mlPredictions.currentScore, label: 'Now' },
      { period: '3 Months', score: mlPredictions.projectedScore['3months'], label: '3M' },
      { period: '6 Months', score: mlPredictions.projectedScore['6months'], label: '6M' },
      { period: '12 Months', score: mlPredictions.projectedScore['12months'], label: '12M' }
    ];

    const approvalChartData = [
      { 
        period: 'Current', 
        approval: Math.round(mlPredictions.loanSuccessProbability.current * 100),
        label: 'Now'
      },
      { 
        period: '3 Months', 
        approval: Math.round(mlPredictions.loanSuccessProbability['3months'] * 100),
        label: '3M'
      },
      { 
        period: '6 Months', 
        approval: Math.round(mlPredictions.loanSuccessProbability['6months'] * 100),
        label: '6M'
      },
      { 
        period: '12 Months', 
        approval: Math.round(mlPredictions.loanSuccessProbability['12months'] * 100),
        label: '12M'
      }
    ];

    const revenueChartData = [
      { 
        period: 'Current', 
        revenue: mlPredictions.businessGrowthProjection.currentRevenue,
        label: 'Now'
      },
      { 
        period: '3 Months', 
        revenue: mlPredictions.businessGrowthProjection.projectedRevenue['3months'],
        label: '3M'
      },
      { 
        period: '6 Months', 
        revenue: mlPredictions.businessGrowthProjection.projectedRevenue['6months'],
        label: '6M'
      },
      { 
        period: '12 Months', 
        revenue: mlPredictions.businessGrowthProjection.projectedRevenue['12months'],
        label: '12M'
      }
    ];

    // Custom tooltip components
    const CreditScoreTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-lg">
            <p className="font-medium text-blue-900">{label}</p>
            <p className="text-blue-700">
              Credit Score: <span className="font-bold">{payload[0].value}</span>
            </p>
          </div>
        );
      }
      return null;
    };

    const ApprovalTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-green-200 rounded-lg shadow-lg">
            <p className="font-medium text-green-900">{label}</p>
            <p className="text-green-700">
              Approval Rate: <span className="font-bold">{payload[0].value}%</span>
            </p>
          </div>
        );
      }
      return null;
    };

    const RevenueTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-purple-200 rounded-lg shadow-lg">
            <p className="font-medium text-purple-900">{label}</p>
            <p className="text-purple-700">
              Revenue: <span className="font-bold">${payload[0].value.toLocaleString()}</span>
            </p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="space-y-6">
        {/* Credit Score Projection */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            📊 Credit Score Projection
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {/* Chart */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-3">Score Progression</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={creditScoreChartData}>
                    <XAxis 
                      dataKey="label" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#1e40af' }}
                    />
                    <YAxis hide />
                    <Tooltip content={<CreditScoreTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#1D4ED8" 
                      strokeWidth={3}
                      dot={{ fill: '#1D4ED8', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#1D4ED8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Data Points */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Current</div>
                <div className="text-2xl font-bold text-gray-900">{mlPredictions.currentScore}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600">3 Months</div>
                <div className="text-xl font-bold text-blue-700">{mlPredictions.projectedScore['3months']}</div>
                <div className="text-xs text-green-600">+{mlPredictions.projectedScore['3months'] - mlPredictions.currentScore}</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600">6 Months</div>
                <div className="text-xl font-bold text-green-700">{mlPredictions.projectedScore['6months']}</div>
                <div className="text-xs text-green-600">+{mlPredictions.projectedScore['6months'] - mlPredictions.currentScore}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-purple-600">12 Months</div>
                <div className="text-xl font-bold text-purple-700">{mlPredictions.projectedScore['12months']}</div>
                <div className="text-xs text-green-600">+{mlPredictions.projectedScore['12months'] - mlPredictions.currentScore}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🎯 Key Insights</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Following our plan could improve your score by up to {mlPredictions.projectedScore['12months'] - mlPredictions.currentScore} points</li>
              <li>• You're currently in the {mlPredictions.currentScore >= 720 ? 'excellent' : mlPredictions.currentScore >= 650 ? 'good' : 'fair'} credit range</li>
              <li>• Target score of 720+ unlocks premium loan rates</li>
            </ul>
          </div>
        </div>

        {/* Loan Approval Probability */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            🎯 Loan Approval Probability
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {/* Chart */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-3">Approval Progression</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={approvalChartData}>
                    <XAxis 
                      dataKey="label" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#059669' }}
                    />
                    <YAxis hide />
                    <Tooltip content={<ApprovalTooltip />} />
                    <Bar 
                      dataKey="approval" 
                      fill="#059669" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Data Points */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(mlPredictions.loanSuccessProbability).map(([period, probability]) => (
                <div key={period} className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-sm text-gray-600 capitalize">
                    {period === 'current' ? 'Current' : period.replace('months', 'M')}
                  </div>
                  <div className="text-xl font-bold text-green-700">
                    {Math.round(probability * 100)}%
                  </div>
                  {period !== 'current' && (
                    <div className="text-xs text-green-600">
                      +{Math.round((probability - mlPredictions.loanSuccessProbability.current) * 100)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">💡 What This Means</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Your approval chances increase significantly with each completed action</li>
              <li>• 90%+ approval probability typically unlocks better interest rates</li>
              <li>• Multiple data sources strengthen your application credibility</li>
            </ul>
          </div>
        </div>

        {/* Revenue Growth Projection */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            💰 Revenue Growth Projection
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {/* Chart */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-purple-900 mb-3">Revenue Growth</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueChartData}>
                    <XAxis 
                      dataKey="label" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#7C3AED' }}
                    />
                    <YAxis hide />
                    <Tooltip content={<RevenueTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#7C3AED" 
                      strokeWidth={3}
                      dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#7C3AED' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Data Points */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Current</div>
                <div className="text-lg font-bold text-gray-900">
                  ${mlPredictions.businessGrowthProjection.currentRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">per month</div>
              </div>
              {Object.entries(mlPredictions.businessGrowthProjection.projectedRevenue).slice(0, 3).map(([period, revenue]) => (
                <div key={period} className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-sm text-purple-600 capitalize">
                    {period.replace('months', 'M')}
                  </div>
                  <div className="text-lg font-bold text-purple-700">
                    ${revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600">
                    +{Math.round(((revenue - mlPredictions.businessGrowthProjection.currentRevenue) / mlPredictions.businessGrowthProjection.currentRevenue) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Growth Factors:</h4>
            {mlPredictions.businessGrowthProjection.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-900">{factor.name}</span>
                <span className="text-sm text-purple-700">{factor.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            📈 Market Insights & Trends
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">📊 Industry Growth Rate</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                +{mlPredictions.marketInsights.industryGrowth}%
              </div>
              <p className="text-sm text-gray-600">Annual growth in your industry</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">🎯 Local Market Trends</h4>
              <ul className="space-y-2">
                {mlPredictions.marketInsights.localMarketTrends.map((trend, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">🏆 Your Competitive Advantages</h4>
            <ul className="space-y-1">
              {mlPredictions.marketInsights.competitiveAdvantages.map((advantage, index) => (
                <li key={index} className="text-sm text-yellow-800 flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // ESG Component
  const ESGDashboard = () => {
    if (!esgScore) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating ESG score...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🌱 ESG Assessment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{esgScore.overall}</div>
              <div className="text-sm text-green-600">Overall ESG Score</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-700">{esgScore.breakdown.environmental}</div>
              <div className="text-sm text-blue-600">Environmental</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-700">{esgScore.breakdown.social}</div>
              <div className="text-sm text-purple-600">Social</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-700">{esgScore.breakdown.governance}</div>
              <div className="text-sm text-orange-600">Governance</div>
            </div>
          </div>
          
          <div className="space-y-4">
            {esgScore.recommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{rec.category}</h4>
                <p className="text-sm text-gray-700 mb-2">{rec.suggestion}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-green-600">{rec.impact}</span>
                  <span className="text-blue-600">{rec.creditBenefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
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
            { id: 'predictions', label: 'AI Predictions', icon: '🤖' },
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
            {/* Selected Loan Summary */}
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
                
            {/* Action Items */}
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

            {/* Quick Actions - FIXED BUTTON */}
            <FadeTransition delay={0.3}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                <h3 className="font-semibold mb-2">Need Help Getting Started?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Our AI assistant can guide you through each step and answer questions.
                </p>
                <button
                  onClick={handleChatClick}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto justify-center"
                >
                  💬 Get Help from AI Assistant
                </button>
              </div>
            </FadeTransition>
          </div>
        )}

        {activeTab === 'predictions' && (
          <FadeTransition>
            <AIPredictionsDashboard />
          </FadeTransition>
        )}

        {activeTab === 'sustainability' && (
          <FadeTransition>
            <ESGDashboard />
          </FadeTransition>
        )}

        {/* Bottom Navigation - Mobile Friendly */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:hidden">
          <div className="max-w-sm mx-auto">
            <button
              onClick={handleChatClick}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              💬 Need Help? Chat with AI
            </button>
          </div>
        </div>

        {/* Spacer for fixed bottom navigation */}
        <div className="h-20 sm:h-0"></div>
      </div>
    </div>
  );
}