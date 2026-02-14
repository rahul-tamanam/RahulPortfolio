import { type Context, defineCollection, defineConfig, type Meta } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import * as z from 'zod'

import { getTOC, rehypePlugins, remarkPlugins } from '@/mdx-plugins'

type BaseDoc = {
  _meta: Meta
  content: string
}

async function transform<D extends BaseDoc>(document: D, context: Context) {
  const code = await compileMDX(context, document, {
    remarkPlugins,
    rehypePlugins,
  })
  const pathParts = document._meta.path.split(/[/\\]/)
  const slug = pathParts[pathParts.length - 1]?.replace(/\.mdx?$/, '') ?? ''
  if (!slug) {
    throw new Error(`Invalid path: ${document._meta.path}`)
  }

  return {
    ...document,
    code,
    locale: 'en',
    slug,
    toc: await getTOC(document.content),
  }
}


const projects = defineCollection({
  name: 'Project',
  directory: 'src/content/projects',
  include: '**/*.mdx',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    homepage: z.string().optional(),
    github: z.string(),
    techstack: z.array(z.string()),
    selected: z.boolean().optional().default(false),
    dateCreated: z.string(),
    content: z.string(),
  }),
  transform,
})

const pages = defineCollection({
  name: 'Page',
  directory: 'src/content/pages',
  include: '**/*.mdx',
  schema: z.object({
    content: z.string(),
  }),
  transform,
})

export default defineConfig({
  collections: [projects, pages],
})
