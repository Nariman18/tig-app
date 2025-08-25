import type { CollectionConfig } from 'payload'

export const AgencyBase: CollectionConfig = {
  slug: 'AgencyBase',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data) return data
        if (data.displayId) return data

        // get (or create) the counter for AgencyBase
        const { docs } = await req.payload.find({
          collection: 'counters',
          where: { name: { equals: 'agencyBase' } },
          limit: 1,
          depth: 0,
        })

        const current = docs[0]
        const nextValue = (current?.value || 0) + 1

        if (current) {
          await req.payload.update({
            collection: 'counters',
            id: current.id,
            data: { value: nextValue },
            depth: 0,
          })
        } else {
          await req.payload.create({
            collection: 'counters',
            data: { name: 'agencyBase', value: nextValue },
            depth: 0,
          })
        }

        data.displayId = nextValue
        return data
      },
    ],
  },
  fields: [
    {
      name: 'displayId',
      type: 'number',
      required: true,
      unique: true,
      admin: { readOnly: false, position: 'sidebar' }, // visible, not editable
    },
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
      options: [
        {
          label: 'United States',
          value: '/flags/us.svg',
        },
        {
          label: 'United Kingdom',
          value: '/flags/gb.svg',
        },
        {
          label: 'Canada',
          value: '/flags/ca.svg',
        },
        {
          label: 'Australia',
          value: '/flags/au.svg',
        },
        {
          label: 'Germany',
          value: '/flags/de.svg',
        },
        {
          label: 'France',
          value: '/flags/fr.svg',
        },
        {
          label: 'Italy',
          value: '/flags/it.svg',
        },
        {
          label: 'Spain',
          value: '/flags/es.svg',
        },
        {
          label: 'Brazil',
          value: '/flags/br.svg',
        },
        {
          label: 'Russia',
          value: '/flags/ru.svg',
        },
        {
          label: 'China',
          value: '/flags/cn.svg',
        },
        {
          label: 'Japan',
          value: '/flags/jp.svg',
        },
        {
          label: 'South Korea',
          value: '/flags/kr.svg',
        },
        {
          label: 'India',
          value: '/flags/in.svg',
        },
        {
          label: 'Ukraine',
          value: '/flags/ua.svg',
        },
        {
          label: 'Poland',
          value: '/flags/pl.svg',
        },
        {
          label: 'Portugal',
          value: '/flags/pt.svg',
        },
        {
          label: 'Greece',
          value: '/flags/gr.svg',
        },
      ],
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
