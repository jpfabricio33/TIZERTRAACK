import { NextRequest, NextResponse } from 'next/server';

// Configurações do Mercado Pago (estas devem vir de variáveis de ambiente)
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const MP_PUBLIC_KEY = process.env.MP_PUBLIC_KEY;

export async function POST(request: NextRequest) {
  try {
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
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/pending`
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
      metadata: {
        plan_type: plan,
        frequency: frequency
      }
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar preferência no Mercado Pago');
    }

    const data = await response.json();

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    });

  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}