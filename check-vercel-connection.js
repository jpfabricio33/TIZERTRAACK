#!/usr/bin/env node

const https = require('https');
const { execSync } = require('child_process');

console.log('🔍 Verificando Conexão GitHub-Vercel...\n');

// Verificar se está em um repositório Git
try {
  const gitRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  console.log('✅ Repositório Git encontrado:', gitRemote);
} catch (error) {
  console.log('❌ Erro: Não está em um repositório Git');
  console.log('   Execute: git remote add origin https://github.com/SEU_USUARIO/tirzetrack.git');
  process.exit(1);
}

// Verificar se há commits
try {
  const lastCommit = execSync('git log --oneline -1', { encoding: 'utf8' }).trim();
  console.log('✅ Último commit:', lastCommit);
} catch (error) {
  console.log('❌ Erro: Nenhum commit encontrado');
  console.log('   Execute: git add . && git commit -m "Initial commit"');
  process.exit(1);
}

// Verificar branch atual
try {
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log('✅ Branch atual:', currentBranch);
  
  if (currentBranch !== 'main' && currentBranch !== 'master') {
    console.log('⚠️  Aviso: Vercel geralmente usa a branch "main" ou "master"');
  }
} catch (error) {
  console.log('❌ Erro ao verificar branch');
}

// Verificar arquivos essenciais
const essentialFiles = ['package.json', 'next.config.js', 'next.config.ts'];
let configFound = false;

essentialFiles.forEach(file => {
  try {
    require('fs').accessSync(file);
    console.log(`✅ Arquivo encontrado: ${file}`);
    configFound = true;
  } catch (error) {
    // Arquivo não encontrado
  }
});

if (!configFound) {
  console.log('❌ Erro: Nenhum arquivo de configuração Next.js encontrado');
  process.exit(1);
}

console.log('\n🎯 Próximos passos:');
console.log('1. Acesse: https://vercel.com/dashboard/integrations');
console.log('2. Reconecte sua conta GitHub');
console.log('3. Importe o projeto: https://vercel.com/new');
console.log('4. Configure as variáveis de ambiente');

console.log('\n✅ Verificação concluída!');