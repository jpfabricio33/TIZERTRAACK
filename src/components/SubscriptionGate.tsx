"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Star } from "lucide-react";

interface SubscriptionGateProps {
  children: React.ReactNode;
  feature: string;
  title: string;
  description: string;
}

export function SubscriptionGate({ children, feature, title, description }: SubscriptionGateProps) {
  // Simulação de verificação de assinatura
  // Em produção, isso viria do contexto de autenticação
  const hasSubscription = false;

  if (hasSubscription) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="text-center">
          <div className="mx-auto bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl text-amber-800">{title}</CardTitle>
          <CardDescription className="text-amber-700 text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-white p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              🌟 Funcionalidades Premium
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>Monitoramento completo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>Comparador de exames</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>Fotos de progresso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>Relatórios em PDF</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>Análise inteligente</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span>Guias de uso seguro</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-2">Apenas R$ 19,90/mês</h4>
            <p className="text-blue-100 mb-4">
              Acesso completo a todas as funcionalidades premium
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              onClick={() => window.location.href = '/subscription'}
            >
              <Crown className="h-5 w-5 mr-2" />
              Assinar Premium
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Conteúdo exclusivo para assinantes premium</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}