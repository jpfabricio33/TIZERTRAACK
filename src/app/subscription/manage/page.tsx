"use client";

import { SubscriptionManagement } from '@/components/SubscriptionManagement';

export default function ManageSubscription() {
  return <SubscriptionManagement onBack={() => window.history.back()} />;
}