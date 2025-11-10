# TirzeTrack - Monitoramento Científico da Tirzepatida

Aplicativo completo para monitoramento e acompanhamento do uso da tirzepatida, com sistema de assinatura premium.

## 🚀 Deploy na Vercel

### Pré-requisitos
- Conta no GitHub
- Conta na Vercel
- Conta no Mercado Pago (para pagamentos)

### Passo a Passo para Deploy

#### 1. Preparar o Repositório GitHub
```bash
# Clone ou faça fork do repositório
git clone https://github.com/seu-usuario/tirzetrack.git
cd tirzetrack

# Instale as dependências
npm install

# Teste localmente
npm run dev
```

#### 2. Conectar GitHub com Vercel

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login com sua conta GitHub**
3. **Clique em "New Project"**
4. **Selecione o repositório TirzeTrack**
5. **Configure as variáveis de ambiente:**

```env
NEXT_PUBLIC_BASE_URL=https://seu-app.vercel.app
MP_ACCESS_TOKEN=seu_mercadopago_access_token
MP_PUBLIC_KEY=sua_mercadopago_public_key
WEBHOOK_URL=https://seu-app.vercel.app/api/mercadopago/webhook
```

#### 3. Configurar Mercado Pago

1. **Acesse [developers.mercadopago.com](https://developers.mercadopago.com)**
2. **Crie uma aplicação**
3. **Copie as credenciais:**
   - Access Token
   - Public Key
4. **Configure o Webhook URL** após o deploy

#### 4. Deploy Automático

A Vercel fará o deploy automaticamente quando você:
- Fizer push para a branch main
- Merge de pull requests
- Configurar as variáveis de ambiente

### Configurações de Produção

#### Variáveis de Ambiente Obrigatórias:
```env
NEXT_PUBLIC_BASE_URL=https://tirzetrack.vercel.app
MP_ACCESS_TOKEN=APP_USR-xxxxxxxx
MP_PUBLIC_KEY=APP_USR-xxxxxxxx
WEBHOOK_URL=https://tirzetrack.vercel.app/api/mercadopago/webhook
```

#### Configurações do Mercado Pago:
1. **Webhook URL**: Configure no painel do Mercado Pago
2. **URLs de Retorno**:
   - Sucesso: `https://seu-app.vercel.app/subscription/success`
   - Falha: `https://seu-app.vercel.app/subscription/failure`
   - Pendente: `https://seu-app.vercel.app/subscription/pending`

## 🔧 Solução de Problemas

### Erro: "Conecte as contas corretamente"

1. **Verifique a conexão GitHub-Vercel:**
   - Vá em Settings > Git Integration
   - Reconecte sua conta GitHub
   - Verifique permissões do repositório

2. **Verifique as variáveis de ambiente:**
   - Todas as variáveis estão configuradas?
   - Os valores estão corretos?
   - Não há espaços extras?

3. **Verifique o arquivo vercel.json:**
   - Está na raiz do projeto?
   - Sintaxe JSON está correta?

### Erro de Build

1. **Verifique dependências:**
```bash
npm install
npm run build
```

2. **Verifique TypeScript:**
```bash
npm run type-check
```

3. **Limpe cache:**
```bash
rm -rf .next
npm run build
```

### Erro de Webhook

1. **Verifique URL do webhook no Mercado Pago**
2. **Teste a rota da API:**
```bash
curl -X POST https://seu-app.vercel.app/api/mercadopago/webhook
```

## 📱 Funcionalidades

- ✅ Sistema de assinatura mensal (R$ 19,90)
- ✅ Monitoramento pessoal completo
- ✅ Comparador de exames laboratoriais
- ✅ Fotos de progresso antes/depois
- ✅ Relatórios em PDF para médicos
- ✅ Análise inteligente de resultados
- ✅ Guias de uso seguro

## 🛠️ Tecnologias

- **Framework**: Next.js 15
- **UI**: Shadcn/UI + Tailwind CSS
- **Pagamentos**: Mercado Pago
- **Deploy**: Vercel
- **Linguagem**: TypeScript

## 📞 Suporte

Para problemas de deploy ou configuração:
1. Verifique os logs da Vercel
2. Consulte a documentação oficial
3. Entre em contato com o suporte

---

**Desenvolvido por Ronaldo da Tirzepatida**
*Educação em saúde e bem-estar*