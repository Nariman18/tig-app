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
      // Only allowing admins to update the "role" field
      access: {
        update: ({ req }) => {
          const user = req.user as User | undefined
          return user?.role === 'admin'
        },
      },
    },
  ],

  access: {
    // Admins can read all; users can only read themselves
    read: ({ req: { user } }: AccessArgs<any>) => {
      if ((user as User)?.role === 'admin') return true
      return {
        id: { equals: user?.id },
      }
    },

    // Only admins can create new users
    create: ({ req: { user } }: AccessArgs<any>) => (user as User)?.role === 'admin',

    // Admins can update anyone. Users can update only themselves (but not "role" field due to field-level access)
    update: ({ req: { user } }: AccessArgs<any>) => {
      if ((user as User)?.role === 'admin') return true
      return {
        id: { equals: user?.id },
      }
    },

    // Only admins can delete users
    delete: ({ req: { user } }: AccessArgs<any>) => (user as User)?.role === 'admin',
  },
}
