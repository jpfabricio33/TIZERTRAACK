# 🔧 Correção do Erro GitHub-Vercel

## ❌ Erro Específico
```
Erro de configuração GitHub-Vercel. Conecte as contas corretamente.
```

## ⚡ Solução Imediata (3 passos)

### 1. Reconectar GitHub na Vercel
1. **Acesse:** [vercel.com/dashboard/integrations](https://vercel.com/dashboard/integrations)
2. **Encontre GitHub** na lista de integrações
3. **Clique em "Manage"** → **"Disconnect"**
4. **Clique em "Connect"** → **"Install Vercel"**
5. **Autorize TODAS as permissões** solicitadas

### 2. Verificar Permissões do Repositório
1. **No GitHub:** Settings → Applications → Authorized OAuth Apps
2. **Encontre "Vercel"** na lista
3. **Clique em "Vercel"** → **"Grant"** (se disponível)
4. **Verifique se tem acesso** ao repositório TirzeTrack

### 3. Reimportar o Projeto
1. **Na Vercel:** [vercel.com/new](https://vercel.com/new)
2. **Clique em "Import Git Repository"**
3. **Selecione o repositório** TirzeTrack
4. **Configure:**
   - Framework Preset: **Next.js**
   - Root Directory: **`./`**
   - Build Command: **`npm run build`**
   - Output Directory: **`.next`**

## 🛠️ Se o erro persistir

### Método Alternativo: Vercel CLI
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy direto
vercel --prod
```

### Verificar Status da Conexão
```bash
# Verificar se o repositório está acessível
git remote -v

# Verificar se há commits recentes
git log --oneline -5

# Verificar branch atual
git branch
```

## ✅ Verificação de Sucesso

Após seguir os passos, você deve conseguir:
- ✅ Ver o repositório na lista de projetos da Vercel
- ✅ Fazer deploy sem erros de permissão
- ✅ Acessar a URL do projeto

## 📞 Se ainda não funcionar

1. **Tente com outro navegador** (modo incógnito)
2. **Verifique se o repositório é público** ou se a Vercel tem acesso a repositórios privados
3. **Entre em contato** com o suporte da Vercel