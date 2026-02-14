'use client'

import GoToHomepage from '@/components/go-to-homepage'
import MainLayout from '@/components/main-layout'
import { strings } from '@/lib/strings'

function NotFound() {
  return (
    <MainLayout>
      <div className='mt-52 mb-40 flex flex-col items-center justify-center gap-12'>
        <h1 className='text-center text-6xl font-semibold'>{strings.error['not-found']}</h1>
        <GoToHomepage />
      </div>
    </MainLayout>
  )
}

export default NotFound
