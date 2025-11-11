#!/usr/bin/env node

console.log('🧪 Testando Configuração do Mercado Pago...\n');

// Carregar variáveis do .env.local se existir
require('dotenv').config({ path: '.env.local' });

const config = {
  'NEXT_PUBLIC_BASE_URL': process.env.NEXT_PUBLIC_BASE_URL,
  'MP_ACCESS_TOKEN': process.env.MP_ACCESS_TOKEN,
  'MP_PUBLIC_KEY': process.env.MP_PUBLIC_KEY,
  'WEBHOOK_URL': process.env.WEBHOOK_URL,
  'NODE_ENV': process.env.NODE_ENV
};

console.log('📋 Verificando variáveis:');
Object.entries(config).forEach(([key, value]) => {
  if (value) {
    if (key.includes('TOKEN') || key.includes('KEY')) {
      const isTest = value.startsWith('TEST-');
      const prefix = isTest ? 'TEST-' : 'APP_USR-';
      const masked = prefix + '***' + value.slice(-8);
      console.log(`✅ ${key}: ${masked} ${isTest ? '(TESTE)' : '(PRODUÇÃO)'}`);
    } else {
      console.log(`✅ ${key}: ${value}`);
    }
  } else {
    console.log(`❌ ${key}: NÃO ENCONTRADA`);
  }
});

// Verificar se é ambiente de teste
const isTestMode = config.MP_ACCESS_TOKEN?.startsWith('TEST-');
console.log(`\n🔧 Modo: ${isTestMode ? 'TESTE ✅' : 'PRODUÇÃO 🔴'}`);

if (isTestMode) {
  console.log('\n💳 Cartões de teste disponíveis:');
  console.log('- Visa (Aprovado): 4509 9535 6623 3704');
  console.log('- Mastercard (Aprovado): 5031 7557 3453 0604');
  console.log('- Visa (Rejeitado): 4000 0000 0000 0002');
  console.log('- CVV: 123 | Vencimento: 11/25');
}

console.log('\n🌐 URLs para teste:');
if (config.NEXT_PUBLIC_BASE_URL) {
  console.log(`- Site: ${config.NEXT_PUBLIC_BASE_URL}`);
  console.log(`- Teste API: ${config.NEXT_PUBLIC_BASE_URL}/api/mercadopago/test-payment`);
  console.log(`- Assinatura: ${config.NEXT_PUBLIC_BASE_URL}/subscription`);
  console.log(`- Webhook: ${config.WEBHOOK_URL}`);
}

console.log('\n🚀 Próximos passos:');
console.log('1. Configure as mesmas variáveis na Vercel Dashboard');
console.log('2. Faça redeploy do projeto');
console.log('3. Teste a API: /api/mercadopago/test-payment');
console.log('4. Configure webhook no Mercado Pago');

if (isTestMode) {
  console.log('\n⚠️  LEMBRETE: Você está em modo TESTE');
  console.log('   Para produção, troque TEST- por APP_USR-');
} else {
  console.log('\n🔴 ATENÇÃO: Você está em modo PRODUÇÃO');
  console.log('   Pagamentos serão reais!');
}