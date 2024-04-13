/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "maps.googleapis.com",
          port: "",
        },
        {
          protocol: 'https',
          hostname: 'm1r.ai',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };

module.exports = nextConfig