"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pill, 
  Activity,
  TrendingUp,
  Calendar,
  Apple,
  BookOpen
} from "lucide-react";

export function AboutTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-6 w-6 text-blue-600" />
            <span>O que é Tirzepatida</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Informações Básicas</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Nome científico:</strong> Tirzepatida</li>
                <li><strong>Classe:</strong> Agonista duplo dos receptores GIP/GLP-1</li>
                <li><strong>Fabricante original:</strong> Eli Lilly (EUA)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Marcas Conhecidas</h3>
              <ul className="space-y-1 text-sm">
                <li>• Mounjaro®</li>
                <li>• Zepbound®</li>
                <li>• Lipoless®</li>
                <li>• Tirzec® TG®</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Indicações</h3>
            <ul className="space-y-1 text-sm">
              <li>• Diabetes tipo 2</li>
              <li>• Obesidade (IMC ≥ 30) ou sobrepeso com comorbidades</li>
            </ul>
          </div>

          <Button className="mt-4">
            <BookOpen className="h-4 w-4 mr-2" />
            Saiba mais sobre estudos clínicos
          </Button>
        </CardContent>
      </Card>

      {/* Modo de Ação */}
      <Card>
        <CardHeader>
          <CardTitle>Modo de Ação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A tirzepatida combina a ação de dois hormônios intestinais (GIP e GLP-1), 
            melhorando o controle glicêmico e auxiliando na redução de peso.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Estímulo da insulina</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Redução do glucagon</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Retardo do esvaziamento gástrico</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Apple className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Aumento da saciedade</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}