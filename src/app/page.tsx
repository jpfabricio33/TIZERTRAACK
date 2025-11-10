"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pill, 
  Heart, 
  Shield, 
  BarChart3, 
  Bell, 
  Info, 
  Syringe,
  Activity,
  Globe,
  BookOpen,
  User,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Droplets,
  Apple
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TirzeTrack</h1>
            </div>
            <p className="text-sm text-gray-600 hidden md:block">
              Informações científicas sobre tirzepatida
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="home" className="text-xs">Início</TabsTrigger>
            <TabsTrigger value="about" className="text-xs">O que é</TabsTrigger>
            <TabsTrigger value="benefits" className="text-xs">Benefícios</TabsTrigger>
            <TabsTrigger value="guide" className="text-xs">Guia</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-xs">Monitor</TabsTrigger>
            <TabsTrigger value="news" className="text-xs">Notícias</TabsTrigger>
          </TabsList>

          {/* Tela Inicial */}
          <TabsContent value="home" className="space-y-6">
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
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("about")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="h-5 w-5 text-blue-600" />
                    <span>O que é Tirzepatida</span>
                  </CardTitle>
                  <CardDescription>
                    Conheça o medicamento, sua classe e indicações
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("benefits")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span>Benefícios e Efeitos</span>
                  </CardTitle>
                  <CardDescription>
                    Resultados clínicos e dados científicos
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("guide")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Guia de Uso Seguro</span>
                  </CardTitle>
                  <CardDescription>
                    Boas práticas e orientações de aplicação
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("monitoring")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Monitoramento Pessoal</span>
                  </CardTitle>
                  <CardDescription>
                    Acompanhe seu progresso e sintomas
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("news")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <span>Notícias e Alertas</span>
                  </CardTitle>
                  <CardDescription>
                    Atualizações e avisos importantes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-gray-600" />
                    <span>Sobre o App</span>
                  </CardTitle>
                  <CardDescription>
                    Informações sobre o criador e propósito
                  </CardDescription>
                </CardHeader>
              </Card>
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
          </TabsContent>

          {/* O que é Tirzepatida */}
          <TabsContent value="about" className="space-y-6">
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
          </TabsContent>

          {/* Benefícios Clínicos */}
          <TabsContent value="benefits" className="space-y-6">
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
          </TabsContent>

          {/* Guia de Uso Seguro */}
          <TabsContent value="guide" className="space-y-6">
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
          </TabsContent>

          {/* Monitoramento Pessoal */}
          <TabsContent value="monitoring" className="space-y-6">
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
          </TabsContent>

          {/* Notícias e Alertas */}
          <TabsContent value="news" className="space-y-6">
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

            {/* Sobre o Aplicativo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span>Sobre o Criador</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Ronaldo Caitano Pires Bispo</h3>
                  <p className="text-sm text-gray-600">
                    Presidente da CNRCEUS, Pastor, Filósofo, Psicanalista, Aspirante em Psicologia 5° período, 
                    Capelão Militar e Hospitalar, e Juiz de Paz, com ampla atuação nas áreas espiritual, 
                    educacional e humanística.
                  </p>
                  <div>
                    <h4 className="font-medium mb-2">Formação Acadêmica</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Faculdades Unilasalle – Niterói (RJ)</li>
                      <li>• FACES – Itaboraí (RJ)</li>
                      <li>• UNIFATEC – Santa Catarina</li>
                      <li>• UNICAJE – São Luís (MA)</li>
                      <li>• FACEO – São Paulo (SP)</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    Declaração de não vínculo com fabricantes. Este aplicativo tem fins educativos e 
                    não substitui orientação médica profissional.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}