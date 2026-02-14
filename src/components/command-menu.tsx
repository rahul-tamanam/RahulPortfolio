'use client'

import { CodeIcon, CommandIcon, LinkIcon, LogInIcon, LogOutIcon, UserCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { SOCIAL_LINKS } from '@/config/links'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useSignInDialog } from '@/hooks/use-sign-in-dialog'
import { useSignOut } from '@/hooks/use-sign-out'
import { strings } from '@/lib/strings'
import { useSession } from '@/lib/auth-client'

type CommandAction = {
  title: string
  icon: React.ReactNode
  onSelect: () => void | Promise<void>
}

type CommandGroupType = {
  name: string
  actions: CommandAction[]
}

function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [copy] = useCopyToClipboard()
  const { data: session } = useSession()
  const { openDialog } = useSignInDialog()
  const router = useRouter()
  const signOut = useSignOut({ redirectTo: '/' })

  function closeMenu() {
    setIsOpen(false)
  }

  function openMenu() {
    setIsOpen(true)
  }

  function toggleMenu() {
    setIsOpen((value) => !value)
  }

  function openExternalLink(url: string) {
    closeMenu()
    window.open(url, '_blank', 'noopener')
  }

  async function copyCurrentUrl() {
    closeMenu()
    await copy({ text: globalThis.location.href })
  }

  function handleAccountNavigate() {
    closeMenu()
    router.push('/account')
  }

  function handleSignIn() {
    closeMenu()
    openDialog()
  }

  async function handleSignOut() {
    closeMenu()

    await signOut()
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const accountActions: CommandAction[] = session
    ? [
        {
          title: strings.common.labels.account,
          icon: <UserCircleIcon />,
          onSelect: handleAccountNavigate,
        },
        {
          title: strings.common['sign-out'],
          icon: <LogOutIcon />,
          onSelect: handleSignOut,
        },
      ]
    : [
        {
          title: strings.common['sign-in'],
          icon: <LogInIcon />,
          onSelect: handleSignIn,
        },
      ]

  const generalActions: CommandAction[] = [
    {
      title: strings['command-menu'].actions['copy-link'],
      icon: <LinkIcon />,
      onSelect: copyCurrentUrl,
    },
    {
      title: strings['command-menu'].actions['source-code'],
      icon: <CodeIcon />,
      onSelect: () => {
        openExternalLink('https://github.com/rahultamanam/nelsonlai.dev')
      },
    },
  ]

  const socialActions: CommandAction[] = SOCIAL_LINKS.map((link) => ({
    title: link.title,
    icon: link.icon,
    onSelect: () => {
      openExternalLink(link.href)
    },
  }))

  const groups: CommandGroupType[] = [
    { name: strings.common.labels.account, actions: accountActions },
    { name: strings.common.labels.general, actions: generalActions },
    { name: strings['command-menu'].groups.social, actions: socialActions },
  ]

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={openMenu}
        aria-label={strings['command-menu']['open-menu']}
        data-testid='command-menu-button'
      >
        <CommandIcon />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command>
          <CommandInput placeholder={strings['command-menu'].placeholder} />
          <CommandList>
            <CommandEmpty>{strings['command-menu']['no-results']}</CommandEmpty>
            {groups.map((group, index) => (
              <Fragment key={group.name}>
                <CommandGroup heading={group.name}>
                  {group.actions.map((action) => (
                    <CommandItem key={action.title} onSelect={action.onSelect}>
                      {action.icon}
                      {action.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {index === groups.length - 1 ? null : <CommandSeparator />}
              </Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
