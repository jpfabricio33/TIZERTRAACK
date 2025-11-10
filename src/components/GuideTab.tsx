"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, Calendar } from "lucide-react";
import { SubscriptionGate } from '@/components/SubscriptionGate';

export function GuideTab() {
  return (
    <SubscriptionGate 
      feature="guide" 
      title="Guia de Uso Seguro"
      description="Acesse orientações completas e seguras para o uso da tirzepatida."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Syringe className="h-6 w-6 text-green-600" />
            <span>Guia de Uso Seguro</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Aplicação</h3>
              <ul className="space-y-2 text-sm">
                <li>• Aplicação subcutânea</li>
                <li>• Locais: abdômen, coxa, braço</li>
                <li>• Dose inicial: 2,5 mg/semana</li>
                <li>• Manter mesmo dia e horário</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Armazenamento</h3>
              <ul className="space-y-2 text-sm">
                <li>• Refrigeração (2–8 °C)</li>
                <li>• Nunca reutilizar seringas</li>
                <li>• Verificar validade</li>
                <li>• Proteger da luz</li>
              </ul>
            </div>
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Checklist Semanal</span>
              </div>
              <p className="text-green-700 text-sm">
                Você já aplicou sua dose desta semana? Mantenha a regularidade para melhores resultados.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </SubscriptionGate>
  );
}