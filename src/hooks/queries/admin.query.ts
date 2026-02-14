import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { orpc } from '@/orpc/client'

export function useListUsersAdmin() {
  return useQuery(orpc.admin.user.list.queryOptions({ placeholderData: keepPreviousData }))
}
