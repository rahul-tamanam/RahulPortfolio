import type { Metadata } from 'next'
import type { AboutPage, WithContext } from 'schema-dts'

import { notFound } from 'next/navigation'

import JsonLd from '@/components/json-ld'
import Mdx from '@/components/mdx'
import PageHeader from '@/components/page-header'
import {
  MY_NAME,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
} from '@/lib/constants'
import { getPageBySlug } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { strings } from '@/lib/strings'
import { getBaseUrl } from '@/utils/get-base-url'
import { getPath } from '@/utils/get-path'

export async function generateMetadata(): Promise<Metadata> {
  const title = strings.common.labels.about
  const description = strings.about.description

  return createMetadata({
    pathname: '/about',
    title,
    description,
    openGraph: {
      type: 'profile',
    },
  })
}

function Page() {
  const title = strings.common.labels.about
  const description = strings.about.description
  const url = getPath('/about')
  const page = getPageBySlug('about')

  const jsonLd: WithContext<AboutPage> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url,
    mainEntity: {
      '@type': 'Person',
      name: MY_NAME,
      description: strings.metadata['site-description'],
      url: getBaseUrl(),
      sameAs: [SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL],
    },
    inLanguage: 'en',
  }

  if (!page) {
    return notFound()
  }

  const { code } = page

  return (
    <>
      <JsonLd json={jsonLd} />
      <PageHeader title={title} description={description} />
      <Mdx code={code} />
    </>
  )
}

export default Page
