# 🚀 Guia Completo de Deploy - TirzeTrack

## ❌ Erro: "Conecte as contas corretamente"

Este erro geralmente ocorre quando há problemas na integração GitHub-Vercel. Siga este guia para resolver.

## 📋 Pré-requisitos

- [ ] Conta no GitHub ativa
- [ ] Conta na Vercel ativa  
- [ ] Repositório do TirzeTrack no GitHub
- [ ] Credenciais do Mercado Pago

## 🔧 Solução Passo a Passo

### 1. Verificar Conexão GitHub

#### No GitHub:
1. Vá para **Settings** → **Developer settings** → **Personal access tokens**
2. Clique em **Tokens (classic)**
3. Gere um novo token com as permissões:
   - `repo` (acesso completo aos repositórios)
   - `workflow` (acesso aos workflows)
   - `admin:repo_hook` (acesso aos webhooks)

#### Na Vercel:
1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Git Integration**
3. Se GitHub não estiver conectado:
   - Clique **Connect with GitHub**
   - Autorize todas as permissões solicitadas
4. Se já estiver conectado mas com erro:
   - Clique **Disconnect**
   - Reconecte seguindo o passo anterior

### 2. Configurar Repositório

#### Verificar Estrutura:
```
tirzetrack/
├── .github/
│   └── workflows/
│       └── vercel-deploy.yml
├── src/
├── public/
├── package.json
├── next.config.ts
├── vercel.json
├── .vercelignore
└── README.md
```

#### Comandos Git:
```bash
# Verificar remote
git remote -v

# Se necessário, adicionar remote
git remote add origin https://github.com/SEU_USUARIO/tirzetrack.git

# Push para main
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

### 3. Importar Projeto na Vercel

#### Método 1 - Dashboard Web:
1. Na Vercel, clique **"Add New..."** → **"Project"**
2. Selecione **"Import Git Repository"**
3. Escolha o repositório `tirzetrack`
4. Configure:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   Node.js Version: 18.x
   ```

#### Método 2 - CLI:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy do projeto
vercel --prod
```

### 4. Configurar Variáveis de Ambiente

#### Na Vercel Dashboard:
1. Vá para o projeto → **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis para **Production**, **Preview** e **Development**:

```env
NEXT_PUBLIC_BASE_URL=https://seu-projeto.vercel.app
MP_ACCESS_TOKEN=APP_USR-1234567890-123456-abcdef1234567890abcdef1234567890-123456789
MP_PUBLIC_KEY=APP_USR-abcdef12-3456-7890-abcd-ef1234567890
WEBHOOK_URL=https://seu-projeto.vercel.app/api/mercadopago/webhook
NEXT_TELEMETRY_DISABLED=1
```

#### Obter Credenciais Mercado Pago:
1. Acesse [developers.mercadopago.com](https://developers.mercadopago.com)
2. Faça login com sua conta
3. Vá em **Suas aplicações** → **Criar aplicação**
4. Preencha os dados:
   - Nome: TirzeTrack
   - Modelo de negócio: Marketplace
   - Produtos: Checkout Pro
5. Copie as credenciais geradas

### 5. Configurar Secrets do GitHub (Opcional)

Se usar GitHub Actions, configure os secrets:

1. No GitHub, vá para **Settings** → **Secrets and variables** → **Actions**
2. Adicione os secrets:
   ```
   VERCEL_TOKEN=seu_token_vercel
   VERCEL_ORG_ID=seu_org_id
   VERCEL_PROJECT_ID=seu_project_id
   ```

Para obter esses valores:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login e obter informações
vercel login
vercel link
cat .vercel/project.json
```

### 6. Testar Deploy

#### Verificações Automáticas:
1. **Build Status**: Verifique se o build passou
2. **Function Logs**: Monitore logs de erro
3. **Preview URL**: Teste a URL de preview

#### Testes Manuais:
```bash
# Teste local antes do deploy
npm install
npm run build
npm run start

# Acesse http://localhost:3000
```

#### URLs para Testar:
- `https://seu-projeto.vercel.app/` (página inicial)
- `https://seu-projeto.vercel.app/subscription` (assinatura)
- `https://seu-projeto.vercel.app/api/subscription/status` (API)

### 7. Configurar Webhook Mercado Pago

Após deploy bem-sucedido:

1. No painel Mercado Pago → **Webhooks**
2. Adicione nova URL: `https://seu-projeto.vercel.app/api/mercadopago/webhook`
3. Selecione eventos:
   - `payment`
   - `merchant_order`
4. Salve a configuração

### 8. Monitoramento

#### Logs da Vercel:
```bash
# Via CLI
vercel logs https://seu-projeto.vercel.app

# Ou no dashboard: Functions → View Function Logs
```

#### Métricas:
- Ative **Vercel Analytics**
- Configure **Error Tracking**
- Monitore **Performance**

## 🚨 Problemas Comuns

### Erro: "Build Failed"
```bash
# Limpar cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Erro: "Environment Variables Not Found"
- Verifique se todas as variáveis estão configuradas
- Confirme que não há espaços extras
- Use aspas para valores com caracteres especiais

### Erro: "API Routes 404"
- Verifique estrutura: `src/app/api/`
- Confirme exports corretos: `export async function GET/POST`
- Teste localmente primeiro

### Erro: "GitHub Integration"
```bash
# Verificar permissões
git config --list
git remote -v

# Reconfigurar se necessário
git remote set-url origin https://github.com/SEU_USUARIO/tirzetrack.git
```

## ✅ Checklist Final

- [ ] GitHub conectado à Vercel
- [ ] Repositório importado corretamente
- [ ] Variáveis de ambiente configuradas
- [ ] Build passando sem erros
- [ ] URLs funcionando
- [ ] Webhook Mercado Pago configurado
- [ ] Pagamentos testados
- [ ] Logs sem erros críticos

## 📞 Suporte

Se ainda houver problemas:

1. **Logs da Vercel**: Verifique mensagens específicas
2. **GitHub Actions**: Veja logs dos workflows
3. **Mercado Pago**: Teste webhook manualmente
4. **Documentação**: [vercel.com/docs](https://vercel.com/docs)

---

**🎯 Dica**: Sempre teste localmente antes de fazer deploy!

```bash
npm run dev    # Desenvolvimento
npm run build  # Verificar build
npm run start  # Testar produção local