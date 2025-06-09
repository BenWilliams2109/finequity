// src/components/sustainability/ESGAssessment.js - Mobile-optimized version
'use client';

import { useState } from 'react';

const ESGAssessment = ({ esgData, businessInfo }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);

  // Enhanced ESG data with better mobile presentation
  const defaultESGData = {
    overall: businessInfo?.industry === 'Food' ? 78 : 
             businessInfo?.industry === 'Crafts' ? 82 : 75,
    breakdown: {
      environmental: businessInfo?.industry === 'Food' ? 75 : 
                    businessInfo?.industry === 'Crafts' ? 85 : 70,
      social: businessInfo?.communityReferences ? 90 : 80,
      governance: businessInfo?.hasVisaMerchant ? 80 : 70
    },
    quickWins: [
      {
        title: "Set up recycling program",
        impact: "Environmental +15 pts",
        effort: "Low",
        timeframe: "1 week",
        category: "environmental"
      },
      {
        title: "Document community partnerships",
        impact: "Social +12 pts",
        effort: "Low", 
        timeframe: "2 days",
        category: "social"
      },
      {
        title: "Create business policy handbook",
        impact: "Governance +18 pts",
        effort: "Medium",
        timeframe: "2 weeks",
        category: "governance"
      }
    ],
    certifications: [
      { name: "Fair Trade", available: true, points: 25 },
      { name: "Women-Owned Business", available: true, points: 20 },
      { name: "Local Sustainability", available: false, points: 15 }
    ]
  };

  const data = { ...defaultESGData, ...(esgData || {}) };
  const overallGrade = data.overall >= 80 ? 'A' : data.overall >= 70 ? 'B' : data.overall >= 60 ? 'C' : 'D';
  const gradeColor = data.overall >= 80 ? 'text-green-600' : data.overall >= 70 ? 'text-blue-600' : data.overall >= 60 ? 'text-yellow-600' : 'text-red-600';

  const ScoreCircle = ({ score, label, color, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-20 h-20',
      lg: 'w-24 h-24'
    };
    
    const colorClasses = {
      green: 'text-green-500 bg-green-50',
      blue: 'text-blue-500 bg-blue-50',
      purple: 'text-purple-500 bg-purple-50'
    };

    return (
      <div className="text-center">
        <div className={`relative ${sizeClasses[size]} mx-auto mb-2 ${colorClasses[color]} rounded-full flex items-center justify-center`}>
          <div className="text-center">
            <div className={`text-lg font-bold ${colorClasses[color].split(' ')[0]}`}>{score}</div>
            <div className="text-xs text-gray-500">/100</div>
          </div>
        </div>
        <div className="text-xs font-medium text-gray-700">{label}</div>
      </div>
    );
  };

  const QuickWinCard = ({ win, index }) => (
    <div className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm flex-1">{win.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          win.effort === 'Low' ? 'bg-green-100 text-green-700' :
          win.effort === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {win.effort}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
        <span>⏱️ {win.timeframe}</span>
        <span className="font-medium text-blue-600">{win.impact}</span>
      </div>
      
      <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded text-xs font-medium transition-colors">
        Get Started →
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header with Overall Score */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold">ESG Impact Score</h2>
            <p className="text-green-100 text-sm">Environmental, Social & Governance</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{data.overall}</div>
            <div className={`text-lg font-bold ${gradeColor.replace('text-', 'text-white')}`}>Grade {overallGrade}</div>
          </div>
        </div>
        
        {/* Credit Benefits Preview */}
        <div className="grid grid-cols-3 gap-2 bg-white/10 rounded-lg p-2">
          <div className="text-center">
            <div className="text-sm font-bold">+{Math.round(data.overall * 0.3)}</div>
            <div className="text-xs opacity-90">Credit Points</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold">-1.5%</div>
            <div className="text-xs opacity-90">Interest Rate</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold">+25%</div>
            <div className="text-xs opacity-90">Loan Amount</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Mobile Optimized */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'actions', label: 'Quick Wins', icon: '⚡' },
          { id: 'details', label: 'Details', icon: '📋' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-1 ${
              activeSection === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeSection === 'overview' && (
        <div className="space-y-4">
          {/* Category Breakdown */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Score Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              <ScoreCircle 
                score={data.breakdown.environmental} 
                label="Environment" 
                color="green" 
              />
              <ScoreCircle 
                score={data.breakdown.social} 
                label="Social" 
                color="blue" 
              />
              <ScoreCircle 
                score={data.breakdown.governance} 
                label="Governance" 
                color="purple" 
              />
            </div>
          </div>

          {/* Key Strengths */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Your Strengths</h3>
            <div className="space-y-2">
              {businessInfo?.industry === 'Food' && (
                <div className="flex items-center p-2 bg-green-50 rounded-lg">
                  <span className="text-green-600 mr-2">🌱</span>
                  <span className="text-sm text-green-800">Strong local sourcing practices</span>
                </div>
              )}
              {businessInfo?.communityReferences && (
                <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 mr-2">🤝</span>
                  <span className="text-sm text-blue-800">Active community engagement</span>
                </div>
              )}
              {businessInfo?.hasVisaMerchant && (
                <div className="flex items-center p-2 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 mr-2">💳</span>
                  <span className="text-sm text-purple-800">Transparent payment processing</span>
                </div>
              )}
            </div>
          </div>

          {/* Available Certifications */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Available Certifications</h3>
            <div className="space-y-2">
              {(data.certifications || []).filter(cert => cert.available).map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">🏆</span>
                    <span className="text-sm font-medium text-gray-900">{cert.name}</span>
                  </div>
                  <span className="text-xs font-medium text-green-600">+{cert.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'actions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-1">Quick Wins</h3>
            <p className="text-sm text-gray-600 mb-4">Easy actions to boost your ESG score</p>
            
            <div className="space-y-3">
              {(data.quickWins || []).map((win, index) => (
                <QuickWinCard key={index} win={win} index={index} />
              ))}
            </div>
          </div>

          {/* Impact Calculator */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Potential Impact</h3>
            <p className="text-sm text-gray-600 mb-3">
              Complete all quick wins to potentially increase your score by <strong>45 points</strong>
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-2 rounded-lg text-center">
                <div className="font-bold text-blue-600">+13</div>
                <div className="text-gray-600">Credit Points</div>
              </div>
              <div className="bg-white p-2 rounded-lg text-center">
                <div className="font-bold text-green-600">-0.8%</div>
                <div className="text-gray-600">Interest Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'details' && (
        <div className="space-y-4">
          {/* Environmental Details */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="text-green-500 mr-2">🌿</span>
                Environmental
              </h3>
              <span className="text-lg font-bold text-green-600">{data.breakdown.environmental}</span>
            </div>
            
            <div className="space-y-2">
              {[
                { name: "Waste Management", score: businessInfo?.industry === 'Food' ? 85 : 70 },
                { name: "Energy Use", score: 65 },
                { name: "Sustainable Sourcing", score: businessInfo?.industry === 'Crafts' ? 90 : 60 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Details */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="text-blue-500 mr-2">👥</span>
                Social Impact
              </h3>
              <span className="text-lg font-bold text-blue-600">{data.breakdown.social}</span>
            </div>
            
            <div className="space-y-2">
              {[
                { name: "Community Engagement", score: businessInfo?.communityReferences ? 85 : 65 },
                { name: "Job Creation", score: 80 },
                { name: "Local Economic Impact", score: businessInfo?.industry === 'Food' ? 90 : 75 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Details */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="text-purple-500 mr-2">🏢</span>
                Governance
              </h3>
              <span className="text-lg font-bold text-purple-600">{data.breakdown.governance}</span>
            </div>
            
            <div className="space-y-2">
              {[
                { name: "Business Registration", score: 100 },
                { name: "Financial Transparency", score: businessInfo?.hasVisaMerchant ? 85 : 60 },
                { name: "Risk Management", score: 65 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visa Partnership CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Visa Sustainability Program</h3>
          <div className="bg-white/20 px-2 py-1 rounded-full">
            <span className="text-xs font-medium">✨ Qualified</span>
          </div>
        </div>
        <p className="text-blue-100 text-sm mb-3">
          Your ESG score qualifies for enhanced sustainability lending benefits
        </p>
        <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Learn More About Benefits
        </button>
      </div>
    </div>
  );
};

export default ESGAssessment;