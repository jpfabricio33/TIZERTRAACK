"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Pill, 
  Heart, 
  Shield, 
  BarChart3, 
  Bell, 
  TestTube,
  AlertTriangle,
  Lock
} from "lucide-react";
import { useSubscription } from '@/contexts/SubscriptionContext';

interface HomeTabProps {
  onTabChange: (tab: string) => void;
}

export function HomeTab({ onTabChange }: HomeTabProps) {
  const { subscription } = useSubscription();

  const features = [
    {
      id: "about",
      icon: Pill,
      title: "O que é Tirzepatida",
      description: "Conheça o medicamento, sua classe e indicações",
      isPremium: false
    },
    {
      id: "benefits",
      icon: Heart,
      title: "Benefícios e Efeitos",
      description: "Resultados clínicos e dados científicos",
      isPremium: false
    },
    {
      id: "guide",
      icon: Shield,
      title: "Guia de Uso Seguro",
      description: "Boas práticas e orientações de aplicação",
      isPremium: true
    },
    {
      id: "monitoring",
      icon: BarChart3,
      title: "Monitoramento Pessoal",
      description: "Acompanhe seu progresso e sintomas",
      isPremium: true
    },
    {
      id: "exams",
      icon: TestTube,
      title: "Exames Laboratoriais",
      description: "Compare e acompanhe seus exames",
      isPremium: true
    },
    {
      id: "news",
      icon: Bell,
      title: "Notícias e Alertas",
      description: "Atualizações e avisos importantes",
      isPremium: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 mb-8">
        <div className="bg-blue-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
          <Pill className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Bem-vindo ao TirzeTrack</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Sua fonte confiável de informações sobre o uso seguro e científico da tirzepatida 
          para controle de diabetes tipo 2 e obesidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => onTabChange(feature.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <feature.icon className={`h-5 w-5 ${
                  feature.id === 'about' ? 'text-blue-600' :
                  feature.id === 'benefits' ? 'text-red-600' :
                  feature.id === 'guide' ? 'text-green-600' :
                  feature.id === 'monitoring' ? 'text-purple-600' :
                  feature.id === 'exams' ? 'text-indigo-600' :
                  'text-orange-600'
                }`} />
                <span>{feature.title}</span>
                {feature.isPremium && !subscription.isActive && (
                  <Lock className="h-4 w-4 text-amber-600" />
                )}
              </CardTitle>
              <CardDescription>
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Aviso Legal */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Aviso Legal Importante</span>
          </CardTitle>
          <CardDescription className="text-yellow-700">
            As informações deste aplicativo são educativas e não substituem a consulta médica. 
            O uso de tirzepatida deve ser orientado por um profissional de saúde.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}