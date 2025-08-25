import type { CollectionConfig } from 'payload'

export const Counters: CollectionConfig = {
  slug: 'counters',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => false,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'value', type: 'number', required: true, defaultValue: 0 },
  ],
}
