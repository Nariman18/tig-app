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
import { preloadFlagOptions } from './hooks/getFLagOption'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// For preloading my svg flags before my panel loads
preloadFlagOptions()

const getOrigins = (): string[] => {
  if (process.env.NODE_ENV === 'development') {
    return ['http://localhost:3000', 'http://localhost:3001']
  }

  return [
    'https://tig-app-lilac.vercel.app',
    'https://www.trendinfluencegroup.com',
    'https://trendinfluencegroup.com',
  ]
}

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,

  cors: getOrigins(),
  csrf: getOrigins(),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, AgencyBase, Media],
  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'dev-secret'),

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
      bucket: process.env.BACKBLAZE_BUCKET_NAME!,
      config: {
        endpoint: process.env.BACKBLAZE_ENDPOINT!,
        region: process.env.BACKBLAZE_REGION!,
        credentials: {
          accessKeyId: process.env.BACKBLAZE_KEY_ID!,
          secretAccessKey: process.env.BACKBLAZE_APPLICATION_KEY!,
        },
        forcePathStyle: true,
      },
    }),
  ],
})
