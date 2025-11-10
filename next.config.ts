import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações para Vercel
  output: "standalone",
  
  // Configurações de imagem otimizadas para Vercel
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
      {
        protocol: "https", 
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: false, // Habilitar otimização de imagens na Vercel
  },

  // Configurações experimentais estáveis
  experimental: {
    serverComponentsExternalPackages: ["@mercadopago/sdk-react"],
  },

  // Headers de segurança para APIs
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },

  // Redirects para URLs antigas (se necessário)
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ESLint e TypeScript configurações para produção
  eslint: {
    ignoreDuringBuilds: false, // Manter verificação de qualidade
  },

  typescript: {
    ignoreBuildErrors: false, // Não ignorar erros TypeScript
  },

  // Configurações de compilação otimizadas
  swcMinify: true,
  
  // Configurações de ambiente
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },

  // Configurações específicas para produção na Vercel
  ...(process.env.NODE_ENV === "production" && {
    // Otimizações de produção
    compress: true,
    poweredByHeader: false,
  }),
};

export default nextConfig;