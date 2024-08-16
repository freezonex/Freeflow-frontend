/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_PREFIX: ' ',
  },
  experimental: {
    forceSwcTransforms: false, // 确保这个选项没有设置为 true
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/mqttapi/:slug*',
        destination: 'http://supcononenorth.fortiddns.com:18083/api/v5/:slug*',
      },
    ];
  },
};

module.exports = nextConfig;
