// src/components/risk/RiskAssessmentDashboard.js
'use client';

import { useState } from 'react';

const RiskAssessmentDashboard = ({ riskData, businessInfo }) => {
  const [activeView, setActiveView] = useState('overview');

  const ScoreGauge = ({ score, maxScore = 850, label }) => {
    const percentage = (score / maxScore) * 100;
    const color = score >= 720 ? 'text-green-600' : score >= 650 ? 'text-yellow-600' : 'text-red-600';
    const bgColor = score >= 720 ? 'bg-green-500' : score >= 650 ? 'bg-yellow-500' : 'bg-red-500';
    
    return (
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
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
              strokeDasharray={`${percentage * 2.51} 251`}
              className={bgColor.replace('bg-', 'text-')}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${color}`}>{score}</div>
              <div className="text-xs text-gray-500">/{maxScore}</div>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
      </div>
    );
  };

  const DataSourceCard = ({ title, score, available, description, icon }) => {
    return (
      <div className={`p-4 rounded-lg border-2 ${available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{icon}</span>
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          {available ? (
            <div className="flex items-center text-green-600">
              <span className="text-sm font-medium">+{score} pts</span>
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Not Available</span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  };

  const ComparisonChart = () => {
    const withoutVisa = Math.max(riskData.overallScore - riskData.breakdown.visaData, 580);
    const withVisa = riskData.overallScore;
    
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact of Data Sources</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Traditional Assessment Only</span>
              <span className="text-sm font-semibold text-red-600">{withoutVisa}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full" style={{width: `${(withoutVisa/850)*100}%`}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Interest Rate: 16-20%</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">With Alternative Data</span>
              <span className="text-sm font-semibold text-green-600">{withVisa}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{width: `${(withVisa/850)*100}%`}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Interest Rate: {businessInfo.hasVisaMerchant ? '11-14%' : '13-16%'}</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-1">Score Improvement: +{withVisa - withoutVisa} points</h4>
          <p className="text-sm text-green-700">
            {businessInfo.hasVisaMerchant 
              ? 'Visa transaction data provides significant risk reduction'
              : 'Alternative data sources demonstrate business stability'
            }
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Credit Risk Assessment</h2>
        <div className="flex space-x-2">
          {['overview', 'breakdown', 'comparison'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ScoreGauge 
            score={riskData.overallScore} 
            label="Overall Credit Score"
          />
          
          <div className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(riskData.approvalProbability * 100)}%
                </div>
                <div className="text-sm text-gray-600">Approval Probability</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {riskData.riskLevel}
                </div>
                <div className="text-sm text-gray-600">Risk Level</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${riskData.maxLoanAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Max Loan Amount</div>
              </div>
            </div>

            {businessInfo.hasVisaMerchant && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-semibold text-blue-800">Visa Merchant Advantage</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Your Visa transaction history adds +{riskData.breakdown.visaData} points to your credit score, 
                  qualifying you for premium rates and higher loan amounts.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'breakdown' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataSourceCard
              title="Visa Transaction Data"
              score={riskData.breakdown.visaData}
              available={businessInfo.hasVisaMerchant}
              description={businessInfo.hasVisaMerchant 
                ? "Payment consistency and business growth demonstrated through transaction history"
                : "Become a Visa merchant to access this powerful data source"
              }
              icon="💳"
            />
            
            <DataSourceCard
              title="Mobile Money History"
              score={businessInfo.mobileMoneyPhone ? 15 : 0}
              available={!!businessInfo.mobileMoneyPhone}
              description="Regular mobile payments show financial discipline and customer base"
              icon="📱"
            />
            
            <DataSourceCard
              title="Social Media Presence"
              score={businessInfo.facebookPage || businessInfo.instagramAccount ? 20 : 0}
              available={!!(businessInfo.facebookPage || businessInfo.instagramAccount)}
              description="Active social media demonstrates customer engagement and marketing efforts"
              icon="📱"
            />
            
            <DataSourceCard
              title="Community References"
              score={businessInfo.communityReferences ? 20 : 0}
              available={!!businessInfo.communityReferences}
              description="Community trust and business relationships indicate reliability"
              icon="🤝"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Score Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Base Business Score:</span>
                <span className="text-sm font-medium">600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Business Fundamentals:</span>
                <span className="text-sm font-medium">+{riskData.breakdown.businessFundamentals}</span>
              </div>
              {riskData.breakdown.visaData > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Visa Data Bonus:</span>
                  <span className="text-sm font-medium text-blue-600">+{riskData.breakdown.visaData}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Alternative Data:</span>
                <span className="text-sm font-medium">+{riskData.breakdown.alternativeData}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total Score:</span>
                <span>{riskData.overallScore}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'comparison' && (
        <div className="space-y-6">
          <ComparisonChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Traditional Banking Approach</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Relies only on credit history</li>
                <li>• Requires extensive documentation</li>
                <li>• High rejection rates for new businesses</li>
                <li>• Limited understanding of business potential</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Finequity Alternative Approach</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Uses multiple data sources</li>
                <li>• Considers business relationships</li>
                <li>• Rewards digital payment adoption</li>
                <li>• Provides pathway to better terms</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Why This Matters</h3>
            <p className="text-sm text-blue-700">
              By using alternative data sources, we can see the full picture of your business success. 
              Traditional banks might miss your potential, but our comprehensive assessment recognizes 
              your achievements and provides fair access to capital.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentDashboard;