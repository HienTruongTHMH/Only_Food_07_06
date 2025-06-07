import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'img-global.cpcdn.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'cookpad.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'example.com',
//         port: '',
//         pathname: '/**',
//       },
//       // Thêm các hostname khác nếu cần thiết
//     ],
//   },
// };

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint completely during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
