import { NextRequest, NextResponse } from 'next/server';
import { mercadoPagoConfig, validateEnv } from '@/lib/env';

export async function GET(request: NextRequest) {
  try {
    // Validar variáveis de ambiente
    validateEnv();

    console.log('🧪 Testando configuração do Mercado Pago...');

    // Criar preferência de teste com R$ 19,90
    const testPreference = {
      items: [
        {
          title: 'TirzeTrack Premium - Teste R$ 19,90',
          description: 'Teste de pagamento - Assinatura Premium',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 19.90
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
        plan_type: 'premium',
        frequency: 'monthly',
        test_mode: 'true',
        amount: '19.90'
      }
    };

    console.log('🔧 Dados da preferência de teste:', {
      amount: 19.90,
      currency: 'BRL',
      accessToken: mercadoPagoConfig.accessToken ? 'Configurado' : 'Não encontrado'
    });

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPreference),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Erro na API do Mercado Pago:', errorData);
      return NextResponse.json(
        { 
          error: 'Erro ao criar preferência de teste',
          status: response.status,
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log('✅ Preferência de teste criada:', data.id);

    return NextResponse.json({
      success: true,
      message: 'Teste realizado com sucesso!',
      preference_id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
      amount: 19.90,
      currency: 'BRL',
      test_mode: true,
      config: {
        accessToken: mercadoPagoConfig.accessToken ? 'Configurado ✅' : 'Não encontrado ❌',
        webhookUrl: mercadoPagoConfig.webhookUrl,
        successUrl: mercadoPagoConfig.successUrl
      }
    });

  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno no teste',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        test_mode: true
      },
      { status: 500 }
    );
  }
}