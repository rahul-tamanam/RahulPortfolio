import { users } from '@/db/schemas'

import { adminProcedure } from '../procedures'
import { ListUsersOutputSchema } from '../schemas/admin.schema'

const listUsers = adminProcedure.output(ListUsersOutputSchema).handler(async ({ context }) => {
  const result = await context.db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)

  return {
    users: result,
  }
})

export const adminRouter = {
  user: {
    list: listUsers,
  },
}
