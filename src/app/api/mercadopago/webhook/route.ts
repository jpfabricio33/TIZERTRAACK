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
      timestamp: new Date().toISOString(),
      url: request.url,
      headers: Object.fromEntries(request.headers.entries())
    });
    
    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      console.log('💳 Processando pagamento ID:', paymentId);
      
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
          amount: paymentData.transaction_amount,
          currency: paymentData.currency_id,
          payment_method: paymentData.payment_method_id,
          test_mode: paymentData.live_mode === false
        });
        
        // Processar o pagamento baseado no status
        if (paymentData.status === 'approved') {
          console.log('✅ Pagamento aprovado - ativando assinatura');
          await activateUserSubscription(paymentData);
        } else if (paymentData.status === 'cancelled' || paymentData.status === 'rejected') {
          console.log('❌ Pagamento cancelado/rejeitado - desativando assinatura');
          await deactivateUserSubscription(paymentData);
        } else {
          console.log('⏳ Pagamento pendente:', paymentData.status);
        }
      } else {
        const errorText = await paymentResponse.text();
        console.error('❌ Erro ao buscar pagamento:', {
          status: paymentResponse.status,
          error: errorText
        });
      }
    } else {
      console.log('ℹ️ Tipo de notificação não processada:', body.type);
    }

    return NextResponse.json({ 
      received: true,
      timestamp: new Date().toISOString(),
      processed: body.type === 'payment'
    });
  } catch (error) {
    console.error('❌ Erro no webhook:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: 'Erro ao processar webhook',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function activateUserSubscription(paymentData: any) {
  console.log('✅ Ativando assinatura para pagamento:', paymentData.id);
  
  const subscriptionData = {
    userId: paymentData.metadata?.user_id,
    subscriptionId: paymentData.id,
    status: 'active',
    planType: 'premium',
    lastPaymentDate: new Date(),
    nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    amount: paymentData.transaction_amount,
    currency: paymentData.currency_id,
    paymentMethod: paymentData.payment_method_id,
    testMode: paymentData.live_mode === false
  };
  
  console.log('📊 Dados da assinatura:', subscriptionData);
  
  // TODO: Salvar no banco de dados
  // await saveSubscription(subscriptionData);
  
  // TODO: Enviar email de confirmação
  // await sendConfirmationEmail(subscriptionData);
}

async function deactivateUserSubscription(paymentData: any) {
  console.log('❌ Desativando assinatura para pagamento:', paymentData.id);
  
  const deactivationData = {
    subscriptionId: paymentData.id,
    status: 'inactive',
    deactivatedAt: new Date(),
    reason: paymentData.status,
    testMode: paymentData.live_mode === false
  };
  
  console.log('📊 Dados da desativação:', deactivationData);
  
  // TODO: Atualizar status no banco de dados
  // await updateSubscriptionStatus(paymentData.id, 'inactive');
  
  // TODO: Enviar email de notificação
  // await sendDeactivationEmail(deactivationData);
}

// Endpoint GET para verificar se o webhook está funcionando
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'active',
    message: 'Webhook do Mercado Pago está funcionando',
    url: request.url,
    timestamp: new Date().toISOString(),
    config: {
      webhookUrl: mercadoPagoConfig.webhookUrl,
      hasAccessToken: !!mercadoPagoConfig.accessToken
    }
  });
}