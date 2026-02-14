'use client'

import { MenuIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Link } from '@/components/ui/link'
import { ACCOUNT_SIDEBAR_LINKS } from '@/config/links'
import { strings } from '@/lib/strings'

function AccountMobileNav() {
  const [open, setOpen] = useState(false)

  function handleCloseDrawer() {
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='size-10 md:hidden'
          aria-label={strings.account['open-navigation-menu']}
        >
          <MenuIcon className='size-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Displays the mobile navigation in drawer.</DrawerDescription>
        </DrawerHeader>
        <ul className='p-8'>
          {ACCOUNT_SIDEBAR_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={handleCloseDrawer} className='block py-2.5 text-muted-foreground'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}

export default AccountMobileNav
