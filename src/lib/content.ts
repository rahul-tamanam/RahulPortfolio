import 'server-only'

import { allPages, allProjects } from 'content-collections'

export function getLatestProjects(limit: number = allProjects.length) {
  return allProjects
    .toSorted((a, b) => {
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    })
    .slice(0, limit)
}

export function getSelectedProjects() {
  return allProjects.filter((project) => project.selected)
}

export function getProjectBySlug(slug: string) {
  return allProjects.find((p) => p.slug === slug)
}

export function getPageBySlug(slug: string) {
  return allPages.find((p) => p.slug === slug)
}
