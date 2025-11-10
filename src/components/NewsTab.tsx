"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell,
  AlertTriangle,
  BookOpen,
  Globe,
  Award,
  Heart,
  Brain,
  Info
} from "lucide-react";
import { SubscriptionGate } from '@/components/SubscriptionGate';

export function NewsTab() {
  return (
    <SubscriptionGate 
      feature="news" 
      title="Notícias e Alertas"
      description="Mantenha-se atualizado com as últimas informações sobre tirzepatida."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-6 w-6 text-orange-600" />
              <span>Notícias e Alertas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Alerta ANVISA</h4>
                      <p className="text-sm text-yellow-700">
                        Cuidado com produtos não registrados. Sempre verifique a procedência.
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">Há 2 dias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Novo Estudo Clínico</h4>
                      <p className="text-sm text-gray-600">
                        Pesquisa confirma eficácia da tirzepatida em pacientes com diabetes tipo 2.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Há 1 semana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Situação Regulatória</h4>
                      <p className="text-sm text-gray-600">
                        Aprovada pela FDA, EMA e ANVISA. Disponível sob diferentes marcas.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Há 2 semanas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Fontes e Referências */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-gray-600" />
              <span>Fontes e Referências</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• FDA (Food and Drug Administration)</li>
              <li>• ANVISA (Agência Nacional de Vigilância Sanitária)</li>
              <li>• New England Journal of Medicine (Estudos SURPASS/SURMOUNT)</li>
              <li>• Eli Lilly and Company</li>
              <li>• EMA (European Medicines Agency)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sobre Ronaldo da Tirzepatida - Seção Destacada */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Award className="h-6 w-6" />
              <span>Sobre Ronaldo da Tirzepatida</span>
            </CardTitle>
            <CardDescription className="text-blue-700">
              Conheça o criador do TirzeTrack e sua missão de promover informação científica e bem-estar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Biográfico</h3>
                <h4 className="text-lg font-semibold text-blue-800 mb-4">Ronaldo Caitano Pires Bispo</h4>
                
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Presidente da CNRCEUS, Pastor, Filósofo, Psicanalista, Aspirante em Psicologia 5° período, 
                  Capelão Militar e Hospitalar, e Juiz de Paz, com ampla atuação nas áreas espiritual, 
                  educacional e humanística.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-blue-100">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-2" />
                  Trajetória e Missão
                </h5>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Com uma trajetória marcada pela integração entre fé, ciência e serviço social, o Bispo Ronaldo 
                  dedica-se à formação de líderes, à restauração de famílias, ao aconselhamento psicológico e à 
                  promoção do bem-estar espiritual e emocional.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-blue-100">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 text-green-500 mr-2" />
                  Formação Acadêmica
                </h5>
                <p className="text-sm text-gray-700 mb-3">
                  Sua formação acadêmica inclui estudos em renomadas instituições brasileiras:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Faculdades Unilasalle – Niterói (RJ)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      FACES – Itaboraí (RJ)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      UNIFATEC – Santa Catarina
                    </li>
                  </ul>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      UNICAJE – São Luís (MA)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      FACEO – São Paulo (SP)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-blue-100">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Brain className="h-4 w-4 text-purple-500 mr-2" />
                  Filosofia e Abordagem
                </h5>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Ao longo de sua carreira, tem se destacado pela capacidade de unir sabedoria teológica, 
                  conhecimento psicológico e visão filosófica em sua prática pastoral e educacional. Seu trabalho 
                  reflete uma abordagem integral do ser humano — corpo, mente e espírito — voltada para a 
                  transformação pessoal e social através do amor, da fé e do conhecimento.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-yellow-800 font-medium mb-1">Declaração de Independência</p>
                    <p className="text-xs text-yellow-700 leading-relaxed">
                      Este aplicativo tem fins educativos e não possui vínculo comercial com fabricantes de medicamentos. 
                      As informações não substituem orientação médica profissional. O TirzeTrack foi desenvolvido com o 
                      objetivo de promover educação em saúde e bem-estar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SubscriptionGate>
  );
}