'use client'

import { useListUsersAdmin } from '@/hooks/queries/admin.query'
import { strings } from '@/lib/strings'

import UsersTable from '../tables/users'

function AdminUsers() {
  const { data, isSuccess, isLoading, isError } = useListUsersAdmin()

  return (
    <>
      {isSuccess && <UsersTable users={data.users} />}
      {isLoading && <div>{strings.common.loading}</div>}
      {isError && <div>{strings.error['failed-to-fetch-users-data']}</div>}
    </>
  )
}

export default AdminUsers
