/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react', '@tanstack/query-core'],
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
        locale: false,
      },
    ]
  },
}

export default nextConfig
