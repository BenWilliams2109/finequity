// src/app/business-profile/page.js - Enhanced version
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useUserData } from '../../context/UserDataContext';

export default function BusinessProfile() {
  const router = useRouter();
  const { userData, updateBusinessInfo } = useUserData();
  const [formData, setFormData] = useState(userData.businessInfo);
  const [visaLookupStatus, setVisaLookupStatus] = useState('not-started'); // not-started, loading, found, not-found
  const [visaData, setVisaData] = useState(null);
  const [showAlternativeData, setShowAlternativeData] = useState(false);
  
  const industryOptions = [
    { value: 'Retail', label: 'Retail' },
    { value: 'Food', label: 'Food & Beverage' },
    { value: 'Services', label: 'Services' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Crafts', label: 'Crafts & Artisanal' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Other', label: 'Other' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVisaLookup = async () => {
    setVisaLookupStatus('loading');
    
    // Simulate Visa API call
    setTimeout(() => {
      // Demo: randomly assign Visa merchant status based on business characteristics
      const hasVisaMerchant = formData.monthlyRevenue > 2000 || formData.industry === 'Food';
      
      if (hasVisaMerchant) {
        const mockVisaData = {
          merchantId: `VM${Math.random().toString().substr(2, 9)}`,
          monthlyVolume: parseInt(formData.monthlyRevenue) * 0.7, // 70% of revenue through Visa
          transactionCount: Math.floor(parseInt(formData.monthlyRevenue) / 25), // Avg $25 per transaction
          merchantCategory: formData.industry === 'Food' ? '5812' : '5999',
          accountAge: Math.min(new Date().getFullYear() - parseInt(formData.yearEstablished), 3),
          riskScore: 0.12 // Low risk
        };
        
        setVisaData(mockVisaData);
        setVisaLookupStatus('found');
      } else {
        setVisaLookupStatus('not-found');
      }
    }, 2000);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusinessInfo({
      ...formData,
      visaData: visaData,
      hasVisaMerchant: visaLookupStatus === 'found'
    });
    router.push('/loan-options');
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="card">
            <h1 className="text-2xl font-bold text-primary mb-6">Tell Us About Your Business</h1>
            <p className="text-gray-600 mb-8">
              Please provide the following information to help us understand your business and find suitable loan options.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Business Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your business name"
                  required
                />
                
                <Input
                  label="Owner's Name"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
                
                <Input
                  label="Business Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
                
                <Select
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  options={industryOptions}
                  required
                />
                
                <Input
                  label="Year Established"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  placeholder="e.g. 2020"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                />
                
                <Input
                  label="Estimated Monthly Revenue (USD)"
                  name="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={handleChange}
                  placeholder="e.g. 1000"
                  type="number"
                  min="0"
                  required
                />
              </div>

              {/* Visa Integration Section */}
              {formData.name && formData.monthlyRevenue && (
                <FadeTransition delay={0.3}>
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h2 className="text-lg font-semibold text-blue-800 mb-4">
                      🔍 Enhanced Assessment with Visa Data
                    </h2>
                    
                    {visaLookupStatus === 'not-started' && (
                      <div>
                        <p className="text-blue-700 mb-4">
                          We can check if your business already processes payments through Visa. 
                          This data can significantly improve your loan terms and approval chances.
                        </p>
                        <Button
                          type="button"
                          onClick={handleVisaLookup}
                          variant="secondary"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Check Visa Merchant Status
                        </Button>
                      </div>
                    )}

                    {visaLookupStatus === 'loading' && (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <p className="text-blue-700">Searching Visa merchant database...</p>
                      </div>
                    )}

                    {visaLookupStatus === 'found' && visaData && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-green-800">Visa Merchant Account Found!</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-green-700">Merchant ID:</span>
                            <p className="text-green-600">{visaData.merchantId}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-700">Monthly Volume:</span>
                            <p className="text-green-600">${visaData.monthlyVolume.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-700">Transaction Count:</span>
                            <p className="text-green-600">{visaData.transactionCount}/month</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-700">Account Age:</span>
                            <p className="text-green-600">{visaData.accountAge} years</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-green-100 rounded">
                          <h4 className="font-semibold text-green-800 mb-2">Benefits:</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Up to 3% lower interest rates</li>
                            <li>• Higher loan amounts available</li>
                            <li>• Faster approval process</li>
                            <li>• Access to business insights and analytics</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {visaLookupStatus === 'not-found' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Visa Merchant Account Found</h3>
                        <p className="text-yellow-700 mb-4">
                          Don't worry! We can still assess your business using alternative data sources. 
                          Plus, we can help you set up a Visa merchant account to improve future loan terms.
                        </p>
                        <Button
                          type="button"
                          onClick={() => setShowAlternativeData(true)}
                          variant="secondary"
                          className="bg-yellow-600 text-white hover:bg-yellow-700"
                        >
                          Explore Alternative Data Options
                        </Button>
                      </div>
                    )}
                  </div>
                </FadeTransition>
              )}

              {/* Alternative Data Collection */}
              {(showAlternativeData || visaLookupStatus === 'not-found') && (
                <FadeTransition delay={0.5}>
                  <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <h2 className="text-lg font-semibold text-purple-800 mb-4">
                      📊 Alternative Data Sources
                    </h2>
                    <p className="text-purple-700 mb-4">
                      Help us understand your business better by providing information about these data sources:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Mobile Money Phone Number (Optional)"
                        name="mobileMoneyPhone"
                        value={formData.mobileMoneyPhone || ''}
                        onChange={handleChange}
                        placeholder="+502 1234 5678"
                      />
                      
                      <Input
                        label="Business WhatsApp Number"
                        name="whatsappBusiness"
                        value={formData.whatsappBusiness || ''}
                        onChange={handleChange}
                        placeholder="+502 1234 5678"
                      />
                      
                      <Input
                        label="Facebook Business Page"
                        name="facebookPage"
                        value={formData.facebookPage || ''}
                        onChange={handleChange}
                        placeholder="facebook.com/yourbusiness"
                      />
                      
                      <Input
                        label="Instagram Business Account"
                        name="instagramAccount"
                        value={formData.instagramAccount || ''}
                        onChange={handleChange}
                        placeholder="@yourbusiness"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        Community References (Who can vouch for your business?)
                      </label>
                      <textarea
                        name="communityReferences"
                        value={formData.communityReferences || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        placeholder="e.g., Local suppliers, customer testimonials, business associations..."
                      />
                    </div>

                    <div className="mt-4 p-3 bg-purple-100 rounded">
                      <h4 className="font-semibold text-purple-800 mb-2">Why This Helps:</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Mobile money shows payment consistency</li>
                        <li>• Social media demonstrates customer engagement</li>
                        <li>• Community references build trust and credibility</li>
                        <li>• Combined data creates a complete picture of your business</li>
                      </ul>
                    </div>
                  </div>
                </FadeTransition>
              )}
              
              <div className="mt-10 flex justify-end">
                <Button
                  type="submit"
                  className="px-8"
                >
                  Continue to Loan Options
                </Button>
              </div>
            </form>
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}