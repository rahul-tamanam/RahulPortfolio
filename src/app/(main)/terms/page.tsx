import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import PageHeader from '@/components/page-header'
import { getPageBySlug } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { strings } from '@/lib/strings'

export async function generateMetadata(): Promise<Metadata> {
  const title = strings.common.labels.terms
  const description = strings.terms.description

  return createMetadata({
    pathname: '/terms',
    title,
    description,
  })
}

function Page() {
  const title = strings.common.labels.terms
  const description = strings.terms.description
  const page = getPageBySlug('terms')

  if (!page) {
    return notFound()
  }

  const { code } = page

  return (
    <>
      <PageHeader title={title} description={description} />
      <Mdx code={code} />
    </>
  )
}

export default Page
