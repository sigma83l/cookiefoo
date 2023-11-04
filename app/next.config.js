/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.ts');

const nextConfig = {
    i18n,
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/assets/products/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/images/**',
          }
        ],
      },
};

module.exports = nextConfig 
