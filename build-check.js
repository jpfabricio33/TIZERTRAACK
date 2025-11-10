#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração para build da Vercel...\n');

// Verificar arquivos essenciais
const essentialFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'src/app/page.tsx',
  'src/app/layout.tsx'
];

console.log('📁 Verificando arquivos essenciais:');
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
  }
});

// Verificar package.json
console.log('\n📦 Verificando package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts?.build) {
    console.log('✅ Script de build encontrado');
  } else {
    console.log('❌ Script de build não encontrado');
  }
  
  if (packageJson.dependencies?.next) {
    console.log(`✅ Next.js versão: ${packageJson.dependencies.next}`);
  } else {
    console.log('❌ Next.js não encontrado nas dependências');
  }
  
  if (packageJson.dependencies?.react) {
    console.log(`✅ React versão: ${packageJson.dependencies.react}`);
  } else {
    console.log('❌ React não encontrado nas dependências');
  }
} catch (error) {
  console.log('❌ Erro ao ler package.json:', error.message);
}

// Verificar estrutura src/app
console.log('\n📂 Verificando estrutura src/app:');
const appFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css'
];

appFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
  }
});

// Verificar imports problemáticos
console.log('\n🔍 Verificando imports em page.tsx:');
try {
  const pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');
  
  // Verificar imports relativos
  const relativeImports = pageContent.match(/from ['"]\.\.?\//g);
  if (relativeImports) {
    console.log('✅ Imports relativos encontrados:', relativeImports.length);
  }
  
  // Verificar imports absolutos
  const absoluteImports = pageContent.match(/from ['"]@\//g);
  if (absoluteImports) {
    console.log('✅ Imports absolutos encontrados:', absoluteImports.length);
  }
  
} catch (error) {
  console.log('❌ Erro ao verificar page.tsx:', error.message);
}

console.log('\n🚀 Próximos passos para corrigir o build:');
console.log('1. Verifique se todos os arquivos essenciais existem');
console.log('2. Execute: npm install');
console.log('3. Execute: npm run build');
console.log('4. Se houver erros, corrija-os antes do deploy');
console.log('5. Faça commit e push das correções');

console.log('\n✅ Verificação concluída!');