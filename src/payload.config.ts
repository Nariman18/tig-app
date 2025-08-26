import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { AgencyBase } from './collections/AgencyBase'
import { Media } from './collections/Media'
import { Counters } from './collections/Counters'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Get allowed origins dynamically
const getOrigins = (): string[] => {
  const origins = ['http://localhost:3000']

  // Add Vercel URL if available
  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`)
  }

  // Add production URL from environment
  if (process.env.PAYLOAD_PUBLIC_SERVER_URL) {
    origins.push(process.env.PAYLOAD_PUBLIC_SERVER_URL)
  }

  // Add any custom domain
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    origins.push(process.env.NEXT_PUBLIC_SERVER_URL)
  }

  return origins
}

// Validation with better error messages
if (!process.env.DATABASE_URI) {
  console.error('❌ DATABASE_URI is not defined!')
  // Don't throw in production, just log
  if (process.env.NODE_ENV === 'development') {
    throw new Error('DATABASE_URI is not defined!')
  }
}

if (!process.env.PAYLOAD_SECRET) {
  console.error('❌ PAYLOAD_SECRET is not defined!')
  if (process.env.NODE_ENV === 'development') {
    throw new Error('PAYLOAD_SECRET is not defined!')
  }
}

export default buildConfig({
  // Use environment variable for serverURL, fallback to localhost only in development
  serverURL:
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'),

  cors: getOrigins(),
  csrf: getOrigins(),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, AgencyBase, Media, Counters],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-build',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    },
  }),

  sharp,
  plugins: [
    payloadCloudPlugin(),

    s3Storage({
      collections: {
        media: {},
      },
      bucket: process.env.BACKBLAZE_BUCKET_NAME || '',
      config: {
        endpoint: process.env.BACKBLAZE_ENDPOINT,
        region: process.env.BACKBLAZE_REGION || 'eu-central-003',
        credentials: {
          accessKeyId: process.env.BACKBLAZE_KEY_ID || '',
          secretAccessKey: process.env.BACKBLAZE_APPLICATION_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
})
