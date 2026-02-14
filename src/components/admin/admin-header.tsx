'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { strings } from '@/lib/strings'

function AdminHeader() {
  return (
    <header className='flex items-center justify-between py-4'>
      <SidebarTrigger variant='outline' aria-label={strings.admin['toggle-sidebar']} />
    </header>
  )
}

export default AdminHeader
