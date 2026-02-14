import { useEffect, useState } from 'react'

type Options = {
  relative?: boolean
  threshold?: number
  formatName?: Intl.DateTimeFormatOptions['dateStyle'] | 'short' | 'medium' | 'long' | 'full'
  formatOptions?: Intl.DateTimeFormatOptions
}

type DateInput = Date | string | number

function formatRelativeTime(dateTime: Date, now: Date): string {
  const diffMs = dateTime.getTime() - now.getTime()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second')
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute')
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour')
  if (Math.abs(diffDay) < 7) return rtf.format(diffDay, 'day')

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(dateTime)
}

export function useFormattedDate(date: DateInput, options: Options = {}): string | null {
  const { relative = false, threshold = 7, formatName = 'short', formatOptions } = options

  const [formattedDate, setFormattedDate] = useState<string | null>(null)

  useEffect(() => {
    const dateTime = new Date(date)
    const now = new Date()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const formatOptionsWithTimeZone: Intl.DateTimeFormatOptions = {
      ...formatOptions,
      timeZone,
    }

    const useRelative =
      relative && Math.abs(now.getTime() - dateTime.getTime()) / (1000 * 60 * 60 * 24) <= threshold

    const result = useRelative
      ? formatRelativeTime(dateTime, now)
      : new Intl.DateTimeFormat('en', {
          ...formatOptionsWithTimeZone,
          dateStyle: (formatName as Intl.DateTimeFormatOptions['dateStyle']) ?? 'short',
        }).format(dateTime)

    setFormattedDate(result)
  }, [date, relative, threshold, formatOptions, formatName])

  return formattedDate
}
