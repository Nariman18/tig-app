// storage-adapter-import-placeholder
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
// import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  cors: ['http://localhost:3000', 'https://tig-app-seven.vercel.app'],
  csrf: ['http://localhost:3000', 'https://tig-app-seven.vercel.app'],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, AgencyBase, Media, Counters],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder

    // Backblaze B2 (S3-compatible) Storage
    s3Storage({
      collections: {
        media: {}, // attach storage to Media collection
      },
      bucket: process.env.BACKBLAZE_BUCKET_NAME!,
      config: {
        endpoint: process.env.BACKBLAZE_ENDPOINT,
        region: process.env.BACKBLAZE_REGION,
        credentials: {
          accessKeyId: process.env.BACKBLAZE_KEY_ID!,
          secretAccessKey: process.env.BACKBLAZE_APPLICATION_KEY!,
        },
        forcePathStyle: true,
      },
    }),
  ],
})
