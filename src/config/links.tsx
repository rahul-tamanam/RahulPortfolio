import { SiGithub, SiGmail, SiInstagram } from '@icons-pack/react-simple-icons'
import { BriefcaseIcon, FlameIcon, Linkedin, UserCircleIcon } from 'lucide-react'

import { strings } from '@/lib/strings'
import {
  SITE_GITHUB_URL,
  SITE_GMAIL_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
} from '@/lib/constants'

type HeaderLinks = Array<{
  icon: React.ReactNode
  href: string
  key: string
  label: string
}>

export const HEADER_LINKS: HeaderLinks = [
  {
    icon: <BriefcaseIcon className='size-3.5' />,
    href: '/#experience',
    key: 'experience',
    label: strings.common.labels.experience,
  },
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    key: 'projects',
    label: strings.common.labels.projects,
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    key: 'about',
    label: strings.common.labels.about,
  },
]

type FooterLinks = Array<{
  id: string
  title: string
  links: Array<{
    href: string
    label: string
  }>
}>

export const FOOTER_LINKS: FooterLinks = [
  {
    id: 'navigate',
    title: 'Navigate',
    links: [
      { href: '/#top', label: strings.common.labels.home },
      { href: '/about', label: strings.common.labels.about },
      { href: '/projects', label: strings.common.labels.projects },
    ],
  },
  {
    id: 'connect',
    title: 'Connect',
    links: [
      { href: SITE_GITHUB_URL, label: strings.common.labels.github },
      { href: SITE_LINKEDIN_URL, label: strings.common.labels.linkedin },
      { href: SITE_GMAIL_URL, label: strings.common.labels.gmail },
      { href: SITE_INSTAGRAM_URL, label: strings.common.labels.instagram },
    ],
  },
]

type SocialLinks = Array<{
  href: string
  title: string
  icon: React.ReactNode
}>

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: <SiGithub />,
  },
  {
    href: SITE_LINKEDIN_URL,
    title: 'LinkedIn',
    icon: <Linkedin />,
  },
  {
    href: SITE_GMAIL_URL,
    title: 'Gmail',
    icon: <SiGmail />,
  },
  {
    href: SITE_INSTAGRAM_URL,
    title: 'Instagram',
    icon: <SiInstagram />,
  },
]

type AccountSidebarLinks = Array<{
  href: string
  label: string
}>

export const ACCOUNT_SIDEBAR_LINKS: AccountSidebarLinks = [
  {
    href: '/account',
    label: strings.common.labels.account,
  },
  {
    href: '/account/settings',
    label: strings.common.labels.settings,
  },
]
