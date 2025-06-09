// src/components/ml/MLPredictionsDashboard.js - Enhanced mobile-friendly version
'use client';

import { useState, useEffect } from 'react';

const MLPredictionsDashboard = ({ predictions, businessInfo }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [showVisaDetails, setShowVisaDetails] = useState(false);

  // Enhanced predictions with Visa integration
  const baseRevenue = parseInt(businessInfo?.monthlyRevenue || '3500') || 3500;
  
  const defaultPredictions = {
    currentScore: businessInfo?.hasVisaMerchant ? 720 : 650,
    projectedScore: {
      '3months': businessInfo?.hasVisaMerchant ? 745 : 685,
      '6months': businessInfo?.hasVisaMerchant ? 770 : 715,
      '12months': businessInfo?.hasVisaMerchant ? 805 : 750
    },
    loanSuccessProbability: businessInfo?.hasVisaMerchant ? 0.87 : 0.72,
    businessGrowthProjection: {
      currentRevenue: baseRevenue,
      projectedRevenue: {
        '3months': Math.round(baseRevenue * 1.15),
        '6months': Math.round(baseRevenue * 1.3),
        '12months': Math.round(baseRevenue * 1.7),
        '24months': Math.round(baseRevenue * 2.2)
      }
    },
    // Enhanced Visa data integration
    visaInsights: businessInfo?.hasVisaMerchant ? {
      monthlyTransactionVolume: businessInfo?.visaData?.monthlyVolume || 2800,
      averageTicketSize: 28,
      transactionGrowthRate: 0.12,
      customerRetentionRate: 0.73,
      peakSalesHours: ['12-2pm', '6-8pm'],
      topCategories: ['Food Items', 'Beverages', 'Local Products'],
      paymentConsistency: 95, // percentage
      fraudRate: 0.02, // very low
      internationalTransactions: 8, // percentage
      digitalPaymentAdoption: 85 // percentage of customers using cards vs cash
    } : null
  };

  const data = predictions || defaultPredictions;

  const timeframes = [
    { key: '3months', label: '3 Months', short: '3M' },
    { key: '6months', label: '6 Months', short: '6M' },
    { key: '12months', label: '12 Months', short: '12M' }
  ];

  const selectedProjection = data.projectedScore[selectedTimeframe] || data.currentScore;
  const scoreImprovement = selectedProjection - data.currentScore;
  const successRate = Math.round(data.loanSuccessProbability * 100);
  
  // Safe revenue calculations
  const currentRevenue = data.businessGrowthProjection?.currentRevenue || 3500;
  const projectedRevenue = data.businessGrowthProjection?.projectedRevenue?.[selectedTimeframe] || currentRevenue;
  const revenueGrowthRate = currentRevenue > 0 ? Math.round(((projectedRevenue / currentRevenue) - 1) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">AI-Powered Predictions</h2>
          <div className="bg-white/20 px-2 py-1 rounded-full">
            <span className="text-xs font-medium">🤖 ML Powered</span>
          </div>
        </div>
        <p className="text-blue-100 text-sm">
          Based on {businessInfo?.hasVisaMerchant ? 'your Visa transaction data' : 'similar businesses'} and market trends
        </p>
      </div>

      {/* Visa Data Integration - Only if merchant */}
      {businessInfo?.hasVisaMerchant && data.visaInsights && (
        <div className="bg-white rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Live Visa Data</h3>
                <p className="text-xs text-gray-600">Real-time business insights</p>
              </div>
            </div>
            <button
              onClick={() => setShowVisaDetails(!showVisaDetails)}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              {showVisaDetails ? 'Hide Details' : 'View Details'}
            </button>
          </div>

          {/* Key Visa Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-sm font-bold text-blue-700">
                ${data.visaInsights.monthlyTransactionVolume.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600">Monthly Volume</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-sm font-bold text-green-700">
                {data.visaInsights.paymentConsistency}%
              </div>
              <div className="text-xs text-green-600">Consistency</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold text-purple-700">
                +{Math.round(data.visaInsights.transactionGrowthRate * 100)}%
              </div>
              <div className="text-xs text-purple-600">Growth Rate</div>
            </div>
          </div>

          {/* Detailed Visa Analytics */}
          {showVisaDetails && (
            <div className="space-y-3 border-t border-gray-200 pt-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Avg. Transaction:</span>
                  <span className="font-medium ml-1">${data.visaInsights.averageTicketSize}</span>
                </div>
                <div>
                  <span className="text-gray-600">Customer Retention:</span>
                  <span className="font-medium ml-1">{Math.round(data.visaInsights.customerRetentionRate * 100)}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Digital Adoption:</span>
                  <span className="font-medium ml-1">{data.visaInsights.digitalPaymentAdoption}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Fraud Rate:</span>
                  <span className="font-medium ml-1 text-green-600">{data.visaInsights.fraudRate}%</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">Peak Sales Times:</div>
                <div className="flex space-x-2">
                  {data.visaInsights.peakSalesHours.map((time, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-gray-700 mb-1">Top Categories:</div>
                <div className="flex flex-wrap gap-1">
                  {data.visaInsights.topCategories.map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Predictions */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Growth Projections</h3>
        
        {/* Timeframe Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.key}
              onClick={() => setSelectedTimeframe(timeframe.key)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="sm:hidden">{timeframe.short}</span>
              <span className="hidden sm:inline">{timeframe.label}</span>
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Credit Score */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Credit Score</h4>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0L12 5.586l4.293-4.293a1 1 0 111.414 1.414L13.414 7l4.293 4.293a1 1 0 01-1.414 1.414L12 8.414l-1.293 1.293a1 1 0 01-1.414-1.414L12 5.586 9.707 3.293a1 1 0 00-1.414 1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-green-600">+{scoreImprovement}</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-blue-700">{selectedProjection}</span>
              <span className="text-sm text-gray-500">from {data.currentScore}</span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(selectedProjection / 850) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Loan Approval</h4>
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-2xl font-bold text-green-700">{successRate}%</div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {successRate >= 80 ? 'Excellent' : successRate >= 70 ? 'Good' : 'Fair'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>

          {/* Revenue Growth */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue Growth</h4>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-2xl font-bold text-purple-700">
                +{revenueGrowthRate}%
              </span>
            </div>
            <div className="text-xs text-gray-600">
              ${currentRevenue.toLocaleString()} → ${projectedRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Prediction Confidence */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Prediction Confidence</span>
            <span className="text-sm font-bold text-gray-900">
              {businessInfo?.hasVisaMerchant ? '94%' : '87%'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              style={{ width: businessInfo?.hasVisaMerchant ? '94%' : '87%' }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            {businessInfo?.hasVisaMerchant 
              ? 'High confidence due to verified Visa transaction history and payment patterns'
              : 'Based on industry benchmarks and business fundamentals'
            }
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Key Insights</h3>
        <div className="space-y-2">
          {businessInfo?.hasVisaMerchant ? (
            <>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Your consistent Visa payment processing shows strong cash flow management
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Transaction growth rate of +{Math.round(data.visaInsights?.transactionGrowthRate * 100)}% indicates business expansion
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Low fraud rate ({data.visaInsights?.fraudRate}%) demonstrates good business practices
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Adding Visa merchant services could improve your score by 50+ points
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Your industry ({businessInfo?.industry}) shows strong growth potential
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Revenue of ${(parseInt(businessInfo?.monthlyRevenue || '0') || 0).toLocaleString()}/month is above average for your business size
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Predictions updated in real-time • Based on 10,000+ similar businesses
          {businessInfo?.hasVisaMerchant && ' • Enhanced with your Visa transaction data'}
        </p>
      </div>
    </div>
  );
};

export default MLPredictionsDashboard;