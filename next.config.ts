/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. FIX WORKSPACE WARNING
  experimental: {
    turbopack: {
      root: '.',
    },
  },

  // 2. IMAGE OPTIMIZATION (Safe for Main & PPC)
  images: {
    // AVIF is much smaller than WebP and helps hit 95+ speed
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // 3. PRODUCTION CLEANUP
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 4. PERFORMANCE & STABILITY
  reactStrictMode: true,
  swcMinify: true, 
};

export default nextConfig;