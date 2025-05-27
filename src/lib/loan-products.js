export const loanProducts = [
    {
      id: 'micro-loan',
      name: 'Micro Enterprise Loan',
      amount: '$500 - $5,000',
      term: '6 - 12 months',
      interestRate: '12% - 18%',
      description: 'Small loans designed for business owners just starting their journey.',
      requirements: [
        'Business owner identification',
        'Basic business information',
        'Active business for at least 3 months',
        'Simple business plan or description'
      ],
      alternativeDataUsed: [
        'Mobile money transaction history',
        'Business social media presence',
        'Customer references',
        'Community standing'
      ]
    },
    {
      id: 'growth-loan',
      name: 'Business Growth Loan',
      amount: '$5,000 - $25,000',
      term: '1 - 3 years',
      interestRate: '10% - 15%',
      description: 'Medium-sized loans for established businesses looking to expand operations.',
      requirements: [
        'Business registration documents',
        'Proof of business operations for at least 1 year',
        'Simple financial records',
        'Business bank account (preferred but not required)'
      ],
      alternativeDataUsed: [
        'Digital payment platform history',
        'Supplier references and relationships',
        'Inventory management records',
        'Photos of business premises',
        'Employee records'
      ]
    },
    {
      id: 'expansion-loan',
      name: 'Market Expansion Loan',
      amount: '$25,000 - $100,000',
      term: '3 - 5 years',
      interestRate: '8% - 12%',
      description: 'Larger loans for successful businesses ready to enter new markets or add locations.',
      requirements: [
        'Complete business registration',
        'Formal financial records for at least 2 years',
        'Business plan',
        'Business bank account',
        'Proof of industry compliance'
      ],
      alternativeDataUsed: [
        'Digital sales platform analytics',
        'Business-to-business transaction records',
        'Supply chain relationships',
        'Tax compliance history',
        'Environmental sustainability practices'
      ]
    }
  ];
  
  export const recommendAlternativeData = (businessInfo) => {
    const recommendations = [];
    
    // Basic recommendations for any business
    recommendations.push({
      title: 'Digital Transaction History',
      description: 'Start using digital payment platforms and keep records of all transactions',
      difficulty: 'easy',
      impact: 'high'
    });
    
    recommendations.push({
      title: 'Social Media Presence',
      description: 'Create business profiles on social platforms to establish online presence',
      difficulty: 'easy',
      impact: 'medium'
    });
    
    // Industry-specific recommendations
    if (businessInfo.industry === 'Retail') {
      recommendations.push({
        title: 'Inventory Management',
        description: 'Use a digital inventory system to track products and sales',
        difficulty: 'medium',
        impact: 'high'
      });
    }
    
    if (businessInfo.industry === 'Services') {
      recommendations.push({
        title: 'Customer Reviews',
        description: 'Collect and document customer testimonials and reviews',
        difficulty: 'easy',
        impact: 'high'
      });
    }
    
    // Revenue-based recommendations
    if (businessInfo.monthlyRevenue < 1000) {
      recommendations.push({
        title: 'Revenue Tracking',
        description: 'Keep detailed daily sales records even if handwritten',
        difficulty: 'easy',
        impact: 'high'
      });
    } else {
      recommendations.push({
        title: 'Financial Software',
        description: 'Invest in simple accounting software to track income and expenses',
        difficulty: 'medium',
        impact: 'high'
      });
    }
    
    return recommendations;
  };