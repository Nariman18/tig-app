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
        hostname: 'trendinfluencegroup.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tig-app-lilac.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],

    unoptimized: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
