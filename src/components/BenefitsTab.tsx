"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Droplets,
  TrendingUp,
  Heart,
  BarChart3,
  AlertTriangle
} from "lucide-react";

export function BenefitsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-red-600" />
              <span>Controle Glicêmico</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600 mb-2">Até 2,5%</p>
            <p className="text-sm text-gray-600">Redução na HbA1c</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Perda de Peso</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600 mb-2">15-22%</p>
            <p className="text-sm text-gray-600">Redução média do peso corporal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-blue-600" />
              <span>Saúde Metabólica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Melhora do colesterol e pressão arterial</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Estudos Clínicos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">SURPASS (diabetes) e SURMOUNT (obesidade)</p>
          </CardContent>
        </Card>
      </div>

      {/* Efeitos Adversos */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Efeitos Adversos e Cuidados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-red-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Sintomas Leves</h4>
              <ul className="text-sm space-y-1">
                <li>• Náusea</li>
                <li>• Vômito</li>
                <li>• Diarreia</li>
                <li>• Constipação</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sintomas Graves</h4>
              <ul className="text-sm space-y-1">
                <li>• Pancreatite</li>
                <li>• Hipoglicemia (em combinação)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium">
            Procure seu médico se apresentar dor abdominal intensa, vômitos persistentes ou sinais de hipoglicemia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}