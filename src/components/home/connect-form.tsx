'use client'

import { useState, useEffect } from 'react'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

function ConnectForm() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })
  const [now, setNow] = useState(() => new Date())
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send')
      setFeedback('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setFeedback('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hour = now.getHours()
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const status = hour >= 6 && hour < 23 ? strings.homepage['connect-form'].awake : strings.homepage['connect-form'].asleep

  return (
    <motion.div
      ref={cardsRef}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className='rounded-2xl p-6 shadow-feature-card lg:p-8'
    >
      <h2 className='mb-2 text-2xl font-semibold sm:text-3xl'>
        {strings.homepage['connect-form']['connect-with']}{' '}
        <span className='text-red-500'>{strings.homepage['connect-form']['connect-with-me']}</span>
      </h2>
      <p className='mb-6 text-sm text-muted-foreground'>
        It&apos;s currently <span className='font-medium text-foreground'>{timeStr}</span> for me, so I&apos;m probably{' '}
        <span className='font-medium text-foreground'>{status}</span>. I&apos;ll get back to you soon.
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <Input
            type='text'
            placeholder={strings.homepage['connect-form'].name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            className='rounded-xl'
          />
          <Input
            type='email'
            placeholder={strings.homepage['connect-form'].email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className='rounded-xl'
          />
        </div>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-stretch'>
          <Textarea
            placeholder={strings.homepage['connect-form'].message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={isSubmitting}
            rows={5}
            className='min-h-[120px] flex-1 rounded-xl resize-none'
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className={cn(
              'shrink-0 self-end rounded-xl px-6 py-3 text-sm font-medium text-white transition-opacity disabled:opacity-50 sm:self-auto',
              'bg-email-button',
            )}
          >
            {isSubmitting ? '...' : strings.homepage['connect-form'].send}
          </button>
        </div>
      </form>

      {feedback === 'success' && (
        <p className='mt-4 text-sm text-green-600 dark:text-green-400'>
          {strings.homepage['connect-form']['send-success']}
        </p>
      )}
      {feedback === 'error' && (
        <p className='mt-4 text-sm text-destructive'>
          {strings.homepage['connect-form']['send-error']}
        </p>
      )}
    </motion.div>
  )
}

export default ConnectForm
