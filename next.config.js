/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração essencial para Vercel
  output: 'standalone',
  
  // Configurações de build otimizadas
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Configurações de imagem
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
    unoptimized: false,
  },

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

  // Configurações de webpack para otimização
  webpack: (config, { isServer, dev }) => {
    // Otimizações para produção
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;