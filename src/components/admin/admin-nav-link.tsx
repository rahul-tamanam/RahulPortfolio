import type { SidebarLink } from '@/config/admin-sidebar-links'
import { usePathname } from 'next/navigation'

import { Link } from '@/components/ui/link'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

type AdminNavLinkProps = SidebarLink

function AdminNavLink(props: AdminNavLinkProps) {
  const { title, url, icon: Icon } = props
  const pathname = usePathname()
  const isActive = url === pathname

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={
          <Link href={url}>
            <Icon />
            <span>{title}</span>
          </Link>
        }
      />
    </SidebarMenuItem>
  )
}

export default AdminNavLink
