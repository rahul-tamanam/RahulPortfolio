import type { Metadata } from 'next'
import type { WebSite, WithContext } from 'schema-dts'

import AboutMe from '@/components/home/about-me'
import CareerHistory from '@/components/home/career-history'
import ClientOnly from '@/components/client-only'
import ConnectForm from '@/components/home/connect-form'
import Education from '@/components/home/education'
import Hero from '@/components/home/hero'
import SelectedProjects from '@/components/home/selected-projects'
import JsonLd from '@/components/json-ld'
import {
  MY_NAME,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
} from '@/lib/constants'
import { getSelectedProjects } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { strings } from '@/lib/strings'
import { getBaseUrl } from '@/utils/get-base-url'
import { getPath } from '@/utils/get-path'

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    root: true,
    title: MY_NAME,
    description: strings.metadata['site-description'],
  })
}

function Page() {
  const url = getPath()
  const filteredProjects = getSelectedProjects()

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url,
    name: MY_NAME,
    description: strings.metadata['site-description'],
    url,
    publisher: {
      '@type': 'Person',
      name: MY_NAME,
      url: getBaseUrl(),
      sameAs: [SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL],
    },
    copyrightYear: new Date().getFullYear(),
    dateCreated: '2022-02-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd json={jsonLd} />
      <Hero />
      <SelectedProjects projects={filteredProjects} />
      <CareerHistory />
      <Education />
      <AboutMe />
      <ClientOnly
        placeholder={
          <div className='min-h-[320px] rounded-2xl p-6 shadow-feature-card lg:p-8' aria-hidden />
        }
      >
        <ConnectForm />
      </ClientOnly>
    </>
  )
}

export default Page
