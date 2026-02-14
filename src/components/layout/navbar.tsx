'use client'

import { usePathname } from 'next/navigation'

import { Link } from '@/components/ui/link'
import { HEADER_LINKS } from '@/config/links'

function Navbar() {
  const pathname = usePathname()

  return (
    <nav className='hidden md:block'>
      <ul className='flex gap-2'>
        {HEADER_LINKS.map((link) => (
          <li key={link.key} className='relative flex items-center justify-center'>
            <Link
              className='rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-active:text-foreground'
              data-active={link.href === pathname}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
