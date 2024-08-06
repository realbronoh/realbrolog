/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/about',
      },
    ];
  },
};

export default nextConfig;
