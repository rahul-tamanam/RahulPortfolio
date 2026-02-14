import { createSelectSchema } from 'drizzle-zod'
import * as z from 'zod'

import { users } from '@/db/schemas'

export const ListUsersOutputSchema = z.object({
  users: z.array(
    createSelectSchema(users).pick({
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }),
  ),
})
