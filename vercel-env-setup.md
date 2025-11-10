# 🔧 Configuração de Variáveis de Ambiente na Vercel

## 📋 Suas Variáveis de Ambiente

Copie e cole estas variáveis na Vercel Dashboard:

```env
NEXT_PUBLIC_BASE_URL=https://tizertraack.vercel.app
MP_ACCESS_TOKEN=APP_USR-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960
MP_PUBLIC_KEY=APP_USR-40625e66-1c24-4449-b866-1c5e75fc7e4f
WEBHOOK_URL=https://tizertraack.vercel.app/api/mercadopago/webhook
NEXT_TELEMETRY_DISABLED=1
```

## 🚀 Como Configurar na Vercel

### Passo 1: Acessar Configurações
1. Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto **TirzeTrack**
3. Vá em **Settings** → **Environment Variables**

### Passo 2: Adicionar Cada Variável
Para cada variável abaixo, clique **"Add New"**:

#### 1. NEXT_PUBLIC_BASE_URL
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://tizertraack.vercel.app`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 2. MP_ACCESS_TOKEN
- **Name:** `MP_ACCESS_TOKEN`
- **Value:** `APP_USR-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 3. MP_PUBLIC_KEY
- **Name:** `MP_PUBLIC_KEY`
- **Value:** `APP_USR-40625e66-1c24-4449-b866-1c5e75fc7e4f`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 4. WEBHOOK_URL
- **Name:** `WEBHOOK_URL`
- **Value:** `https://tizertraack.vercel.app/api/mercadopago/webhook`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 5. NEXT_TELEMETRY_DISABLED
- **Name:** `NEXT_TELEMETRY_DISABLED`
- **Value:** `1`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### Passo 3: Fazer Redeploy
Após adicionar todas as variáveis:
1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deploy
3. Clique **"Redeploy"**

## ✅ Verificação

Após o redeploy, teste:
- ✅ Site carrega: https://tizertraack.vercel.app
- ✅ Página de assinatura funciona
- ✅ APIs respondem corretamente

## 🔧 Configurar Webhook no Mercado Pago

### Passo 1: Acessar Mercado Pago
1. Acesse: [developers.mercadopago.com](https://developers.mercadopago.com)
2. Faça login com sua conta
3. Vá em **Suas aplicações**

### Passo 2: Configurar Webhook
1. Selecione sua aplicação
2. Vá em **Webhooks**
3. Clique **"Configurar URLs"**
4. Adicione: `https://tizertraack.vercel.app/api/mercadopago/webhook`
5. Selecione eventos:
   - ✅ Payments
   - ✅ Merchant Orders
6. Salve as configurações

## 🎯 URLs Importantes

- **Site Principal:** https://tizertraack.vercel.app
- **Assinatura:** https://tizertraack.vercel.app/subscription
- **API Status:** https://tizertraack.vercel.app/api/subscription/status
- **Webhook:** https://tizertraack.vercel.app/api/mercadopago/webhook

## 📞 Se Houver Problemas

1. **Verifique se todas as 5 variáveis** foram adicionadas
2. **Confirme que não há espaços extras** nos valores
3. **Faça redeploy** após adicionar as variáveis
4. **Teste as URLs** listadas acima