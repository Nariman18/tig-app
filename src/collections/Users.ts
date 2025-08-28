import type { CollectionConfig, AccessArgs } from 'payload'

const userRoles = ['admin', 'user'] as const
export type UserRole = (typeof userRoles)[number]

export type User = {
  id: number
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
      access: {
        // Only allowing admins to update role
        update: ({ req: { user } }: AccessArgs<any>) => (user as User)?.role === 'admin',
      },
    },
  ],

  access: {
    // Allowing admins to read all users, others can only read themselves
    read: ({ req: { user } }: AccessArgs<any>) => {
      if ((user as User)?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },

    // Disallowing public registration, only admins can create users
    create: ({ req: { user } }: AccessArgs<any>) => (user as User)?.role === 'admin',

    // ✅ Allow admins to update anyone, others only themselves
    update: ({ req: { user } }: AccessArgs<any>) => {
      if ((user as User)?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },

    // Only allowing admins to delete
    delete: ({ req: { user } }: AccessArgs<any>) => (user as User)?.role === 'admin',
  },
}
