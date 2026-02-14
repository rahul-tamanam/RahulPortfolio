import { redirect } from 'next/navigation'

import AccountMobileNav from '@/components/account/account-mobile-nav'
import AccountSidebar from '@/components/account/account-sidebar'
import MainLayout from '@/components/main-layout'
import PageHeader from '@/components/page-header'
import { strings } from '@/lib/strings'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

type LayoutProps = { children: React.ReactNode }

async function Layout(props: LayoutProps) {
  const { children } = props

  const session = await getSession()

  if (!session) {
    redirect('/')
  }

  const title = strings.common.labels.account
  const description = strings.account.description

  return (
    <MainLayout>
      <div className='flex items-center justify-between'>
        <PageHeader title={title} description={description} />
        <AccountMobileNav />
      </div>
      <div className='gap-10 md:flex'>
        <AccountSidebar />
        <div className='w-full space-y-12'>{children}</div>
      </div>
    </MainLayout>
  )
}

export default Layout
