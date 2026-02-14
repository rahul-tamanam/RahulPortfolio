import type { Metadata } from 'next'

import Settings from '@/components/settings'
import { createMetadata } from '@/lib/metadata'
import { strings } from '@/lib/strings'

export async function generateMetadata(): Promise<Metadata> {
  const title = strings.common.labels.settings
  const description = strings.settings.description

  return createMetadata({
    pathname: '/account/settings',
    title,
    description,
  })
}

function Page() {
  return <Settings />
}

export default Page
