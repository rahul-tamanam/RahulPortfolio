import type { Metadata } from 'next'

import ActiveSessions from '@/components/account/active-sessions'
import Profile from '@/components/account/profile'
import { createMetadata } from '@/lib/metadata'
import { strings } from '@/lib/strings'

export async function generateMetadata(): Promise<Metadata> {
  const title = strings.common.labels.account
  const description = strings.account.description

  return createMetadata({
    pathname: '/account',
    title,
    description,
  })
}

function Page() {
  return (
    <>
      <Profile />
      <ActiveSessions />
    </>
  )
}

export default Page
