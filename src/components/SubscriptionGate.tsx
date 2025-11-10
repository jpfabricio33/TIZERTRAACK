"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Zap } from "lucide-react";
import { useSubscription } from '@/contexts/SubscriptionContext';

interface SubscriptionGateProps {
  feature: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function SubscriptionGate({ 
  feature, 
  children, 
  title = "Funcionalidade Premium",
  description = "Esta funcionalidade está disponível apenas para assinantes premium."
}: SubscriptionGateProps) {
  const { hasAccess } = useSubscription();

  if (hasAccess(feature)) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="text-center">
          <div className="mx-auto bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-amber-800">{title}</CardTitle>
          <CardDescription className="text-amber-700">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-amber-800">TirzeTrack Premium</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Acesso completo por apenas <span className="font-bold text-green-600">R$ 19,90/mês</span>
            </p>
            <ul className="text-xs text-gray-600 space-y-1 text-left">
              <li>✓ Monitoramento pessoal completo</li>
              <li>✓ Comparador de exames laboratoriais</li>
              <li>✓ Fotos de progresso antes/depois</li>
              <li>✓ Relatórios em PDF para médicos</li>
              <li>✓ Análise inteligente de resultados</li>
              <li>✓ Guias de uso seguro</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => window.location.href = '/subscription'}
          >
            <Crown className="h-4 w-4 mr-2" />
            Ativar Premium Agora
          </Button>
          
          <p className="text-xs text-gray-500">
            Cancele a qualquer momento • Suporte prioritário
          </p>
        </CardContent>
      </Card>
    </div>
  );
}