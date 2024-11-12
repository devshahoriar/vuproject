import type { NextConfig } from 'next'


const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
    ],
  },
  eslint:{
    ignoreDuringBuilds : true
  }
}

export default nextConfig
