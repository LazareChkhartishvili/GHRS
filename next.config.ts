import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: 'ka',
    locales: ['ka', 'ru', 'en'],
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
  // experimental: {
  //   typedRoutes: true,
  // },
  // webpack: (config) => {
  //   // გამოვრიცხოთ backend ფოლდერი build-ისგან
  //   config.watchOptions = {
  //     ...config.watchOptions,
  //     ignored: /backend/,
  //   };
  //   return config;
  // },
};

export default nextConfig;
