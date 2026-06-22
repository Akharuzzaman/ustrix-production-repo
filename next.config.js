/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  allowedDevOrigins: ['192.168.57.21']
};

module.exports = nextConfig;
