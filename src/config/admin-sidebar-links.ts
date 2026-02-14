import { LayoutDashboardIcon, UsersIcon } from 'lucide-react'

import { strings } from '@/lib/strings'

export const ADMIN_SIDEBAR_LINKS = [
  {
    title: strings.common.labels.general,
    links: [
      {
        title: strings.common.labels.dashboard,
        url: '/admin',
        icon: LayoutDashboardIcon,
      },
      {
        title: strings.common.labels.users,
        url: '/admin/users',
        icon: UsersIcon,
      },
    ],
  },
] as const

export type SidebarGroup = (typeof ADMIN_SIDEBAR_LINKS)[number]
export type SidebarLink = SidebarGroup['links'][number]
