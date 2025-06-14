// src/app/business-profile/page.js - Clean rewrite with input focus fix
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FadeTransition from '../../components/ui/FadeTransition';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useUserData } from '../../context/UserDataContext';

// Move AlternativeDataSection outside to prevent re-mounting
const AlternativeDataSection = ({ formData, handleChange, visaLookupStatus }) => (
  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-purple-800">
          {visaLookupStatus === 'found' ? 'Boost Your Profile Even Further' : 'Alternative Data Sources'}
        </h2>
      </div>
      {visaLookupStatus === 'found' && (
        <div className="bg-purple-100 px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-purple-700">💪 Extra Strength</span>
        </div>
      )}
    </div>
    
    <p className="text-purple-700 mb-6">
      {visaLookupStatus === 'found' 
        ? 'Your Visa data is excellent! Adding these data sources can make your profile even stronger and potentially unlock additional benefits.'
        : 'Help us understand your business better by providing information about these data sources:'
      }
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Input
        label="Mobile Money Phone Number"
        name="mobileMoneyPhone"
        value={formData.mobileMoneyPhone}
        onChange={handleChange}
        placeholder="+502 1234 5678"
      />
      
      <Input
        label="Business WhatsApp Number"
        name="whatsappBusiness"
        value={formData.whatsappBusiness}
        onChange={handleChange}
        placeholder="+502 1234 5678"
      />
      
      <Input
        label="Facebook Business Page"
        name="facebookPage"
        value={formData.facebookPage}
        onChange={handleChange}
        placeholder="facebook.com/yourbusiness"
      />
      
      <Input
        label="Instagram Business Account"
        name="instagramAccount"
        value={formData.instagramAccount}
        onChange={handleChange}
        placeholder="@yourbusiness"
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-purple-700 mb-2">
        Community References
      </label>
      <textarea
        name="communityReferences"
        value={formData.communityReferences}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows="3"
        placeholder="Who can vouch for your business? (suppliers, customers, business associations...)"
      />
    </div>

    <div className={`rounded-lg p-4 ${visaLookupStatus === 'found' ? 'bg-green-100' : 'bg-purple-100'}`}>
      <h4 className={`font-semibold mb-3 ${visaLookupStatus === 'found' ? 'text-green-800' : 'text-purple-800'}`}>
        {visaLookupStatus === 'found' ? 'Additional Benefits:' : 'Why This Information Helps:'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {visaLookupStatus === 'found' ? (
          <>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700">Even higher credit score boost (+10-20 pts)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700">Priority processing for loans</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700">Access to premium loan products</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700">Lower documentation requirements</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-purple-700">Mobile money shows payment consistency</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-purple-700">Social media demonstrates engagement</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-purple-700">References build trust and credibility</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-purple-700">Complete picture improves approval odds</span>
            </div>
          </>
        )}
      </div>
    </div>

    {visaLookupStatus === 'found' && (
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          💡 <strong>Pro Tip:</strong> Businesses with both Visa data and alternative data sources typically see 
          approval rates 25% higher than those with Visa data alone.
        </p>
      </div>
    )}
  </div>
);

export default function BusinessProfile() {
  const router = useRouter();
  const { userData, updateBusinessInfo } = useUserData();
  
  // Initialize formData with default values to prevent undefined issues
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    location: '',
    industry: '',
    yearEstablished: '',
    monthlyRevenue: '',
    mobileMoneyPhone: '',
    whatsappBusiness: '',
    facebookPage: '',
    instagramAccount: '',
    communityReferences: '',
    ...userData.businessInfo // Override with existing data if available
  });
  
  const [visaLookupStatus, setVisaLookupStatus] = useState('not-started');
  const [visaData, setVisaData] = useState(null);
  const [showAlternativeData, setShowAlternativeData] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  
  // Privacy and data protection states
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState({
    dataProcessing: false,
    visaLookup: false,
    alternativeData: false,
    dataSharing: false
  });
  const [hasGivenConsent, setHasGivenConsent] = useState(false);
  
  const industryOptions = [
    { value: '', label: 'Select an industry' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Food', label: 'Food & Beverage' },
    { value: 'Services', label: 'Services' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Crafts', label: 'Crafts & Artisanal' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Other', label: 'Other' }
  ];

  // Check if form is ready for Visa lookup
  useEffect(() => {
    const isReady = formData.name.trim() && 
                   formData.monthlyRevenue && 
                   parseInt(formData.monthlyRevenue) > 0;
    setIsFormReady(isReady);
  }, [formData.name, formData.monthlyRevenue]);
  
  // Use useCallback to prevent unnecessary re-renders that cause input focus loss
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleVisaLookup = async () => {
    setVisaLookupStatus('loading');
    
    // Simulate Visa API call
    setTimeout(() => {
      // Demo: randomly assign Visa merchant status based on business characteristics
      const hasVisaMerchant = parseInt(formData.monthlyRevenue) > 2000 || 
                              formData.industry === 'Food' || 
                              formData.industry === 'Retail';
      
      if (hasVisaMerchant) {
        const mockVisaData = {
          merchantId: `VM${Math.random().toString().substr(2, 9)}`,
          monthlyVolume: Math.floor(parseInt(formData.monthlyRevenue) * 0.7),
          transactionCount: Math.floor(parseInt(formData.monthlyRevenue) / 25),
          merchantCategory: formData.industry === 'Food' ? '5812' : '5999',
          accountAge: Math.min(new Date().getFullYear() - parseInt(formData.yearEstablished || new Date().getFullYear()), 3),
          riskScore: 0.12
        };
        
        setVisaData(mockVisaData);
        setVisaLookupStatus('found');
        // Always show alternative data after Visa lookup completes
        setShowAlternativeData(true);
      } else {
        setVisaLookupStatus('not-found');
        setShowAlternativeData(true);
      }
    }, 2000);
  };

  const handleShowAlternativeData = useCallback(() => {
    setShowAlternativeData(true);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user has given privacy consent
    if (!hasGivenConsent) {
      setShowPrivacyModal(true);
      return;
    }
    
    updateBusinessInfo({
      ...formData,
      visaData: visaData,
      hasVisaMerchant: visaLookupStatus === 'found',
      privacyConsent: privacyConsent
    });
    router.push('/loan-options');
  };

  const handlePrivacySubmit = () => {
    // Check if required consents are given
    if (!privacyConsent.dataProcessing) {
      alert('Data processing consent is required to continue.');
      return;
    }
    
    setHasGivenConsent(true);
    setShowPrivacyModal(false);
    
    // Now proceed with the actual form submission
    updateBusinessInfo({
      ...formData,
      visaData: visaData,
      hasVisaMerchant: visaLookupStatus === 'found',
      privacyConsent: privacyConsent
    });
    router.push('/loan-options');
  };

  const handleConsentChange = (consentType) => {
    setPrivacyConsent(prev => ({
      ...prev,
      [consentType]: !prev[consentType]
    }));
  };

  // Privacy Modal Component
  const PrivacyConsentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Data Protection & Privacy</h3>
          <button 
            onClick={() => setShowPrivacyModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">🔒 Your Data Security</h4>
            <p className="text-sm text-blue-800">
              We take your privacy seriously. Please review and consent to how we'll use your information to provide loan recommendations and services.
            </p>
          </div>
          
          <div className="space-y-4">
            {/* Required Data Processing Consent */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={privacyConsent.dataProcessing}
                  onChange={() => handleConsentChange('dataProcessing')}
                  className="mt-1 w-4 h-4 text-blue-600 border-red-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-red-900">
                    ✅ Required: Data Processing Consent
                  </span>
                  <p className="text-xs text-red-700 mt-1">
                    I consent to the processing of my business information to assess loan eligibility and provide personalized recommendations. This includes basic business details, revenue information, and contact details.
                  </p>
                </div>
              </label>
            </div>

            {/* Visa Lookup Consent */}
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={privacyConsent.visaLookup}
                  onChange={() => handleConsentChange('visaLookup')}
                  className="mt-1 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-blue-900">
                    💳 Optional: Visa Merchant Data Lookup
                  </span>
                  <p className="text-xs text-blue-700 mt-1">
                    I consent to checking my business against Visa's merchant database to potentially unlock better loan terms and lower interest rates.
                  </p>
                </div>
              </label>
            </div>

            {/* Alternative Data Consent */}
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={privacyConsent.alternativeData}
                  onChange={() => handleConsentChange('alternativeData')}
                  className="mt-1 w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="text-sm font-medium text-purple-900">
                    📊 Optional: Alternative Data Collection
                  </span>
                  <p className="text-xs text-purple-700 mt-1">
                    I consent to the use of alternative data sources (social media, mobile money, community references) to enhance my credit profile and improve loan approval chances.
                  </p>
                </div>
              </label>
            </div>

            {/* Data Sharing Consent */}
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={privacyConsent.dataSharing}
                  onChange={() => handleConsentChange('dataSharing')}
                  className="mt-1 w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
                />
                <div>
                  <span className="text-sm font-medium text-green-900">
                    🤝 Optional: Verified Lender Sharing
                  </span>
                  <p className="text-xs text-green-700 mt-1">
                    I consent to sharing my information with verified partner lenders to receive actual loan offers. Data is only shared with pre-approved, legitimate financial institutions.
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">🛡️ Your Rights</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• You can withdraw consent at any time</li>
              <li>• You have the right to access, correct, or delete your data</li>
              <li>• We use industry-standard encryption to protect your information</li>
              <li>• Data is never sold to third parties for marketing purposes</li>
              <li>• You can request a copy of all data we have about you</li>
            </ul>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handlePrivacySubmit}
            disabled={!privacyConsent.dataProcessing}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              privacyConsent.dataProcessing
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {privacyConsent.dataProcessing ? 'Continue with Loan Application' : 'Required Consent Missing'}
          </button>
          <button
            onClick={() => setShowPrivacyModal(false)}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const VisaLookupCard = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-blue-800">
          Enhanced Assessment with Visa Data
        </h2>
      </div>
      
      {!isFormReady ? (
        <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-blue-700 text-sm">
            💡 <strong>Complete your business name and monthly revenue above</strong> to unlock enhanced assessment options with Visa data integration.
          </p>
        </div>
      ) : (
        <>
          {visaLookupStatus === 'not-started' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🚀 Boost Your Approval Chances</h3>
                <p className="text-blue-700 text-sm mb-3">
                  We can check if <strong>{formData.name}</strong> already processes payments through Visa. 
                  This transaction data can significantly improve your loan terms.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">-3%</div>
                    <div className="text-xs text-green-600">Interest Rate</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">+50%</div>
                    <div className="text-xs text-blue-600">Loan Amount</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">2x</div>
                    <div className="text-xs text-purple-600">Faster</div>
                  </div>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleVisaLookup}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Check Visa Merchant Status for {formData.name}
              </Button>
            </div>
          )}

          {visaLookupStatus === 'loading' && (
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <div className="text-center">
                  <p className="text-blue-700 font-medium">Searching Visa merchant database...</p>
                  <p className="text-blue-600 text-sm">Checking payment history for {formData.name}</p>
                </div>
              </div>
            </div>
          )}

          {visaLookupStatus === 'found' && visaData && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800">Visa Merchant Account Found! 🎉</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg">
                  <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Merchant ID</span>
                  <p className="text-green-800 font-mono text-sm">{visaData.merchantId}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Monthly Volume</span>
                  <p className="text-green-800 font-semibold">${visaData.monthlyVolume.toLocaleString()}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Transactions</span>
                  <p className="text-green-800 font-semibold">{visaData.transactionCount}/month</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Account Age</span>
                  <p className="text-green-800 font-semibold">{visaData.accountAge} years</p>
                </div>
              </div>
              
              <div className="bg-green-100 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Your Exclusive Benefits:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">Up to 3% lower interest rates</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">Higher loan amounts available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">Faster approval process</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">Business insights included</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {visaLookupStatus === 'not-found' && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-amber-800">No Visa Merchant Account Found</h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-amber-700 mb-3">
                  <strong>Don&apos;t worry!</strong> We can still assess {formData.name} using alternative data sources. 
                  Plus, we can help you set up a Visa merchant account for better future terms.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600">Setup Visa merchant account later</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeTransition>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Business</h1>
              <p className="text-gray-600">
                Please provide the following information to help us understand your business and find suitable loan options.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Business Information */}
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
              <FadeTransition delay={0.3}>
                <VisaLookupCard />
              </FadeTransition>

              {/* Alternative Data Section */}
              {(showAlternativeData || visaLookupStatus !== 'not-started') && (
                <FadeTransition delay={0.5}>
                  <AlternativeDataSection 
                    formData={formData}
                    handleChange={handleChange}
                    visaLookupStatus={visaLookupStatus}
                  />
                </FadeTransition>
              )}

              {/* Manual trigger for alternative data */}
              {!showAlternativeData && visaLookupStatus === 'not-started' && isFormReady && (
                <FadeTransition delay={0.4}>
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Want to skip the Visa check and provide alternative data instead?
                    </p>
                    <button
                      type="button"
                      onClick={handleShowAlternativeData}
                      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Add Alternative Data Sources
                    </button>
                  </div>
                </FadeTransition>
              )}
              
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Continue to Loan Options →
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    By continuing, you'll be asked to review our data protection policy
                  </p>
                </div>
              </div>
            </form>
          </div>
        </FadeTransition>
      </div>
      
      {/* Privacy Consent Modal */}
      {showPrivacyModal && <PrivacyConsentModal />}
    </div>
  );
}