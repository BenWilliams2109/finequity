'use client';

import { createContext, useContext, useState } from 'react';

const UserDataContext = createContext(undefined);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    businessInfo: {
      name: '',
      ownerName: '',
      location: '',
      industry: '',
      yearEstablished: '',
      registration: '',
      employeeCount: '',
      monthlyRevenue: '',
      documents: []
    },
    selectedLoan: null,
    improvementPlan: []
  });

  const updateBusinessInfo = (info) => {
    setUserData(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        ...info
      }
    }));
  };

  const selectLoan = (loan) => {
    setUserData(prev => ({
      ...prev,
      selectedLoan: loan
    }));
  };

  const setImprovementPlan = (plan) => {
    setUserData(prev => ({
      ...prev,
      improvementPlan: plan
    }));
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      updateBusinessInfo,
      selectLoan,
      setImprovementPlan
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};