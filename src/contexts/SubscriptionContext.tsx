"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionData {
  isActive: boolean;
  plan: 'free' | 'premium';
  expiresAt?: Date;
  features: string[];
}

interface SubscriptionContextType {
  subscription: SubscriptionData;
  updateSubscription: (data: Partial<SubscriptionData>) => void;
  checkFeatureAccess: (feature: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isActive: false,
    plan: 'free',
    features: ['about', 'benefits'] // Funcionalidades gratuitas
  });

  const updateSubscription = (data: Partial<SubscriptionData>) => {
    setSubscription(prev => ({ ...prev, ...data }));
  };

  const checkFeatureAccess = (feature: string) => {
    return subscription.features.includes(feature) || subscription.isActive;
  };

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      updateSubscription,
      checkFeatureAccess
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