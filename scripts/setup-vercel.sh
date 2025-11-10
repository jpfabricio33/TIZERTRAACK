#!/bin/bash

echo "🚀 TirzeTrack - Setup Vercel Deploy"
echo "=================================="

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto TirzeTrack"
    exit 1
fi

# Verificar se git está configurado
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Erro: Repositório Git não configurado"
    echo "Configure com: git remote add origin https://github.com/SEU_USUARIO/tirzetrack.git"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar build local
echo "🔨 Testando build local..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build local. Corrija os erros antes de continuar."
    exit 1
fi

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📥 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Login na Vercel
echo "🔐 Fazendo login na Vercel..."
vercel login

# Configurar projeto
echo "⚙️ Configurando projeto na Vercel..."
vercel link

# Deploy
echo "🚀 Fazendo deploy..."
vercel --prod

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente na Vercel Dashboard"
echo "2. Configure o webhook do Mercado Pago"
echo "3. Teste todas as funcionalidades"
echo ""
echo "🔗 Links úteis:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Mercado Pago Developers: https://developers.mercadopago.com"
echo ""