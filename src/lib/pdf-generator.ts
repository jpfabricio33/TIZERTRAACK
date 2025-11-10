import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface MonitoringData {
  date: string;
  weight: number;
  glucose: number;
  symptoms: string;
  notes: string;
}

export interface NutritionData {
  date: string;
  water: number;
  protein: number;
  fiber: number;
  carbs: number;
}

export interface PatientInfo {
  name: string;
  age: number;
  startDate: string;
  currentDose: string;
}

export function generateMonitoringPDF(
  monitoringData: MonitoringData[],
  nutritionData: NutritionData[],
  patientInfo: PatientInfo
) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('TirzeTrack - Relatório de Monitoramento', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Paciente: ${patientInfo.name}`, 20, 35);
  doc.text(`Idade: ${patientInfo.age} anos`, 20, 45);
  doc.text(`Início do tratamento: ${patientInfo.startDate}`, 20, 55);
  doc.text(`Dose atual: ${patientInfo.currentDose}`, 20, 65);
  doc.text(`Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 75);

  // Monitoring data table
  if (monitoringData.length > 0) {
    doc.autoTable({
      startY: 90,
      head: [['Data', 'Peso (kg)', 'Glicemia (mg/dL)', 'Sintomas']],
      body: monitoringData.map(item => [
        item.date,
        item.weight.toString(),
        item.glucose.toString(),
        item.symptoms
      ]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
  }

  // Nutrition data table
  if (nutritionData.length > 0) {
    const finalY = (doc as any).lastAutoTable?.finalY || 150;
    
    doc.autoTable({
      startY: finalY + 20,
      head: [['Data', 'Água (L)', 'Proteína (g)', 'Fibra (g)', 'Carboidratos (g)']],
      body: nutritionData.map(item => [
        item.date,
        item.water.toString(),
        item.protein.toString(),
        item.fiber.toString(),
        item.carbs.toString()
      ]),
      theme: 'grid',
      headStyles: { fillColor: [34, 197, 94] },
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Página ${i} de ${pageCount} - TirzeTrack © ${new Date().getFullYear()}`,
      20,
      doc.internal.pageSize.height - 10
    );
  }

  // Save the PDF
  doc.save(`tirzetrack-relatorio-${new Date().toISOString().split('T')[0]}.pdf`);
}

export function generateSampleData() {
  const monitoringData: MonitoringData[] = [
    {
      date: '2024-01-15',
      weight: 88.5,
      glucose: 145,
      symptoms: 'Náusea leve',
      notes: 'Primeira semana'
    },
    {
      date: '2024-02-15',
      weight: 86.2,
      glucose: 125,
      symptoms: 'Sem sintomas',
      notes: 'Adaptação boa'
    },
    {
      date: '2024-03-15',
      weight: 84.1,
      glucose: 110,
      symptoms: 'Sem sintomas',
      notes: 'Excelente progresso'
    }
  ];

  const nutritionData: NutritionData[] = [
    {
      date: '2024-01-15',
      water: 2.0,
      protein: 80,
      fiber: 25,
      carbs: 150
    },
    {
      date: '2024-02-15',
      water: 2.5,
      protein: 85,
      fiber: 30,
      carbs: 140
    },
    {
      date: '2024-03-15',
      water: 3.0,
      protein: 90,
      fiber: 35,
      carbs: 130
    }
  ];

  const patientInfo: PatientInfo = {
    name: 'Paciente Exemplo',
    age: 45,
    startDate: '15/01/2024',
    currentDose: '7.5mg semanal'
  };

  return { monitoringData, nutritionData, patientInfo };
}