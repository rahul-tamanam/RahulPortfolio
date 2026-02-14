'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'

import MainLayout from '@/components/main-layout'
import { Button } from '@/components/ui/button'
import { strings } from '@/lib/strings'

type PageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

function Page(props: PageProps) {
  const { error, reset } = props

  useEffect(() => {
    posthog.captureException(error)
  }, [error])

  return (
    <MainLayout>
      <div className='space-y-4 px-2 py-8'>
        <h1 className='text-2xl font-semibold'>{strings.error['something-went-wrong']}</h1>
        <Button onClick={reset}>{strings.error['try-again']}</Button>
        <p className='rounded-xl bg-secondary p-4 wrap-break-word'>{error.message}</p>
      </div>
    </MainLayout>
  )
}

export default Page
