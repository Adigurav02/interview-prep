/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Your existing patterns are kept
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // ================================================================= //
      // /// *** THIS IS THE NEWLY ADDED CODE *** ///
      // This gives Next.js permission to use images from "share.google"
      // ================================================================= //
      {
        protocol: 'https',
        hostname: 'share.google',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;