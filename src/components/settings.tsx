'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetSettings } from '@/hooks/queries/settings.query'
import { strings } from '@/lib/strings'

import SettingsForm from './settings-form'

function Settings() {
  const { data, isSuccess, isError, isLoading } = useGetSettings()

  return (
    <>
      {isLoading && <Skeleton className='h-80 w-full rounded-xl' />}
      {isError && strings.error['failed-to-load-settings']}
      {isSuccess && <SettingsForm settings={data} />}
    </>
  )
}

export default Settings
