'use client'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from '@/components/ui/link'
import { HEADER_LINKS } from '@/config/links'
import { strings } from '@/lib/strings'

function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className='flex size-9 items-center justify-center p-0 md:hidden'
            aria-label={strings.layout['toggle-menu']}
            variant='ghost'
          >
            <MenuIcon />
          </Button>
        }
      />
      <DropdownMenuContent align='end' sideOffset={20} className='min-w-40'>
        {HEADER_LINKS.map((link) => (
          <DropdownMenuItem
            key={link.key}
            render={
              <Link href={link.href} className='flex items-center gap-4'>
                {link.icon}
                <div>{link.label}</div>
              </Link>
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileNav
