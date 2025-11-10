"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  ArrowLeft
} from "lucide-react";
import { useSubscription } from '@/contexts/SubscriptionContext';

interface SubscriptionManagementProps {
  onBack?: () => void;
}

export function SubscriptionManagement({ onBack }: SubscriptionManagementProps) {
  const { subscription } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/mercadopago/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.subscriptionId
        }),
      });

      if (response.ok) {
        alert('Assinatura cancelada com sucesso. Você ainda terá acesso até o final do período pago.');
        window.location.reload();
      } else {
        throw new Error('Erro ao cancelar assinatura');
      }
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      alert('Erro ao cancelar assinatura. Tente novamente.');
    } finally {
      setIsLoading(false);
      setShowCancelConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <Settings className="h-6 w-6 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Assinatura</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status da Assinatura */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-amber-600" />
              <span>Status da Assinatura</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                  subscription.isActive ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {subscription.isActive ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">Status</h3>
                <p className={`text-sm ${subscription.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {subscription.isActive ? 'Ativa' : 'Inativa'}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Última Cobrança</h3>
                <p className="text-sm text-gray-600">
                  {subscription.lastPaymentDate 
                    ? new Date(subscription.lastPaymentDate).toLocaleDateString('pt-BR')
                    : 'Nenhuma cobrança'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Próxima Cobrança</h3>
                <p className="text-sm text-gray-600">
                  {subscription.nextPaymentDate 
                    ? new Date(subscription.nextPaymentDate).toLocaleDateString('pt-BR')
                    : 'Não agendada'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plano Atual */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Plano Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {subscription.planType === 'premium' ? 'TirzeTrack Premium' : 'TirzeTrack Gratuito'}
                </h3>
                <p className="text-gray-600">
                  {subscription.planType === 'premium' 
                    ? 'Acesso completo a todas as funcionalidades'
                    : 'Acesso limitado às funcionalidades básicas'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {subscription.planType === 'premium' ? 'R$ 19,90' : 'Gratuito'}
                </p>
                <p className="text-sm text-gray-600">
                  {subscription.planType === 'premium' ? 'por mês' : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="space-y-4">
          {subscription.isActive ? (
            <>
              {!showCancelConfirm ? (
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800">Cancelar Assinatura</CardTitle>
                    <CardDescription>
                      Você pode cancelar sua assinatura a qualquer momento. 
                      Continuará tendo acesso até o final do período pago.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      Cancelar Assinatura
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800">Confirmar Cancelamento</CardTitle>
                    
                    <CardDescription className="text-red-700">
                      Tem certeza que deseja cancelar sua assinatura? Esta ação não pode ser desfeita.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-x-4">
                    <Button 
                      variant="destructive"
                      onClick={handleCancelSubscription}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Cancelando...' : 'Sim, Cancelar'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowCancelConfirm(false)}
                    >
                      Manter Assinatura
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Assinatura Inativa</CardTitle>
                <CardDescription className="text-amber-700">
                  Sua assinatura está inativa. Renove para continuar acompanhando seu progresso com a Tirzepatida.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="bg-amber-600 hover:bg-amber-700"
                  onClick={() => window.location.href = '/subscription'}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Reativar Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Informações de Suporte */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Precisa de Ajuda?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 text-sm mb-4">
              Se você tiver dúvidas sobre sua assinatura ou precisar de suporte, 
              entre em contato conosco.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700">
              Contatar Suporte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}