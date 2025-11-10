import { NextRequest, NextResponse } from 'next/server';
import { mercadoPagoConfig, validateEnv } from '@/lib/env';

export async function POST(request: NextRequest) {
  try {
    // Validar variáveis de ambiente
    validateEnv();

    const { plan, amount, frequency } = await request.json();

    // Criar preferência de pagamento no Mercado Pago
    const preference = {
      items: [
        {
          title: 'TirzeTrack Premium - Assinatura Mensal',
          description: 'Acesso completo ao TirzeTrack com todas as funcionalidades premium',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: amount
        }
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: 1
      },
      back_urls: {
        success: mercadoPagoConfig.successUrl,
        failure: mercadoPagoConfig.failureUrl,
        pending: mercadoPagoConfig.pendingUrl
      },
      auto_return: 'approved',
      notification_url: mercadoPagoConfig.webhookUrl,
      metadata: {
        plan_type: plan,
        frequency: frequency
      }
    };

    console.log('🔧 Configuração do Mercado Pago:', {
      accessToken: mercadoPagoConfig.accessToken ? '✅ Configurado' : '❌ Não encontrado',
      webhookUrl: mercadoPagoConfig.webhookUrl,
      successUrl: mercadoPagoConfig.successUrl
    });

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Erro do Mercado Pago:', errorData);
      throw new Error(`Erro ao criar preferência no Mercado Pago: ${response.status}`);
    }

    const data = await response.json();

    console.log('✅ Preferência criada com sucesso:', data.id);

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    });

  } catch (error) {
    console.error('❌ Erro ao criar assinatura:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}