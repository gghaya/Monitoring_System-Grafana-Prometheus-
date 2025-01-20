// next.config.js
const HOST = process.env.NEXT_PUBLIC_HOST_NAME;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/chat',
        destination: '/Chat',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [`${HOST}`, 'localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: `${HOST}`,
        port: '8000',
        pathname: '**',
      }
    ]
  }
};

module.exports = nextConfig;