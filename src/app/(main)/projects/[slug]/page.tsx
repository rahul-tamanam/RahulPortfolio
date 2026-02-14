import type { Metadata } from 'next'
import type { SoftwareSourceCode, WithContext } from 'schema-dts'

import { allProjects } from 'content-collections'
import { notFound } from 'next/navigation'

import BlurImage from '@/components/blur-image'
import JsonLd from '@/components/json-ld'
import Mdx from '@/components/mdx'
import ProjectHeader from '@/components/project-header'
import { MY_NAME } from '@/lib/constants'
import { getProjectBySlug } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { getBaseUrl } from '@/utils/get-base-url'
import { getPath } from '@/utils/get-path'

export function generateStaticParams(): Array<{ slug: string }> {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props
  const { slug } = await params

  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  const { name, description } = project

  return createMetadata({
    pathname: `/projects/${slug}`,
    title: name,
    description,
  })
}

async function Page(props: PageProps) {
  const { params } = props
  const { slug } = await params

  const project = getProjectBySlug(slug)
  const url = getPath(`/projects/${slug}`)

  if (!project) {
    notFound()
  }

  const { name, code, description, github, dateCreated } = project
  const baseUrl = getBaseUrl()

  const jsonLd: WithContext<SoftwareSourceCode> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url,
    codeRepository: github,
    license: 'https://opensource.org/licenses/MIT',
    programmingLanguage: 'TypeScript',
    dateCreated,
    author: {
      '@type': 'Person',
      name: MY_NAME,
      url: baseUrl,
    },
    thumbnailUrl: `${baseUrl}/images/projects/${slug}/cover.png`,
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd json={jsonLd} />
      <div className='mx-auto max-w-3xl'>
        <ProjectHeader {...project} />
        <BlurImage
          src={`/images/projects/${slug}/cover.png`}
          width={1200}
          height={630}
          alt={name}
          className='my-12 rounded-lg'
          lazy={false}
        />
        <Mdx code={code} />
      </div>
    </>
  )
}

export default Page
