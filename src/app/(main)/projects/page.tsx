import type { Metadata } from 'next'
import type { CollectionPage, WithContext } from 'schema-dts'

import JsonLd from '@/components/json-ld'
import PageHeader from '@/components/page-header'
import ProjectCards from '@/components/project-cards'
import { MY_NAME } from '@/lib/constants'
import { getLatestProjects } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { strings } from '@/lib/strings'
import { getBaseUrl } from '@/utils/get-base-url'
import { getPath } from '@/utils/get-path'

export async function generateMetadata(): Promise<Metadata> {
  const title = strings.common.labels.projects
  const description = strings.projects.description

  return createMetadata({
    pathname: '/projects',
    title,
    description,
  })
}

function Page() {
  const title = strings.common.labels.projects
  const description = strings.projects.description
  const url = getPath('/projects')
  const projects = getLatestProjects()

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: title,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        url: `${url}/${project.slug}`,
        position: index + 1,
      })),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: MY_NAME,
      url: getBaseUrl(),
    },
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd json={jsonLd} />
      <PageHeader title={title} description={description} />
      <ProjectCards projects={projects} />
    </>
  )
}

export default Page
