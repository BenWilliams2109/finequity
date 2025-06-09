// src/components/dashboard/BusinessDashboard.js
'use client';

import { useState } from 'react';

// Simple Card component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
    {children}
  </div>
);

// Simple Badge component
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Simple CircularProgress component
const CircularProgress = ({ value = 0, size = 120 }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-blue-600"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

// Simple VisaTransactionChart component
const VisaTransactionChart = ({ data = [] }) => (
  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
    <div className="text-center">
      <div className="text-2xl mb-2">📊</div>
      <p className="text-gray-600">Transaction Chart</p>
      <p className="text-sm text-gray-500">Chart visualization would go here</p>
    </div>
  </div>
);

const BusinessDashboard = ({ businessData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">Business Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <CircularProgress value={75} />
            <p className="mt-2 font-medium">Credit Score</p>
          </div>
          <div className="space-y-2">
            <Badge variant="success">Active</Badge>
            <p className="text-sm text-gray-600">Business Status</p>
          </div>
          <div>
            <VisaTransactionChart />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessDashboard;