"use client";

import { SubscriptionSuccess } from '@/components/SubscriptionSuccess';

export default function SubscriptionSuccessPage() {
  return (
    <SubscriptionSuccess 
      onContinue={() => window.location.href = '/'} 
    />
  );
}