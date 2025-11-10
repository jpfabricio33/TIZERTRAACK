/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para funcionar no ambiente Vercel
  output: 'standalone',
  
  // Configurações de imagem
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },

  // Configurações para melhor compatibilidade de deploy
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },

  // Configurações experimentais estáveis
  experimental: {
    serverComponentsExternalPackages: ['@mercadopago/sdk-react'],
  },
};

module.exports = nextConfig;