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
  Apple,
  Download,
  FileText,
  TestTube,
  TrendingDown,
  Scale,
  Plus,
  LineChart,
  Calculator,
  Brain,
  Award
} from "lucide-react";
import { generateMonitoringPDF, generateSampleData } from "@/lib/pdf-generator";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Interfaces para os dados dos exames
interface ExamData {
  id: string;
  date: string;
  glicemiaJejum: number;
  hba1c: number;
  colesterolTotal: number;
  hdl: number;
  ldl: number;
  triglicerideos: number;
  tgo: number;
  tgp: number;
  ureia: number;
  creatinina: number;
  peso: number;
  altura: number;
  imc: number;
  observacoes: string;
}

// Faixas de referência
const referenciaExames = {
  glicemiaJejum: { min: 70, max: 99, unidade: "mg/dL" },
  hba1c: { normal: 5.7, preDiabetes: 6.4, diabetes: 6.5, unidade: "%" },
  colesterolTotal: { max: 200, unidade: "mg/dL" },
  hdl: { minHomem: 40, minMulher: 50, unidade: "mg/dL" },
  ldl: { max: 130, unidade: "mg/dL" },
  triglicerideos: { max: 150, unidade: "mg/dL" },
  tgo: { max: 40, unidade: "U/L" },
  tgp: { max: 41, unidade: "U/L" },
  ureia: { min: 15, max: 45, unidade: "mg/dL" },
  creatinina: { minHomem: 0.7, maxHomem: 1.3, minMulher: 0.6, maxMulher: 1.1, unidade: "mg/dL" },
  imc: { baixoPeso: 18.5, normal: 24.9, sobrepeso: 29.9, unidade: "kg/m²" }
};

// Dados de exemplo para demonstração
const exemploExames: ExamData[] = [
  {
    id: "1",
    date: "2024-01-15",
    glicemiaJejum: 145,
    hba1c: 7.2,
    colesterolTotal: 220,
    hdl: 35,
    ldl: 150,
    triglicerideos: 180,
    tgo: 45,
    tgp: 48,
    ureia: 35,
    creatinina: 1.0,
    peso: 88.5,
    altura: 1.70,
    imc: 30.6,
    observacoes: "Início do tratamento com tirzepatida"
  },
  {
    id: "2",
    date: "2024-04-15",
    glicemiaJejum: 125,
    hba1c: 6.8,
    colesterolTotal: 195,
    hdl: 42,
    ldl: 125,
    triglicerideos: 140,
    tgo: 38,
    tgp: 35,
    ureia: 32,
    creatinina: 0.9,
    peso: 85.2,
    altura: 1.70,
    imc: 29.5,
    observacoes: "Melhora significativa nos parâmetros"
  },
  {
    id: "3",
    date: "2024-07-15",
    glicemiaJejum: 98,
    hba1c: 6.2,
    colesterolTotal: 185,
    hdl: 48,
    ldl: 115,
    triglicerideos: 120,
    tgo: 32,
    tgp: 28,
    ureia: 28,
    creatinina: 0.8,
    peso: 82.1,
    altura: 1.70,
    imc: 28.4,
    observacoes: "Excelente evolução, mantendo dieta e exercícios"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [exames, setExames] = useState<ExamData[]>(exemploExames);
  const [novoExame, setNovoExame] = useState<Partial<ExamData>>({
    date: new Date().toISOString().split('T')[0],
    altura: 1.70
  });

  const calcularIMC = (peso: number, altura: number): number => {
    return Number((peso / (altura * altura)).toFixed(1));
  };

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

  const adicionarExame = () => {
    if (novoExame.peso && novoExame.altura) {
      const imc = calcularIMC(novoExame.peso, novoExame.altura);
      const exame: ExamData = {
        id: Date.now().toString(),
        date: novoExame.date || new Date().toISOString().split('T')[0],
        glicemiaJejum: novoExame.glicemiaJejum || 0,
        hba1c: novoExame.hba1c || 0,
        colesterolTotal: novoExame.colesterolTotal || 0,
        hdl: novoExame.hdl || 0,
        ldl: novoExame.ldl || 0,
        triglicerideos: novoExame.triglicerideos || 0,
        tgo: novoExame.tgo || 0,
        tgp: novoExame.tgp || 0,
        ureia: novoExame.ureia || 0,
        creatinina: novoExame.creatinina || 0,
        peso: novoExame.peso,
        altura: novoExame.altura,
        imc,
        observacoes: novoExame.observacoes || ''
      };
      
      setExames([...exames, exame].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setNovoExame({ date: new Date().toISOString().split('T')[0], altura: 1.70 });
    }
  };

  const handleExportPDF = () => {
    const { monitoringData, nutritionData, patientInfo } = generateSampleData();
    generateMonitoringPDF(monitoringData, nutritionData, patientInfo);
  };

  // Preparar dados para gráficos
  const dadosGrafico = exames.map(exame => ({
    data: new Date(exame.date).toLocaleDateString('pt-BR'),
    'Glicemia (mg/dL)': exame.glicemiaJejum,
    'HbA1c (%)': exame.hba1c,
    'Peso (kg)': exame.peso,
    'IMC': exame.imc
  }));

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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="home" className="text-xs">Início</TabsTrigger>
            <TabsTrigger value="about" className="text-xs">O que é</TabsTrigger>
            <TabsTrigger value="benefits" className="text-xs">Benefícios</TabsTrigger>
            <TabsTrigger value="guide" className="text-xs">Guia</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-xs">Monitor</TabsTrigger>
            <TabsTrigger value="exams" className="text-xs">Exames</TabsTrigger>
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

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("exams")}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TestTube className="h-5 w-5 text-indigo-600" />
                    <span>Exames Laboratoriais</span>
                  </CardTitle>
                  <CardDescription>
                    Compare e acompanhe seus exames
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

          {/* Comparador de Exames Laboratoriais */}
          <TabsContent value="exams" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}