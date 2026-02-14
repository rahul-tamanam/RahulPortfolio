import type { SidebarGroup as SidebarGroupConfig } from '@/config/admin-sidebar-links'

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar'

import AdminNavLink from './admin-nav-link'

type AdminNavGroupProps = SidebarGroupConfig

function AdminNavGroup(props: AdminNavGroupProps) {
  const { title, links } = props

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link) => (
            <AdminNavLink key={link.url} {...link} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default AdminNavGroup
