"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SubscriptionData {
  isActive: boolean;
  planType: 'free' | 'premium';
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  subscriptionId?: string;
}

interface SubscriptionContextType {
  subscription: SubscriptionData;
  setSubscription: (data: SubscriptionData) => void;
  checkSubscriptionStatus: () => void;
  hasAccess: (feature: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const freeFeatures = ['home', 'about', 'benefits'];
const premiumFeatures = ['guide', 'monitoring', 'exams', 'news'];

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isActive: false,
    planType: 'free'
  });

  const checkSubscriptionStatus = async () => {
    try {
      // Verificar status da assinatura via API
      const response = await fetch('/api/subscription/status');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Erro ao verificar status da assinatura:', error);
    }
  };

  const hasAccess = (feature: string): boolean => {
    if (freeFeatures.includes(feature)) {
      return true;
    }
    
    if (premiumFeatures.includes(feature)) {
      return subscription.isActive && subscription.planType === 'premium';
    }
    
    return false;
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      setSubscription,
      checkSubscriptionStatus,
      hasAccess
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}