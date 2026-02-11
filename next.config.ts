import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com' }],
    deviceSizes: [360, 390, 430, 640, 768, 1024, 1280],
    imageSizes: [16, 24, 32, 40, 48, 56, 64, 80, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
