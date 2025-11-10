"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Check, 
  Zap, 
  Shield, 
  BarChart3, 
  Camera, 
  FileText, 
  Brain,
  Pill,
  CreditCard,
  ArrowLeft
} from "lucide-react";
import { useSubscription } from '@/contexts/SubscriptionContext';

interface SubscriptionPageProps {
  onBack?: () => void;
}

export function SubscriptionPage({ onBack }: SubscriptionPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setSubscription } = useSubscription();

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      // Integração com Mercado Pago
      const response = await fetch('/api/mercadopago/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: 'premium',
          amount: 19.90,
          frequency: 'monthly'
        }),
      });

      if (response.ok) {
        const { init_point } = await response.json();
        // Redirecionar para checkout do Mercado Pago
        window.location.href = init_point;
      } else {
        throw new Error('Erro ao criar assinatura');
      }
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: BarChart3,
      title: "Monitoramento Completo",
      description: "Registre peso, glicemia, sintomas e nutrição com gráficos detalhados"
    },
    {
      icon: FileText,
      title: "Comparador de Exames",
      description: "Compare resultados laboratoriais e acompanhe sua evolução"
    },
    {
      icon: Camera,
      title: "Fotos de Progresso",
      description: "Registre sua transformação visual com fotos antes e depois"
    },
    {
      icon: Brain,
      title: "Análise Inteligente",
      description: "IA analisa seus dados e fornece insights personalizados"
    },
    {
      icon: FileText,
      title: "Relatórios Médicos",
      description: "Exporte PDFs profissionais para levar nas consultas"
    },
    {
      icon: Shield,
      title: "Guias de Segurança",
      description: "Orientações completas para uso seguro da tirzepatida"
    }
  ];

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
              <div className="bg-blue-600 p-2 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TirzeTrack Premium</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Crown className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Desbloqueie Todo o Potencial do TirzeTrack
          </h2>
          
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Para ter acesso completo ao TirzeTrack — com monitoramento pessoal, comparador de exames, 
            IA nutricional e acompanhamento de estilo de vida — ative sua assinatura mensal por apenas 
            <span className="font-bold text-green-600"> R$ 19,90</span>.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Oferta especial: Primeiro mês por R$ 9,90!
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-800">Plano Premium</CardTitle>
            <CardDescription>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                R$ 19,90<span className="text-lg font-normal">/mês</span>
              </div>
              <p className="text-blue-700">Cancele a qualquer momento</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isLoading ? 'Processando...' : '💳 Ativar Assinatura Premium'}
            </Button>
            
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-green-600" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-green-600" />
                <span>Mercado Pago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <blockquote className="text-lg text-green-800 mb-4">
              "O TirzeTrack Premium me ajudou a acompanhar minha jornada com a tirzepatida de forma 
              científica e organizada. Os relatórios são perfeitos para levar ao médico!"
            </blockquote>
            <cite className="text-sm text-green-700">— Usuário verificado do TirzeTrack</cite>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Perguntas Frequentes</h3>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Posso cancelar a qualquer momento?</h4>
                <p className="text-gray-600">Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Meus dados são seguros?</h4>
                <p className="text-gray-600">Absolutamente. Todos os dados são criptografados e armazenados com segurança. Suas informações médicas são privadas.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Como funciona o pagamento?</h4>
                <p className="text-gray-600">Utilizamos o Mercado Pago para processar pagamentos de forma segura. Você pode pagar com cartão, PIX ou boleto.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}