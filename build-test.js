#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Testando Build Local...\n');

// Verificar arquivos essenciais
const essentialFiles = [
  'package.json',
  'next.config.js',
  'src/app/page.tsx',
  'src/app/layout.tsx'
];

console.log('📁 Verificando arquivos:');
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
  }
});

// Verificar .vercelignore
console.log('\n📋 Verificando .vercelignore:');
if (fs.existsSync('.vercelignore')) {
  const content = fs.readFileSync('.vercelignore', 'utf8');
  if (content.includes('.git/')) {
    console.log('✅ .git/ está sendo ignorado');
  } else {
    console.log('❌ .git/ NÃO está sendo ignorado');
  }
  if (content.includes('node_modules/')) {
    console.log('✅ node_modules/ está sendo ignorado');
  } else {
    console.log('❌ node_modules/ NÃO está sendo ignorado');
  }
} else {
  console.log('❌ .vercelignore não encontrado');
}

// Testar build
console.log('\n🔨 Testando build local:');
try {
  console.log('Executando: npm run build');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build local bem-sucedido!');
} catch (error) {
  console.log('❌ Erro no build local:', error.message);
  process.exit(1);
}

// Verificar output
console.log('\n📦 Verificando output:');
if (fs.existsSync('.next')) {
  console.log('✅ Pasta .next criada');
  
  const buildManifest = '.next/build-manifest.json';
  if (fs.existsSync(buildManifest)) {
    console.log('✅ Build manifest encontrado');
  } else {
    console.log('❌ Build manifest não encontrado');
  }
} else {
  console.log('❌ Pasta .next não encontrada');
}

console.log('\n🚀 Próximos passos:');
console.log('1. Se o build local passou, faça commit e push');
console.log('2. Monitore o deploy na Vercel Dashboard');
console.log('3. Verifique se o site carrega: https://app-e-orientar-o-usuario-3.vercel.app');

console.log('\n✅ Teste concluído!');