# 🔧 Atualização das Variáveis de Ambiente - Credenciais de TESTE

## 📋 Novas Variáveis (TESTE)

Atualize estas variáveis na Vercel Dashboard:

```env
NEXT_PUBLIC_BASE_URL=https://tizertraack.vercel.app
MP_ACCESS_TOKEN=TEST-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960
MP_PUBLIC_KEY=TEST-40625e66-1c24-4449-b866-1c5e75fc7e4f
WEBHOOK_URL=https://tizertraack.vercel.app/api/mercadopago/webhook
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

## 🚀 Como Atualizar na Vercel

### Passo 1: Acessar Environment Variables
1. Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **TirzeTrack**
3. Vá em **Settings** → **Environment Variables**

### Passo 2: Atualizar Cada Variável
Para cada variável existente, clique no **ícone de editar** (lápis):

#### 1. MP_ACCESS_TOKEN
- **Valor atual:** `APP_USR-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960`
- **Novo valor:** `TEST-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960`

#### 2. MP_PUBLIC_KEY
- **Valor atual:** `APP_USR-40625e66-1c24-4449-b866-1c5e75fc7e4f`
- **Novo valor:** `TEST-40625e66-1c24-4449-b866-1c5e75fc7e4f`

#### 3. Adicionar NODE_ENV (se não existir)
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### Passo 3: Redeploy
Após atualizar todas as variáveis:
1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deploy
3. Clique **"Redeploy"**

## 🧪 Testar Configuração

Após o redeploy, teste estas URLs:

### 1. Teste Básico da API
```
GET https://tizertraack.vercel.app/api/mercadopago/test-payment
```

### 2. Criar Assinatura de Teste
```
POST https://tizertraack.vercel.app/api/mercadopago/create-subscription
Content-Type: application/json

{
  "plan": "premium",
  "amount": 19.90,
  "frequency": "monthly"
}
```

### 3. Verificar Webhook
```
https://tizertraack.vercel.app/api/mercadopago/webhook
```

## 💳 Diferenças TESTE vs PRODUÇÃO

### Credenciais de TESTE:
- ✅ **Prefixo:** `TEST-`
- ✅ **Sandbox:** Pagamentos simulados
- ✅ **Cartões de teste:** Funcionam normalmente
- ✅ **Webhook:** Recebe notificações de teste

### Credenciais de PRODUÇÃO:
- 🔴 **Prefixo:** `APP_USR-`
- 🔴 **Real:** Pagamentos reais
- 🔴 **Cartões reais:** Cobrança efetiva
- 🔴 **Webhook:** Notificações reais

## 🎯 Cartões de Teste

Para testar pagamentos, use estes cartões:

### Visa (Aprovado)
- **Número:** 4509 9535 6623 3704
- **CVV:** 123
- **Vencimento:** 11/25

### Mastercard (Aprovado)
- **Número:** 5031 7557 3453 0604
- **CVV:** 123
- **Vencimento:** 11/25

### Visa (Rejeitado)
- **Número:** 4000 0000 0000 0002
- **CVV:** 123
- **Vencimento:** 11/25

## ✅ Verificação Final

Após atualizar, confirme:
- ✅ Todas as 6 variáveis atualizadas
- ✅ Redeploy realizado com sucesso
- ✅ API de teste funcionando: `/api/mercadopago/test-payment`
- ✅ Criação de preferência funcionando
- ✅ Webhook configurado corretamente

## 📞 Próximos Passos

1. **Teste completo** com cartões de teste
2. **Verifique logs** na Vercel para debug
3. **Configure webhook** no painel do Mercado Pago
4. **Quando pronto para produção:** troque `TEST-` por `APP_USR-`