import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.eu-central-003.backblazeb2.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.trendinfluencegroup.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tig-app-lilac.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              protocol: 'https',
              hostname: '**',
              pathname: '/**', // Allows any domain in development
            },
          ]
        : []),
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
