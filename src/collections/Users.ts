import type { CollectionConfig, AccessArgs } from 'payload'

const userRoles = ['admin', 'user'] as const
export type UserRole = (typeof userRoles)[number]

export type User = {
  id: string // Payload uses string IDs
  role: UserRole
  email: string
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },
  auth: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      admin: {
        position: 'sidebar',
      },
      // 💡 TEMPORARILY allow anyone to update role (you will revert later)
      access: {
        update: () => true,
      },
    },
  ],

  access: {
    // 💡 TEMP: Allow any user to read all users
    read: () => true,

    // 💡 TEMP: Allow anyone to create users (you'll use this to create an admin)
    create: () => true,

    // 💡 TEMP: Allow anyone to update any user
    update: () => true,

    // 🛑 KEEP DELETE PROTECTED
    delete: ({ req: { user } }: AccessArgs<any>) => (user as unknown as User)?.role === 'admin',
  },
}
