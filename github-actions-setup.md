# 🔧 Configuração GitHub Actions + Vercel

## 📋 Secrets Necessários

Você precisa configurar estes secrets no GitHub:

### 1. Acessar GitHub Secrets
1. Vá para: **Settings** → **Secrets and variables** → **Actions**
2. Clique em **"New repository secret"**

### 2. Adicionar Secrets

#### VERCEL_TOKEN
- **Name:** `VERCEL_TOKEN`
- **Value:** Seu token da Vercel
- **Como obter:**
  1. Acesse: [vercel.com/account/tokens](https://vercel.com/account/tokens)
  2. Clique **"Create Token"**
  3. Nome: `GitHub Actions`
  4. Copie o token gerado

#### VERCEL_ORG_ID
- **Name:** `VERCEL_ORG_ID`
- **Value:** ID da sua organização Vercel
- **Como obter:**
  1. Acesse: [vercel.com/dashboard](https://vercel.com/dashboard)
  2. Clique no seu avatar → **Settings**
  3. Copie o **Team ID** ou **User ID**

#### VERCEL_PROJECT_ID
- **Name:** `VERCEL_PROJECT_ID`
- **Value:** ID do projeto
- **Como obter:**
  1. Acesse seu projeto na Vercel
  2. **Settings** → **General**
  3. Copie o **Project ID**

#### MP_ACCESS_TOKEN
- **Name:** `MP_ACCESS_TOKEN`
- **Value:** `TEST-4136335820184261-111018-b39f829d137510ecc153506fb3e69085-311420960`

#### MP_PUBLIC_KEY
- **Name:** `MP_PUBLIC_KEY`
- **Value:** `TEST-40625e66-1c24-4449-b866-1c5e75fc7e4f`

## 🚀 Como Funciona

### Trigger Automático
- ✅ **Push para main:** Deploy de produção
- ✅ **Pull Request:** Deploy de preview
- ✅ **Build local:** Antes do deploy

### Processo Otimizado
1. **Checkout** do código
2. **Setup Node.js** 18
3. **Install** dependências
4. **Build** local (teste)
5. **Deploy** para Vercel

### Vantagens
- ✅ **Build local** antes do deploy
- ✅ **Cache** de dependências
- ✅ **Variáveis** de ambiente seguras
- ✅ **Deploy** automático

## 📊 Status Esperado

### Tempo de Deploy
- ⏱️ **Total:** 2-3 minutos
- ⏱️ **Build:** 30-60s
- ⏱️ **Deploy:** 30-60s
- ⏱️ **Verificação:** 10-30s

### Resultado
- ✅ **Build Success**
- ✅ **Deploy Success**
- ✅ **Site funcionando**

## 🛠️ Troubleshooting

### Se o Deploy Falhar

#### 1. Verificar Secrets
```bash
# No GitHub Actions, verifique se todos os secrets estão configurados
echo "VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN != '' }}"
echo "VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID != '' }}"
echo "VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID != '' }}"
```

#### 2. Verificar Logs
- GitHub → **Actions** → Clique no workflow com erro
- Veja qual step falhou
- Verifique os logs detalhados

#### 3. Deploy Manual (Fallback)
```bash
# Se GitHub Actions falhar, deploy manual:
npm install -g vercel
vercel --prod
```

## ✅ Verificação Final

Após configurar:
1. ✅ **5 secrets** configurados no GitHub
2. ✅ **Workflows** commitados
3. ✅ **Push** para main
4. ✅ **Actions** executando
5. ✅ **Deploy** bem-sucedido

## 🎯 URLs para Testar

Após deploy:
- 🌐 **Site:** https://app-e-orientar-o-usuario-3.vercel.app
- 🔍 **Health:** https://app-e-orientar-o-usuario-3.vercel.app/api/health
- 🧪 **MP Test:** https://app-e-orientar-o-usuario-3.vercel.app/api/mercadopago/test-payment

---

**🚀 GitHub Actions configurado para deploy automático e confiável!**