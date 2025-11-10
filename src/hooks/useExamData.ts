"use client";

import { useState } from 'react';

export interface ExamData {
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

export function useExamData() {
  const [exames, setExames] = useState<ExamData[]>(exemploExames);
  const [novoExame, setNovoExame] = useState<Partial<ExamData>>({
    date: new Date().toISOString().split('T')[0],
    altura: 1.70
  });

  const calcularIMC = (peso: number, altura: number): number => {
    return Number((peso / (altura * altura)).toFixed(1));
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

  const dadosGrafico = exames.map(exame => ({
    data: new Date(exame.date).toLocaleDateString('pt-BR'),
    'Glicemia (mg/dL)': exame.glicemiaJejum,
    'HbA1c (%)': exame.hba1c,
    'Peso (kg)': exame.peso,
    'IMC': exame.imc
  }));

  return {
    exames,
    novoExame,
    setNovoExame,
    adicionarExame,
    calcularIMC,
    dadosGrafico
  };
}