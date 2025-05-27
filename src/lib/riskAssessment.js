export const calculateRiskProfile = (businessData, altData) => {
  const factors = {
    // Visa data advantages
    transactionStability: altData.visa?.consistencyScore || 0,
    merchantReliability: altData.visa?.merchantScore || 0,
    
    // Alternative data
    digitalFootprint: altData.socialMedia?.engagementScore || 0,
    communityTrust: altData.community?.referenceScore || 0,
    financialBehavior: altData.mobilePayments?.regularityScore || 0,
    
    // Business fundamentals
    industryRisk: getIndustryRiskScore(businessData.industry),
    geographicRisk: getGeographicRiskScore(businessData.location),
    businessMaturity: calculateMaturityScore(businessData.yearEstablished)
  };
  
  return {
    overallScore: calculateWeightedScore(factors),
    recommendedProducts: matchLoanProducts(factors),
    interestRateAdjustment: calculateRateDiscount(factors.transactionStability)
  };
};