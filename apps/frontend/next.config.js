/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinifi: true,
  webpack(config) {
    return config;
  },
};

export default nextConfig;
