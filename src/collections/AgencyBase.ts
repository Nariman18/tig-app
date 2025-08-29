import type { AccessArgs, CollectionConfig } from 'payload'
import { User } from './Users'
import { getFlagOptions } from '@/hooks/getFLagOption'

export const AgencyBase: CollectionConfig = {
  slug: 'AgencyBase',
  access: {
    read: () => true,
    create: ({ req: { user } }: AccessArgs<any>) =>
      ['admin', 'user'].includes((user as User)?.role),
    update: ({ req: { user } }: AccessArgs<any>) =>
      ['admin', 'user'].includes((user as User)?.role),
    delete: ({ req: { user } }: AccessArgs<any>) =>
      ['admin', 'user'].includes((user as User)?.role),
  },

  fields: [
    {
      name: 'fullname',
      type: 'text',
      required: true,
    },
    {
      name: 'nickname',
      type: 'text',
      required: true,
    },
    {
      name: 'followers',
      type: 'number',
      required: true,
    },

    {
      name: 'countryFlags',
      type: 'select',
      required: true,
      options: getFlagOptions(),
    },
    {
      name: 'socialMediaIcons',
      type: 'select',
      required: true,
      hasMany: true,
      options: [
        { label: 'Instagram', value: '/socials/icons8-instagram.gif' },
        { label: 'Facebook', value: '/socials/icons8-facebook.gif' },
        { label: 'Youtube', value: '/socials/icons8-youtube.gif' },
        { label: 'Twitch', value: '/socials/icons8-twitch.gif' },
        { label: 'Tiktok', value: '/socials/icons8-tiktok.gif' },
        { label: 'Kick', value: '/socials/kick.png' },
        { label: 'Trovo', value: '/socials/icons8-trovo-logo.svg' },
      ],
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },

    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
      filterOptions: { mimeType: { contains: 'image' } },
    },
  ],
}
