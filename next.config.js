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
        source: '/copilotkit/openai',
        destination: '/api/copilotkit/openai',
      },

      {
        source: '/mqttapi/:slug*',
        // destination: 'http://supcononenorth.fortiddns.com:18083/api/v5/:slug*',
        destination:
          'http://openiiot-emqx-service.openiiot-dt:18083/api/v5/:slug*',
      },
      {
        source: '/backendapi/:slug*',
        // destination: 'http://52.77.217.53/api/:slug*',
        destination: 'http://openiiot-server-service:8085/:slug*',
      },
    ];
  },
};

module.exports = nextConfig;
