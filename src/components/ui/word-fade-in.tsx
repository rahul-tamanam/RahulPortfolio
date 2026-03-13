'/* eslint-disable */\n'
'use client'

import { motion, type Variants } from 'framer-motion'

import { cn } from '@/utils/cn'

interface WordFadeInProps {
  words: string
  className?: string
  delay?: number
  variants?: Variants
}

function WordFadeIn(props: WordFadeInProps) {
  const {
    words,
    delay = 0.15,
    variants = {
      hidden: { opacity: 0, y: 12 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * delay, duration: 0.5, ease: 'easeOut' },
      }),
    },
    className,
  } = props

  const tokens = words.split(' ')

  return (
    <motion.h2
      variants={variants}
      initial='hidden'
      animate='visible'
      className={cn(
        'text-2xl font-semibold tracking-[-0.02em] text-foreground drop-shadow-sm sm:text-3xl md:text-4xl',
        className,
      )}
    >
      {tokens.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={variants} custom={i}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.h2>
  )
}

export { WordFadeIn }
