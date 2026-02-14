import AdminPageHeader from '@/components/admin/admin-page-header'
import AdminUsers from '@/components/admin/admin-users'
import { strings } from '@/lib/strings'

async function Page() {
  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title={strings.common.labels.users}
        description={strings.admin['page-header'].users.description}
      />
      <AdminUsers />
    </div>
  )
}

export default Page
