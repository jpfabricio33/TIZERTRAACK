# 🔧 Configuração Final das Variáveis de Ambiente

## 📋 Variáveis Corretas para Vercel

Copie e cole estas variáveis na Vercel Dashboard:

```env
NEXT_PUBLIC_BASE_URL=https://app-e-orientar-o-usuario-3.vercel.app
MP_ACCESS_TOKEN=TEST-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960
MP_PUBLIC_KEY=TEST-40625e66-1c24-4449-b866-1c5e75fc7e4f
WEBHOOK_URL=https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/webhook
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

## 🚀 Como Configurar na Vercel

### Passo 1: Acessar Configurações
1. Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **app-e-orientar-o-usuario-3**
3. Vá em **Settings** → **Environment Variables**

### Passo 2: Adicionar/Editar Variáveis

#### 1. NEXT_PUBLIC_BASE_URL
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://app-e-orientar-o-usuario-3.vercel.app`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 2. MP_ACCESS_TOKEN
- **Name:** `MP_ACCESS_TOKEN`
- **Value:** `TEST-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 3. MP_PUBLIC_KEY
- **Name:** `MP_PUBLIC_KEY`
- **Value:** `TEST-40625e66-1c24-4449-b866-1c5e75fc7e4f`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 4. WEBHOOK_URL
- **Name:** `WEBHOOK_URL`
- **Value:** `https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/webhook`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 5. NEXT_TELEMETRY_DISABLED
- **Name:** `NEXT_TELEMETRY_DISABLED`
- **Value:** `1`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 6. NODE_ENV
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production ✅ Preview

### Passo 3: Redeploy
Após adicionar todas as variáveis:
1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deploy
3. Clique **"Redeploy"**

## 🔔 Configurar Webhook no Mercado Pago

### Passo 1: Acessar Mercado Pago
1. Acesse: [developers.mercadopago.com](https://developers.mercadopago.com)
2. Faça login com sua conta
3. Vá em **Suas aplicações**

### Passo 2: Configurar Webhook
1. Selecione sua aplicação
2. Vá em **Webhooks**
3. Clique **"Configurar URLs"**
4. **URL do Webhook:** `https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/webhook`
5. **Eventos selecionados:**
   - ✅ Payments
   - ✅ Merchant Orders
6. Salve as configurações

## 🧪 URLs para Teste

Após o deploy, teste estas URLs:

### APIs de Teste
- 🧪 **Teste Básico:** https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/test-payment
- 💳 **Criar Assinatura:** https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/create-subscription
- 🔔 **Webhook:** https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/webhook

### Páginas do Site
- 🌐 **Home:** https://app-e-orientar-o-usuario-3.vercel.app
- 💎 **Assinatura:** https://app-e-orientar-o-usuario-3.vercel.app/subscription
- ✅ **Sucesso:** https://app-e-orientar-o-usuario-3.vercel.app/subscription/success
- ❌ **Falha:** https://app-e-orientar-o-usuario-3.vercel.app/subscription/failure

## ✅ Verificação Final

Confirme que:
- ✅ Todas as 6 variáveis foram adicionadas
- ✅ URLs estão corretas (app-e-orientar-o-usuario-3.vercel.app)
- ✅ Redeploy foi realizado
- ✅ Webhook configurado no Mercado Pago
- ✅ APIs de teste funcionando

## 💳 Testar Pagamentos

Use estes cartões de teste:

### Visa (Aprovado)
- **Número:** 4509 9535 6623 3704
- **CVV:** 123
- **Vencimento:** 11/25

### Mastercard (Aprovado)
- **Número:** 5031 7557 3453 0604
- **CVV:** 123
- **Vencimento:** 11/25

## 🎯 Resultado Esperado

Após a configuração:
- ✅ Site carrega normalmente
- ✅ API de teste retorna sucesso
- ✅ Criação de preferência funciona
- ✅ Webhook recebe notificações
- ✅ Pagamentos de teste processam corretamente

**🚀 Configuração completa e pronta para testes!**