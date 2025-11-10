"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { TirzeTrackHeader } from '@/components/TirzeTrackHeader';
import { HomeTab } from '@/components/HomeTab';
import { AboutTab } from '@/components/AboutTab';
import { BenefitsTab } from '@/components/BenefitsTab';
import { GuideTab } from '@/components/GuideTab';
import { MonitoringTab } from '@/components/MonitoringTab';
import { ExamsTab } from '@/components/ExamsTab';
import { NewsTab } from '@/components/NewsTab';

function TirzeTrackApp() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <TirzeTrackHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="home" className="text-xs">Início</TabsTrigger>
            <TabsTrigger value="about" className="text-xs">O que é</TabsTrigger>
            <TabsTrigger value="benefits" className="text-xs">Benefícios</TabsTrigger>
            <TabsTrigger value="guide" className="text-xs">Guia</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-xs">Monitor</TabsTrigger>
            <TabsTrigger value="exams" className="text-xs">Exames</TabsTrigger>
            <TabsTrigger value="news" className="text-xs">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeTab onTabChange={setActiveTab} />
          </TabsContent>

          <TabsContent value="about">
            <AboutTab />
          </TabsContent>

          <TabsContent value="benefits">
            <BenefitsTab />
          </TabsContent>

          <TabsContent value="guide">
            <GuideTab />
          </TabsContent>

          <TabsContent value="monitoring">
            <MonitoringTab />
          </TabsContent>

          <TabsContent value="exams">
            <ExamsTab />
          </TabsContent>

          <TabsContent value="news">
            <NewsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <SubscriptionProvider>
      <TirzeTrackApp />
    </SubscriptionProvider>
  );
}