/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  
  // 性能优化配置
  // swcMinify 在 Next.js 15 中已移除，SWC 现在是默认的
  compiler: {
    // 移除开发环境中的console.log
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 开发服务器优化
  experimental: {
    // 优化文件系统缓存
    scrollRestoration: true,
  },
  
  // Turbopack 配置（替代 experimental.turbo）
  turbopack: {
    resolveAlias: {
      // 优化模块解析
    },
  },
  
  // 如果需要自定义 webpack 配置
  webpack: (config, { isServer }) => {
    // 优化构建性能
    if (!isServer) {
      // 客户端构建优化
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            default: false,
            vendors: false,
            // 将react相关库分组
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-is)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
            },
            // 将next相关库分组
            next: {
              test: /[\\/]node_modules[\\/](next)[\\/]/,
              name: 'next',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }
    
    // 如果需要，可以添加自定义 webpack 配置
    return config;
  },
};

export default nextConfig;