"use client";

import { useState } from 'react';

export interface FotoProgresso {
  id: string;
  data: string;
  imagem: string;
  observacao: string;
  peso?: number;
  imc?: number;
  tipo: 'antes' | 'depois';
}

const exemploFotos: FotoProgresso[] = [
  {
    id: "1",
    data: "2024-01-15",
    imagem: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDIwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4OCIgeT0iMTA4Ij4KPHBhdGggZD0iTTIzIDEzSDEzVjIzSDExVjEzSDFWMTFIMTFWMUgxM1YxMUgyM1YxM1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
    observacao: "Início do tratamento - Semana 1",
    peso: 94.5,
    imc: 31.2,
    tipo: 'antes'
  },
  {
    id: "2",
    data: "2024-07-15",
    imagem: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDIwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRUNGREY1Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiM2NEQ5QTQiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4OCIgeT0iMTA4Ij4KPHBhdGggZD0iTTIwIDZMOSAxN0w0IDEyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+Cg==",
    observacao: "Após 6 meses - Excelente progresso!",
    peso: 87.1,
    imc: 28.9,
    tipo: 'depois'
  }
];

export function usePhotoProgress() {
  const [fotosProgresso, setFotosProgresso] = useState<FotoProgresso[]>(exemploFotos);
  const [novaFoto, setNovaFoto] = useState<Partial<FotoProgresso>>({
    data: new Date().toISOString().split('T')[0],
    tipo: 'antes'
  });
  const [fotoSelecionada, setFotoSelecionada] = useState<FotoProgresso | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const calcularIMC = (peso: number, altura: number): number => {
    return Number((peso / (altura * altura)).toFixed(1));
  };

  const handleUploadFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const novaFotoCompleta: FotoProgresso = {
          id: Date.now().toString(),
          data: novaFoto.data || new Date().toISOString().split('T')[0],
          imagem: e.target?.result as string,
          observacao: novaFoto.observacao || '',
          peso: novaFoto.peso,
          imc: novaFoto.peso && novaFoto.peso > 0 ? calcularIMC(novaFoto.peso, 1.70) : undefined,
          tipo: novaFoto.tipo || 'antes'
        };
        
        setFotosProgresso([...fotosProgresso, novaFotoCompleta]);
        setNovaFoto({ data: new Date().toISOString().split('T')[0], tipo: 'antes' });
      };
      reader.readAsDataURL(file);
    }
  };

  const abrirModal = (foto: FotoProgresso) => {
    setFotoSelecionada(foto);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setFotoSelecionada(null);
    setMostrarModal(false);
  };

  const calcularDiferencaPeso = () => {
    const fotoAntes = fotosProgresso.find(f => f.tipo === 'antes');
    const fotoDepois = fotosProgresso.find(f => f.tipo === 'depois');
    
    if (fotoAntes?.peso && fotoDepois?.peso) {
      const diferenca = fotoAntes.peso - fotoDepois.peso;
      const semanas = Math.ceil((new Date(fotoDepois.data).getTime() - new Date(fotoAntes.data).getTime()) / (1000 * 60 * 60 * 24 * 7));
      return { diferenca, semanas, pesoAntes: fotoAntes.peso, pesoDepois: fotoDepois.peso };
    }
    return null;
  };

  return {
    fotosProgresso,
    novaFoto,
    setNovaFoto,
    fotoSelecionada,
    mostrarModal,
    handleUploadFoto,
    abrirModal,
    fecharModal,
    calcularDiferencaPeso
  };
}