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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusinessInfo(formData);
    router.push('/loan-options');
  };
  
  return (
    <div className="bg-secondary min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  label="Business Registration Number (if available)"
                  name="registration"
                  value={formData.registration}
                  onChange={handleChange}
                  placeholder="Optional"
                />
                
                <Input
                  label="Number of Employees"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  type="number"
                  min="0"
                />
                
                <Input
                  label="Estimated Monthly Revenue (USD)"
                  name="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={handleChange}
                  placeholder="e.g. 1000"
                  type="number"
                  min="0"
                />
              </div>
              
              <div className="mt-8">
                <h2 className="text-lg font-medium text-primary mb-4">Upload Documents (Optional)</h2>
                <p className="text-sm text-gray-500 mb-4">
                  If you have any of the following documents, you can upload them to strengthen your application:
                  Business registration, tax records, bank statements, or sales records.
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">
                    Drag and drop files here or click to browse
                  </p>
                  <Button
                    variant="secondary"
                    type="button"
                    className="mt-4"
                  >
                    Browse Files
                  </Button>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                  />
                </div>
              </div>
              
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