"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, Zap, ArrowRight } from "lucide-react";

interface SubscriptionSuccessProps {
  onContinue: () => void;
}

export function SubscriptionSuccess({ onContinue }: SubscriptionSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            🎉 Assinatura Ativada com Sucesso!
          </CardTitle>
          
          <CardDescription className="text-lg text-gray-600">
            Bem-vindo ao TirzeTrack Premium
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="h-6 w-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Agora você tem acesso a:</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Monitoramento completo</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Comparador de exames</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Fotos de progresso</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Análise inteligente</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Relatórios em PDF</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Guias de segurança</span>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-800">Dica Premium</span>
            </div>
            <p className="text-sm text-amber-700">
              Comece registrando seu peso e primeira foto para acompanhar sua jornada com a tirzepatida!
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onContinue}
            >
              Acessar o Aplicativo
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <p className="text-xs text-gray-500">
              Sua assinatura será renovada automaticamente todo mês. 
              Você pode cancelar a qualquer momento nas configurações.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}