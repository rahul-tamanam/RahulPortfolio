import type { MetadataRoute } from 'next'

import { getPath } from '@/utils/get-path'
import { getPathnames } from '@/utils/get-pathnames'

function sitemap(): MetadataRoute.Sitemap {
  const pathnames = getPathnames()

  return pathnames.map((pathname) => ({
    url: getPath(pathname),
    lastModified: new Date(),
  }))
}

export default sitemap
