import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface MonitoringData {
  weight: number;
  glucose: number;
  symptoms: string;
  date: string;
}

interface NutritionData {
  water: number;
  protein: number;
  fiber: number;
  carbs: number;
  date: string;
}

interface PatientInfo {
  name?: string;
  age?: number;
  startDate?: string;
}

export const generateMonitoringPDF = (
  monitoringData: MonitoringData[],
  nutritionData: NutritionData[],
  patientInfo?: PatientInfo
) => {
  const doc = new jsPDF();
  
  // Configurações
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  // Cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // Blue-600
  doc.text('TirzeTrack - Relatório de Monitoramento', margin, yPosition);
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setTextColor(75, 85, 99); // Gray-600
  doc.text('Relatório gerado para acompanhamento médico', margin, yPosition);
  
  yPosition += 20;

  // Informações do paciente (se fornecidas)
  if (patientInfo?.name) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Informações do Paciente:', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.text(`Nome: ${patientInfo.name}`, margin + 5, yPosition);
    yPosition += 7;
    
    if (patientInfo.age) {
      doc.text(`Idade: ${patientInfo.age} anos`, margin + 5, yPosition);
      yPosition += 7;
    }
    
    if (patientInfo.startDate) {
      doc.text(`Início do tratamento: ${patientInfo.startDate}`, margin + 5, yPosition);
      yPosition += 7;
    }
    
    yPosition += 10;
  }

  // Data de geração
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // Gray-500
  doc.text(`Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPosition);
  yPosition += 20;

  // Tabela de Monitoramento (Peso e Glicemia)
  if (monitoringData.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Registros de Peso e Glicemia:', margin, yPosition);
    yPosition += 10;

    const monitoringTableData = monitoringData.map(record => [
      record.date,
      `${record.weight} kg`,
      `${record.glucose} mg/dL`,
      record.symptoms || 'Nenhum sintoma relatado'
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Data', 'Peso', 'Glicemia', 'Sintomas']],
      body: monitoringTableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 9 },
      margin: { left: margin, right: margin }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;
  }

  // Verificar se precisa de nova página
  if (yPosition > 200) {
    doc.addPage();
    yPosition = margin;
  }

  // Tabela de Dados Nutricionais
  if (nutritionData.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Registros Nutricionais:', margin, yPosition);
    yPosition += 10;

    const nutritionTableData = nutritionData.map(record => [
      record.date,
      `${record.water}L`,
      `${record.protein}g`,
      `${record.fiber}g`,
      `${record.carbs}g`
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Data', 'Água', 'Proteínas', 'Fibras', 'Carboidratos']],
      body: nutritionTableData,
      theme: 'grid',
      headStyles: { fillColor: [34, 197, 94] },
      styles: { fontSize: 9 },
      margin: { left: margin, right: margin }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;
  }

  // Aviso legal no final
  if (yPosition > 250) {
    doc.addPage();
    yPosition = margin;
  }

  yPosition += 10;
  doc.setFontSize(10);
  doc.setTextColor(185, 28, 28); // Red-700
  doc.text('AVISO LEGAL:', margin, yPosition);
  yPosition += 7;
  
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  const legalText = [
    'Este relatório contém informações de automonitoramento e tem fins educativos.',
    'As informações não substituem a consulta médica profissional.',
    'O uso de tirzepatida deve ser sempre orientado por um profissional de saúde.',
    'Leve este relatório para sua próxima consulta médica.'
  ];

  legalText.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });

  // Salvar o PDF
  const fileName = `TirzeTrack_Relatorio_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
  doc.save(fileName);
};

// Função para gerar dados de exemplo (para demonstração)
export const generateSampleData = () => {
  const monitoringData: MonitoringData[] = [
    {
      date: '15/11/2024',
      weight: 85.2,
      glucose: 125,
      symptoms: 'Leve náusea após aplicação'
    },
    {
      date: '08/11/2024',
      weight: 86.1,
      glucose: 130,
      symptoms: 'Nenhum sintoma'
    },
    {
      date: '01/11/2024',
      weight: 87.5,
      glucose: 140,
      symptoms: 'Diminuição do apetite'
    },
    {
      date: '25/10/2024',
      weight: 88.8,
      glucose: 145,
      symptoms: 'Primeira aplicação - sem efeitos'
    }
  ];

  const nutritionData: NutritionData[] = [
    {
      date: '15/11/2024',
      water: 2.2,
      protein: 85,
      fiber: 28,
      carbs: 120
    },
    {
      date: '14/11/2024',
      water: 1.8,
      protein: 75,
      fiber: 22,
      carbs: 150
    },
    {
      date: '13/11/2024',
      water: 2.5,
      protein: 90,
      fiber: 30,
      carbs: 110
    }
  ];

  const patientInfo: PatientInfo = {
    name: 'Paciente Exemplo',
    age: 45,
    startDate: '25/10/2024'
  };

  return { monitoringData, nutritionData, patientInfo };
};