/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-global.cpcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tgdd.vn',           // ← THÊM DOMAIN NÀY
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cookpad.com',           // ← THÊM COOKPAD
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cp1.daumcdn.net',       // ← COOKPAD CDN
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.cpcdn.com',         // ← COOKPAD IMAGES
        port: '',
        pathname: '/**',
      },
      // Thêm các hostname phổ biến khác
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',   // ← UNSPLASH
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',   // ← PLACEHOLDER
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig