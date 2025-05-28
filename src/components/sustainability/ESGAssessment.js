// src/components/sustainability/ESGAssessment.js
'use client';

import { useState } from 'react';
import { LeafIcon, UsersIcon, BuildingOfficeIcon, StarIcon } from '@heroicons/react/24/outline';

const ESGAssessment = ({ esgData, businessInfo }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Default ESG data if none provided
  const defaultESGData = {
    overall: businessInfo?.industry === 'Food' ? 78 : 
             businessInfo?.industry === 'Crafts' ? 82 : 75,
    breakdown: {
      environmental: businessInfo?.industry === 'Food' ? 75 : 
                    businessInfo?.industry === 'Crafts' ? 85 : 70,
      social: businessInfo?.communityReferences ? 90 : 80,
      governance: businessInfo?.hasVisaMerchant ? 80 : 70
    },
    recommendations: [
      {
        category: "Environmental",
        suggestion: "Implement waste reduction practices",
        impact: "Reduce costs by 10-15%",
        creditBenefit: "+5 credit points"
      },
      {
        category: "Social", 
        suggestion: "Document community involvement",
        impact: "Strengthen local relationships",
        creditBenefit: "+8 credit points"
      },
      {
        category: "Governance",
        suggestion: "Formalize business processes",
        impact: "Improve operational efficiency",
        creditBenefit: "+12 credit points"
      }
    ]
  };

  const data = esgData || defaultESGData;

  const ScoreGauge = ({ score, label, color = 'blue' }) => {
    const colorClasses = {
      green: 'text-green-500',
      blue: 'text-blue-500', 
      purple: 'text-purple-500'
    };

    return (
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-2">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={`${(score / 100) * 220} 220`}
              className={colorClasses[color]}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${colorClasses[color]}`}>{score}</span>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">ESG Score</h3>
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${(data.overall / 100) * 251} 251`}
                className="text-green-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.overall}</div>
                <div className="text-xs text-gray-500">/100</div>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            {data.overall >= 80 ? 'Excellent' : 
             data.overall >= 70 ? 'Good' : 
             data.overall >= 60 ? 'Fair' : 'Needs Improvement'} Performance
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <ScoreGauge 
            score={data.breakdown.environmental} 
            label="Environmental" 
            color="green" 
          />
          <ScoreGauge 
            score={data.breakdown.social} 
            label="Social" 
            color="blue" 
          />
          <ScoreGauge 
            score={data.breakdown.governance} 
            label="Governance" 
            color="purple" 
          />
        </div>
      </div>

      {/* Credit Benefits */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <StarIcon className="w-5 h-5 mr-2 text-yellow-500" />
          ESG Credit Benefits
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-xl font-bold text-green-600">+{Math.round(data.overall * 0.3)}</div>
            <div className="text-xs text-gray-600">Credit Points</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-xl font-bold text-blue-600">-1.5%</div>
            <div className="text-xs text-gray-600">Interest Rate</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-xl font-bold text-purple-600">+25%</div>
            <div className="text-xs text-gray-600">Loan Amount</div>
          </div>
        </div>
      </div>
    </div>
  );

  const EnvironmentalTab = () => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <LeafIcon className="w-6 h-6 text-green-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">Environmental Impact</h3>
        <div className="ml-auto">
          <span className="text-xl font-bold text-green-600">{data.breakdown.environmental}</span>
          <span className="text-gray-500">/100</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { practice: "Waste Reduction", score: businessInfo?.industry === 'Food' ? 85 : 70 },
          { practice: "Energy Efficiency", score: 65 },
          { practice: "Sustainable Sourcing", score: businessInfo?.industry === 'Crafts' ? 90 : 60 },
          { practice: "Water Conservation", score: 55 }
        ].map((item, index) => (
          <div key={index} className="p-3 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800">{item.practice}</h4>
              <span className="text-lg font-bold text-green-600">{item.score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">Benefits</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Reduced operational costs</li>
          <li>• Access to green financing</li>
          <li>• Enhanced brand reputation</li>
        </ul>
      </div>
    </div>
  );

  const SocialTab = () => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <UsersIcon className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">Social Impact</h3>
        <div className="ml-auto">
          <span className="text-xl font-bold text-blue-600">{data.breakdown.social}</span>
          <span className="text-gray-500">/100</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { 
            area: "Women's Empowerment", 
            score: 95,
            highlight: true
          },
          { 
            area: "Community Engagement", 
            score: businessInfo?.communityReferences ? 85 : 65,
            highlight: !!businessInfo?.communityReferences
          },
          { 
            area: "Employee Wellbeing", 
            score: 70
          },
          { 
            area: "Local Economic Impact", 
            score: businessInfo?.industry === 'Food' ? 90 : 75
          }
        ].map((item, index) => (
          <div key={index} className={`p-3 rounded-lg ${item.highlight ? 'bg-blue-100 border border-blue-200' : 'bg-blue-50'}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h4 className="font-medium text-gray-800">{item.area}</h4>
                {item.highlight && <StarIcon className="w-4 h-4 text-yellow-500 ml-2" />}
              </div>
              <span className="text-lg font-bold text-blue-600">{item.score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">4</div>
          <div className="text-sm text-gray-600">Jobs Created</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-gray-600">Local Sourcing</div>
        </div>
      </div>
    </div>
  );

  const GovernanceTab = () => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <BuildingOfficeIcon className="w-6 h-6 text-purple-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">Governance</h3>
        <div className="ml-auto">
          <span className="text-xl font-bold text-purple-600">{data.breakdown.governance}</span>
          <span className="text-gray-500">/100</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { practice: "Business Registration", score: 100, status: "Complete" },
          { practice: "Financial Transparency", score: businessInfo?.hasVisaMerchant ? 85 : 60, status: businessInfo?.hasVisaMerchant ? "Good" : "Developing" },
          { practice: "Ethical Practices", score: 80, status: "Good" },
          { practice: "Risk Management", score: 65, status: "Developing" }
        ].map((item, index) => (
          <div key={index} className="p-3 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800">{item.practice}</h4>
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">{item.score}</span>
                <p className="text-xs text-purple-600">{item.status}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecommendationsTab = () => (
    <div className="space-y-4">
      {data.recommendations.map((rec, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-800">{rec.category}</h4>
            <span className="text-sm font-semibold text-green-600">{rec.creditBenefit}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{rec.suggestion}</p>
          <p className="text-sm text-blue-600 font-medium">{rec.impact}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'environmental', label: 'Environment' },
          { id: 'social', label: 'Social' },
          { id: 'governance', label: 'Governance' },
          { id: 'recommendations', label: 'Tips' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'environmental' && <EnvironmentalTab />}
      {activeTab === 'social' && <SocialTab />}
      {activeTab === 'governance' && <GovernanceTab />}
      {activeTab === 'recommendations' && <RecommendationsTab />}

      {/* Visa Partnership */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
        <h3 className="text-lg font-semibold mb-2">Visa Sustainability Program</h3>
        <p className="text-sm mb-3">
          Your ESG score qualifies for Visa's sustainability lending benefits.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">-2%</div>
            <div className="text-xs">Interest Rate</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">$50K</div>
            <div className="text-xs">Extra Capacity</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">24mo</div>
            <div className="text-xs">Extended Terms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGAssessment;