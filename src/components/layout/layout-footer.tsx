'use client'

import { Link } from '@/components/ui/link'
import { FOOTER_LINKS } from '@/config/links'

function LayoutFooter() {
  return (
    <footer className='relative mx-auto mb-6 flex w-full max-w-5xl flex-col gap-10 rounded-2xl bg-background/30 p-8 saturate-100 backdrop-blur-md'>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12'>
        {FOOTER_LINKS.map((section) => (
          <nav key={section.id} aria-label={section.title}>
            <h3 className='mb-4 text-sm font-medium text-foreground'>
              {section.title}
            </h3>
            <ul className='flex flex-col gap-3'>
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground transition-colors hover:text-foreground'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className='border-t border-border/50 pt-6 text-center text-sm text-muted-foreground'>
        &copy; {new Date().getFullYear()} Rahul Tamanam
      </div>
    </footer>
  )
}

export default LayoutFooter
