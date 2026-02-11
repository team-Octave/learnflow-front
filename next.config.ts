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
    imageSizes: [128, 256],
  },
};

export default nextConfig;
