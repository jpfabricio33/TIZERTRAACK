"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TestTube,
  Plus,
  LineChart,
  Calculator,
  BarChart3,
  Brain,
  FileText,
  Download,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Scale
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SubscriptionGate } from '@/components/SubscriptionGate';
import { useExamData } from '@/hooks/useExamData';

// Faixas de referência
const referenciaExames = {
  glicemiaJejum: { min: 70, max: 99, unidade: "mg/dL" },
  hba1c: { normal: 5.7, preDiabetes: 6.4, diabetes: 6.5, unidade: "%" },
  colesterolTotal: { max: 200, unidade: "mg/dL" },
  ldl: { max: 130, unidade: "mg/dL" },
  triglicerideos: { max: 150, unidade: "mg/dL" }
};

export function ExamsTab() {
  const {
    exames,
    novoExame,
    setNovoExame,
    adicionarExame,
    calcularIMC,
    dadosGrafico
  } = useExamData();

  const obterStatusExame = (valor: number, tipo: keyof typeof referenciaExames) => {
    const ref = referenciaExames[tipo];
    
    switch (tipo) {
      case 'glicemiaJejum':
        if (valor >= ref.min && valor <= ref.max) return { status: 'normal', cor: 'text-green-600' };
        return { status: 'alterado', cor: 'text-red-600' };
      
      case 'hba1c':
        if (valor < ref.normal) return { status: 'normal', cor: 'text-green-600' };
        if (valor <= ref.preDiabetes) return { status: 'pré-diabetes', cor: 'text-yellow-600' };
        return { status: 'diabetes', cor: 'text-red-600' };
      
      case 'colesterolTotal':
      case 'ldl':
      case 'triglicerideos':
        if (valor <= ref.max) return { status: 'normal', cor: 'text-green-600' };
        return { status: 'elevado', cor: 'text-red-600' };
      
      default:
        return { status: 'normal', cor: 'text-green-600' };
    }
  };

  const calcularTendencia = (valorAtual: number, valorAnterior: number) => {
    const diferenca = ((valorAtual - valorAnterior) / valorAnterior) * 100;
    if (Math.abs(diferenca) < 2) return { icone: Scale, texto: 'estável', cor: 'text-gray-600' };
    if (diferenca > 0) return { icone: TrendingUp, texto: `+${diferenca.toFixed(1)}%`, cor: 'text-red-600' };
    return { icone: TrendingDown, texto: `${diferenca.toFixed(1)}%`, cor: 'text-green-600' };
  };

  return (
    <SubscriptionGate 
      feature="exams" 
      title="Comparador de Exames Laboratoriais"
      description="Compare e acompanhe seus exames laboratoriais ao longo do tempo."
    >
      <div className="space-y-6">
        {/* Texto introdutório */}
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-indigo-800">
              <TestTube className="h-6 w-6" />
              <span>🧪 Comparador de Exames Laboratoriais</span>
            </CardTitle>
            <CardDescription className="text-indigo-700">
              Acompanhe seus exames e veja sua evolução. Compare glicemia, colesterol, peso e outros marcadores 
              clínicos importantes para quem utiliza Tirzepatida. Os gráficos ajudam você e seu médico a entender sua jornada de saúde.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Formulário para novo exame */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-600" />
              <span>Adicionar Novo Exame</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Data do Exame</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-md"
                  value={novoExame.date}
                  onChange={(e) => setNovoExame({...novoExame, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Glicemia de Jejum (mg/dL)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 95"
                  value={novoExame.glicemiaJejum || ''}
                  onChange={(e) => setNovoExame({...novoExame, glicemiaJejum: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">HbA1c (%)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 6.2"
                  value={novoExame.hba1c || ''}
                  onChange={(e) => setNovoExame({...novoExame, hba1c: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Colesterol Total (mg/dL)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 180"
                  value={novoExame.colesterolTotal || ''}
                  onChange={(e) => setNovoExame({...novoExame, colesterolTotal: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">HDL (mg/dL)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 45"
                  value={novoExame.hdl || ''}
                  onChange={(e) => setNovoExame({...novoExame, hdl: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">LDL (mg/dL)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 120"
                  value={novoExame.ldl || ''}
                  onChange={(e) => setNovoExame({...novoExame, ldl: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Triglicerídeos (mg/dL)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 140"
                  value={novoExame.triglicerideos || ''}
                  onChange={(e) => setNovoExame({...novoExame, triglicerideos: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Peso (kg)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 75.5"
                  value={novoExame.peso || ''}
                  onChange={(e) => setNovoExame({...novoExame, peso: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Altura (m)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="Ex: 1.70"
                  value={novoExame.altura || ''}
                  onChange={(e) => setNovoExame({...novoExame, altura: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">IMC (calculado)</label>
                <div className="w-full p-2 border rounded-md bg-gray-50 flex items-center">
                  <Calculator className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    {novoExame.peso && novoExame.altura ? calcularIMC(novoExame.peso, novoExame.altura) : '--'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Observações</label>
              <textarea 
                className="w-full p-2 border rounded-md" 
                rows={2} 
                placeholder="Observações sobre o exame..."
                value={novoExame.observacoes || ''}
                onChange={(e) => setNovoExame({...novoExame, observacoes: e.target.value})}
              ></textarea>
            </div>

            <Button onClick={adicionarExame} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Exame
            </Button>
          </CardContent>
        </Card>

        {/* Gráficos de Evolução */}
        {exames.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                <span>Evolução dos Exames</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={dadosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Glicemia (mg/dL)" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="HbA1c (%)" stroke="#f97316" strokeWidth={2} />
                    <Line type="monotone" dataKey="Peso (kg)" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="IMC" stroke="#8b5cf6" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Exames com Comparação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Histórico de Exames</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exames.map((exame, index) => {
                const examAnterior = index > 0 ? exames[index - 1] : null;
                
                return (
                  <Card key={exame.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {new Date(exame.date).toLocaleDateString('pt-BR')}
                          </h4>
                          {exame.observacoes && (
                            <p className="text-sm text-gray-600 mt-1">{exame.observacoes}</p>
                          )}
                        </div>
                        {examAnterior && (
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Comparado ao exame anterior</p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Glicemia */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Glicemia</span>
                            {examAnterior && (() => {
                              const tendencia = calcularTendencia(exame.glicemiaJejum, examAnterior.glicemiaJejum);
                              const IconeTendencia = tendencia.icone;
                              return (
                                <div className={`flex items-center ${tendencia.cor}`}>
                                  <IconeTendencia className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{tendencia.texto}</span>
                                </div>
                              );
                            })()}
                          </div>
                          <p className={`text-lg font-bold ${obterStatusExame(exame.glicemiaJejum, 'glicemiaJejum').cor}`}>
                            {exame.glicemiaJejum} mg/dL
                          </p>
                          <p className="text-xs text-gray-500">Normal: 70-99 mg/dL</p>
                        </div>

                        {/* HbA1c */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">HbA1c</span>
                            {examAnterior && (() => {
                              const tendencia = calcularTendencia(exame.hba1c, examAnterior.hba1c);
                              const IconeTendencia = tendencia.icone;
                              return (
                                <div className={`flex items-center ${tendencia.cor}`}>
                                  <IconeTendencia className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{tendencia.texto}</span>
                                </div>
                              );
                            })()}
                          </div>
                          <p className={`text-lg font-bold ${obterStatusExame(exame.hba1c, 'hba1c').cor}`}>
                            {exame.hba1c}%
                          </p>
                          <p className="text-xs text-gray-500">Normal: &lt; 5,7%</p>
                        </div>

                        {/* Peso */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Peso</span>
                            {examAnterior && (() => {
                              const tendencia = calcularTendencia(exame.peso, examAnterior.peso);
                              const IconeTendencia = tendencia.icone;
                              return (
                                <div className={`flex items-center ${tendencia.cor}`}>
                                  <IconeTendencia className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{tendencia.texto}</span>
                                </div>
                              );
                            })()}
                          </div>
                          <p className="text-lg font-bold text-blue-600">{exame.peso} kg</p>
                          <p className="text-xs text-gray-500">IMC: {exame.imc}</p>
                        </div>

                        {/* Colesterol Total */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Colesterol</span>
                            {examAnterior && (() => {
                              const tendencia = calcularTendencia(exame.colesterolTotal, examAnterior.colesterolTotal);
                              const IconeTendencia = tendencia.icone;
                              return (
                                <div className={`flex items-center ${tendencia.cor}`}>
                                  <IconeTendencia className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{tendencia.texto}</span>
                                </div>
                              );
                            })()}
                          </div>
                          <p className={`text-lg font-bold ${obterStatusExame(exame.colesterolTotal, 'colesterolTotal').cor}`}>
                            {exame.colesterolTotal} mg/dL
                          </p>
                          <p className="text-xs text-gray-500">Ideal: &lt; 200 mg/dL</p>
                        </div>
                      </div>

                      {/* Alertas de valores fora da faixa */}
                      <div className="mt-4 space-y-2">
                        {exame.glicemiaJejum > 99 && (
                          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">Glicemia acima do normal. Consulte seu médico.</span>
                          </div>
                        )}
                        {exame.hba1c >= 6.5 && (
                          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">HbA1c indica diabetes. Acompanhamento médico necessário.</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Análise Inteligente */}
        {exames.length > 1 && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Brain className="h-5 w-5" />
                <span>Análise Inteligente</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700">
              <div className="space-y-2">
                {(() => {
                  const ultimoExame = exames[exames.length - 1];
                  const primeiroExame = exames[0];
                  const melhoraHbA1c = ((primeiroExame.hba1c - ultimoExame.hba1c) / primeiroExame.hba1c) * 100;
                  const perdaPeso = ((primeiroExame.peso - ultimoExame.peso) / primeiroExame.peso) * 100;
                  
                  return (
                    <>
                      <p className="text-sm">
                        <strong>Evolução Geral:</strong> Sua hemoglobina glicada {melhoraHbA1c > 0 ? 'melhorou' : 'piorou'} em {Math.abs(melhoraHbA1c).toFixed(1)}% 
                        e você {perdaPeso > 0 ? 'perdeu' : 'ganhou'} {Math.abs(perdaPeso).toFixed(1)}% do peso inicial.
                      </p>
                      {melhoraHbA1c > 5 && perdaPeso > 3 && (
                        <p className="text-sm">
                          <strong>Parabéns!</strong> Sua evolução está excelente. Continue mantendo uma dieta equilibrada, 
                          boa hidratação e siga as orientações médicas.
                        </p>
                      )}
                      {ultimoExame.hba1c < 7.0 && (
                        <p className="text-sm">
                          <strong>Meta Alcançada:</strong> Sua HbA1c está dentro da meta para diabéticos (&lt; 7%). 
                          Mantenha o bom trabalho!
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exportar Relatório de Exames */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <FileText className="h-5 w-5" />
              <span>Relatório de Exames</span>
            </CardTitle>
            <CardDescription className="text-blue-700">
              Exporte um relatório completo com todos os seus exames laboratoriais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório de Exames (PDF)
            </Button>
            <p className="text-xs text-blue-600 mt-2">
              Inclui gráficos, evolução temporal e análise comparativa
            </p>
          </CardContent>
        </Card>
      </div>
    </SubscriptionGate>
  );
}