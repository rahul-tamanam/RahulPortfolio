import type { Viewport } from 'next'

import '@/styles/globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import Analytics from '@/components/analytics'
import Hello from '@/components/hello'
import Providers from '@/components/providers'
import SignInDialog from '@/components/sign-in-dialog'
import { cn } from '@/utils/cn'

type LayoutProps = { children: React.ReactNode }

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en' className={cn(geistSans.variable, geistMono.variable)} data-scroll-behavior='smooth' suppressHydrationWarning>
      <body className='relative flex min-h-screen flex-col'>
        <NuqsAdapter>
          <Providers>
            <Hello />
            {children}
            <Analytics />
            <SignInDialog />
          </Providers>
        </NuqsAdapter>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default Layout
