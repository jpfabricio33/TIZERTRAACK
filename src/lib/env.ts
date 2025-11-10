// Validação das variáveis de ambiente
export const env = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
  MP_PUBLIC_KEY: process.env.MP_PUBLIC_KEY,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
} as const;

// Verificar se todas as variáveis necessárias estão definidas
export function validateEnv() {
  const requiredVars = {
    MP_ACCESS_TOKEN: env.MP_ACCESS_TOKEN,
    MP_PUBLIC_KEY: env.MP_PUBLIC_KEY,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias não encontradas: ${missingVars.join(', ')}`
    );
  }

  return true;
}

// Configurações do Mercado Pago
export const mercadoPagoConfig = {
  accessToken: env.MP_ACCESS_TOKEN!,
  publicKey: env.MP_PUBLIC_KEY!,
  webhookUrl: env.WEBHOOK_URL || `${env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
  successUrl: `${env.NEXT_PUBLIC_BASE_URL}/subscription/success`,
  failureUrl: `${env.NEXT_PUBLIC_BASE_URL}/subscription/failure`,
  pendingUrl: `${env.NEXT_PUBLIC_BASE_URL}/subscription/pending`,
};