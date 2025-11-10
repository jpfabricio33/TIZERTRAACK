#!/usr/bin/env node

console.log('🔍 Testando Variáveis de Ambiente...\n');

// Carregar variáveis do .env.local se existir
require('dotenv').config({ path: '.env.local' });

const requiredVars = {
  'NEXT_PUBLIC_BASE_URL': process.env.NEXT_PUBLIC_BASE_URL,
  'MP_ACCESS_TOKEN': process.env.MP_ACCESS_TOKEN,
  'MP_PUBLIC_KEY': process.env.MP_PUBLIC_KEY,
  'WEBHOOK_URL': process.env.WEBHOOK_URL,
  'NEXT_TELEMETRY_DISABLED': process.env.NEXT_TELEMETRY_DISABLED
};

let allGood = true;

console.log('📋 Verificando variáveis:');
Object.entries(requiredVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${key.includes('TOKEN') || key.includes('KEY') ? '***' + value.slice(-8) : value}`);
  } else {
    console.log(`❌ ${key}: NÃO ENCONTRADA`);
    allGood = false;
  }
});

console.log('\n🔧 URLs configuradas:');
if (requiredVars.NEXT_PUBLIC_BASE_URL) {
  console.log(`🌐 Site: ${requiredVars.NEXT_PUBLIC_BASE_URL}`);
  console.log(`💳 Assinatura: ${requiredVars.NEXT_PUBLIC_BASE_URL}/subscription`);
  console.log(`🔔 Webhook: ${requiredVars.WEBHOOK_URL}`);
}

if (allGood) {
  console.log('\n✅ Todas as variáveis estão configuradas!');
  console.log('\n🚀 Próximos passos:');
  console.log('1. Configure as mesmas variáveis na Vercel Dashboard');
  console.log('2. Faça redeploy do projeto');
  console.log('3. Configure o webhook no Mercado Pago');
} else {
  console.log('\n❌ Algumas variáveis estão faltando!');
  console.log('Verifique o arquivo .env.local');
}

console.log('\n📞 URLs importantes:');
console.log('- Vercel Dashboard: https://vercel.com/dashboard');
console.log('- Mercado Pago: https://developers.mercadopago.com');