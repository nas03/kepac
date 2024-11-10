/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    // Modify the webpack config here
    context.isServer = false;
    return config;
  },
};

export default nextConfig;
