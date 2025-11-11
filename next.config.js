/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração essencial para Vercel
  output: 'standalone',
  
  // Configurações básicas de imagem
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Configurações de build
  swcMinify: true,
  
  // TypeScript e ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configurações experimentais mínimas
  experimental: {
    serverComponentsExternalPackages: ['@mercadopago/sdk-react'],
  },
};

module.exports = nextConfig;