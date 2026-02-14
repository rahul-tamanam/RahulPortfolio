import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { strings } from '@/lib/strings'

function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            className='size-9 p-0'
            aria-label={strings['theme-toggle']['toggle-theme']}
            data-testid='theme-toggle'
          >
            <SunIcon className='dark:hidden' />
            <MoonIcon className='hidden dark:block' />
          </Button>
        }
      />
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('light')
          }}
          data-testid='theme-light-button'
        >
          <SunIcon className='size-4.5' /> {strings['theme-toggle'].options.light}
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('dark')
          }}
          data-testid='theme-dark-button'
        >
          <MoonIcon className='size-4.5' /> {strings['theme-toggle'].options.dark}
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('system')
          }}
          data-testid='theme-system-button'
        >
          <MonitorIcon className='size-4.5' /> {strings['theme-toggle'].options.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitcher
