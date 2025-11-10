import { NextRequest, NextResponse } from 'next/server';
import { mercadoPagoConfig, validateEnv } from '@/lib/env';

export async function POST(request: NextRequest) {
  try {
    // Validar variáveis de ambiente
    validateEnv();

    const body = await request.json();
    
    console.log('🔔 Webhook recebido:', {
      type: body.type,
      id: body.data?.id,
      timestamp: new Date().toISOString()
    });
    
    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Buscar detalhes do pagamento no Mercado Pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${mercadoPagoConfig.accessToken}`,
        },
      });

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        
        console.log('💳 Dados do pagamento:', {
          id: paymentData.id,
          status: paymentData.status,
          amount: paymentData.transaction_amount
        });
        
        // Processar o pagamento baseado no status
        if (paymentData.status === 'approved') {
          // Ativar assinatura do usuário
          await activateUserSubscription(paymentData);
        } else if (paymentData.status === 'cancelled' || paymentData.status === 'rejected') {
          // Desativar assinatura do usuário
          await deactivateUserSubscription(paymentData);
        }
      } else {
        console.error('❌ Erro ao buscar pagamento:', paymentResponse.status);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

async function activateUserSubscription(paymentData: any) {
  // Aqui você implementaria a lógica para ativar a assinatura do usuário
  console.log('✅ Ativando assinatura para pagamento:', paymentData.id);
  
  // Exemplo de dados que você salvaria:
  const subscriptionData = {
    userId: paymentData.metadata?.user_id,
    subscriptionId: paymentData.id,
    status: 'active',
    planType: 'premium',
    lastPaymentDate: new Date(),
    nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    amount: paymentData.transaction_amount
  };
  
  console.log('📊 Dados da assinatura:', subscriptionData);
  
  // Salvar no seu banco de dados
  // await saveSubscription(subscriptionData);
}

async function deactivateUserSubscription(paymentData: any) {
  // Lógica para desativar assinatura
  console.log('❌ Desativando assinatura para pagamento:', paymentData.id);
  
  // Atualizar status no banco de dados
  // await updateSubscriptionStatus(paymentData.id, 'inactive');
}