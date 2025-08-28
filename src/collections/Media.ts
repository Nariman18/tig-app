import type { AccessArgs, CollectionConfig } from 'payload'
import { User } from './Users'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }: AccessArgs<any>) =>
      ['admin', 'user'].includes((user as User)?.role),
    update: ({ req: { user } }: AccessArgs<any>) =>
      ['admin', 'user'].includes((user as User)?.role),
    delete: ({ req: { user } }: AccessArgs<any>) =>
      ['admin', 'user'].includes((user as User)?.role),
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'avatar',
        width: 500,
        height: 500,
        position: 'center',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
