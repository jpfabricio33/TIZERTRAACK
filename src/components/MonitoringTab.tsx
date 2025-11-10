"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  BarChart3,
  Apple,
  Activity,
  Droplets,
  Camera,
  Lock,
  Plus,
  Upload,
  Eye,
  X,
  ZoomIn
} from "lucide-react";
import { SubscriptionGate } from '@/components/SubscriptionGate';
import { generateMonitoringPDF, generateSampleData } from "@/lib/pdf-generator";
import { usePhotoProgress } from '@/hooks/usePhotoProgress';

export function MonitoringTab() {
  const {
    fotosProgresso,
    novaFoto,
    setNovaFoto,
    fotoSelecionada,
    mostrarModal,
    handleUploadFoto,
    abrirModal,
    fecharModal,
    calcularDiferencaPeso
  } = usePhotoProgress();

  const handleExportPDF = () => {
    const { monitoringData, nutritionData, patientInfo } = generateSampleData();
    generateMonitoringPDF(monitoringData, nutritionData, patientInfo);
  };

  return (
    <SubscriptionGate 
      feature="monitoring" 
      title="Monitoramento Pessoal Completo"
      description="Registre seu progresso, sintomas e acompanhe sua jornada com a tirzepatida."
    >
      <div className="space-y-6">
        {/* Botão de Exportar PDF */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <FileText className="h-5 w-5" />
              <span>Relatório para o Médico</span>
            </CardTitle>
            <CardDescription className="text-blue-700">
              Exporte seus dados de monitoramento em PDF para levar na consulta médica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2"  />
              Baixar Relatório PDF
            </Button>
            <p className="text-xs text-blue-600 mt-2">
              O relatório inclui registros de peso, glicemia, sintomas e dados nutricionais
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Registro de Progresso</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Peso (kg)</label>
                <input type="number" className="w-full p-2 border rounded-md" placeholder="Ex: 75.5" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Glicemia (mg/dL)</label>
                <input type="number" className="w-full p-2 border rounded-md" placeholder="Ex: 120" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sintomas</label>
                <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Descreva como se sente..."></textarea>
              </div>
              <Button className="w-full">Salvar Registro</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Apple className="h-5 w-5 text-orange-600" />
                <span>Acompanhamento Nutricional</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Água (L)</label>
                  <input type="number" step="0.1" className="w-full p-2 border rounded-md" placeholder="2.0" />
                </div>
                <div>
                  <label className="text-sm font-medium">Proteínas (g)</label>
                  <input type="number" className="w-full p-2 border rounded-md" placeholder="80" />
                </div>
                <div>
                  <label className="text-sm font-medium">Fibras (g)</label>
                  <input type="number" className="w-full p-2 border rounded-md" placeholder="25" />
                </div>
                <div>
                  <label className="text-sm font-medium">Carboidratos (g)</label>
                  <input type="number" className="w-full p-2 border rounded-md" placeholder="150" />
                </div>
              </div>
              <Button className="w-full">Registrar Nutrição</Button>
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO: Fotos de Progresso */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Camera className="h-6 w-6" />
              <span>📸 Fotos de Progresso – Antes e Depois</span>
            </CardTitle>
            <CardDescription className="text-purple-700">
              Acompanhe sua transformação! Adicione suas fotos de antes e depois para visualizar seu progresso de forma real e inspiradora. 
              Toda imagem é confidencial e pertence somente a você.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Aviso de Privacidade */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <Lock className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 mb-1">🔒 Privacidade e Segurança</h4>
                  <p className="text-sm text-green-700">
                    Suas fotos são armazenadas com segurança e visíveis apenas para você. 
                    O compartilhamento é opcional e depende da sua autorização.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulário para Nova Foto */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-4 flex items-center">
                <Plus className="h-4 w-4 mr-2 text-blue-600" />
                Adicionar Nova Foto
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Data da Foto</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={novaFoto.data}
                    onChange={(e) => setNovaFoto({...novaFoto, data: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={novaFoto.tipo}
                    onChange={(e) => setNovaFoto({...novaFoto, tipo: e.target.value as 'antes' | 'depois'})}
                  >
                    <option value="antes">Antes</option>
                    <option value="depois">Depois</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Peso (kg) - Opcional</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="w-full p-2 border rounded-md" 
                    placeholder="Ex: 85.5"
                    value={novaFoto.peso || ''}
                    onChange={(e) => setNovaFoto({...novaFoto, peso: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Observação</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Ex: 2ª semana de uso da Tirzepatida"
                    value={novaFoto.observacao || ''}
                    onChange={(e) => setNovaFoto({...novaFoto, observacao: e.target.value})}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Selecionar Foto</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleUploadFoto}
                    className="hidden" 
                    id="upload-foto"
                  />
                  <label 
                    htmlFor="upload-foto" 
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Adicionar Foto</span>
                  </label>
                  <p className="text-xs text-gray-500">Galeria ou câmera</p>
                </div>
              </div>
            </div>

            {/* Galeria de Fotos */}
            {fotosProgresso.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-purple-600" />
                  Sua Galeria de Progresso
                </h4>

                {/* Comparação Antes e Depois */}
                {calcularDiferencaPeso() && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6 border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2">📈 Resumo da Transformação</h5>
                    {(() => {
                      const diff = calcularDiferencaPeso()!;
                      return (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Peso Inicial</p>
                            <p className="font-bold text-lg">{diff.pesoAntes} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Peso Atual</p>
                            <p className="font-bold text-lg">{diff.pesoDepois} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Diferença</p>
                            <p className="font-bold text-lg text-green-600">-{diff.diferenca.toFixed(1)} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Período</p>
                            <p className="font-bold text-lg">{diff.semanas} semanas</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Grid de Fotos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fotosProgresso.map((foto) => (
                    <div key={foto.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="relative mb-3">
                        <img 
                          src={foto.imagem} 
                          alt={`Foto ${foto.tipo}`}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => abrirModal(foto)}
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            foto.tipo === 'antes' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {foto.tipo === 'antes' ? 'Antes' : 'Depois'}
                          </span>
                        </div>
                        <button 
                          onClick={() => abrirModal(foto)}
                          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          📅 {new Date(foto.data).toLocaleDateString('pt-BR')}
                        </p>
                        {foto.observacao && (
                          <p className="text-xs text-gray-600">{foto.observacao}</p>
                        )}
                        {foto.peso && (
                          <div className="flex items-center space-x-4 text-xs">
                            <span>Peso: {foto.peso} kg</span>
                            {foto.imc && <span>IMC: {foto.imc}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botão de Exportar com Fotos */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-blue-800">Exportar com Relatório Médico</h4>
                  <p className="text-sm text-blue-700">Inclua fotos comparativas e dados de progresso no PDF</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar com Fotos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lembretes e Metas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Beba água</p>
                <p className="text-xs text-gray-600">Meta: 2L/dia</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <Apple className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Refeição saudável</p>
                <p className="text-xs text-gray-600">Inclua fibras</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Atividade física</p>
                <p className="text-xs text-gray-600">30min/dia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para Visualização de Foto em Tela Cheia */}
      {mostrarModal && fotoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Foto {fotoSelecionada.tipo} - {new Date(fotoSelecionada.data).toLocaleDateString('pt-BR')}
              </h3>
              <button 
                onClick={fecharModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <img 
                src={fotoSelecionada.imagem} 
                alt={`Foto ${fotoSelecionada.tipo}`}
                className="w-full max-h-96 object-contain rounded-lg"
              />
              {fotoSelecionada.observacao && (
                <p className="mt-4 text-gray-700">{fotoSelecionada.observacao}</p>
              )}
              {fotoSelecionada.peso && (
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                  <span>Peso: {fotoSelecionada.peso} kg</span>
                  {fotoSelecionada.imc && <span>IMC: {fotoSelecionada.imc}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SubscriptionGate>
  );
}