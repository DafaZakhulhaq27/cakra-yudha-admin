/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
      },
    ],
  },
}

module.exports = nextConfig
