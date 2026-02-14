import { describe, expect, it } from 'vitest'

import sitemap from '@/app/sitemap'
import { getPath } from '@/utils/get-path'
import { getPathnames } from '@/utils/get-pathnames'

describe('sitemap', () => {
  it('generates sitemap entries for all pathnames', () => {
    const pathnames = getPathnames()
    const result = sitemap()

    expect(result).toHaveLength(pathnames.length)
  })

  it('includes all required properties for each entry', () => {
    const result = sitemap()

    for (const entry of result) {
      expect(entry).toHaveProperty('url')
      expect(entry).toHaveProperty('lastModified')
      expect(entry.url).toBeTypeOf('string')
      expect(entry.lastModified).toBeInstanceOf(Date)
    }
  })

  it('generates correct URLs for each pathname', () => {
    const pathnames = getPathnames()
    const result = sitemap()

    for (const pathname of pathnames) {
      const expectedUrl = getPath(pathname)
      const matchingEntry = result.find((entry) => entry.url === expectedUrl)

      expect(matchingEntry).toBeDefined()
      expect(matchingEntry?.url).toBe(expectedUrl)
    }
  })

  it('generates unique URLs', () => {
    const result = sitemap()
    const urls = result.map((entry) => entry.url)
    const uniqueUrls = new Set(urls)

    expect(uniqueUrls.size).toBe(urls.length)
  })
})
