"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Pill, Settings, Crown } from "lucide-react";
import { useSubscription } from '@/contexts/SubscriptionContext';

export function TirzeTrackHeader() {
  const { subscription } = useSubscription();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TirzeTrack</h1>
            {subscription.isActive && (
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600 hidden md:block">
              Informações científicas sobre tirzepatida
            </p>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/subscription/manage'}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}