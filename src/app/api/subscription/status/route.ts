import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Aqui você implementaria a lógica para verificar o status da assinatura
    // Por exemplo, consultar seu banco de dados
    
    // Para demonstração, retornando dados mockados
    const subscriptionData = {
      isActive: false, // Mude para true após pagamento aprovado
      planType: 'free',
      lastPaymentDate: null,
      nextPaymentDate: null,
      subscriptionId: null
    };

    return NextResponse.json(subscriptionData);
  } catch (error) {
    console.error('Erro ao verificar status da assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}