import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production конфигурация
  reactStrictMode: true,
  output: 'standalone',
  
  // Переменные окружения для клиента
  env: {
    PUBLIC_S3_ENDPOINT: process.env.PUBLIC_S3_ENDPOINT,
  },
  
  // Конфигурация изображений для S3
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.selstorage.ru',
      },
    ],
  },
  
  // CORS для API
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
