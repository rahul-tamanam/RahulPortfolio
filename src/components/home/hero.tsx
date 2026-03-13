'use client'

import { DownloadIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import BlurImage from '@/components/blur-image'
import { MY_NAME } from '@/lib/constants'
import { strings } from '@/lib/strings'

const ROLES = [
  strings.homepage.hero.amazing, // an AI Engineer
  strings.homepage.hero.attractive, // an ML Engineer
  strings.homepage.hero.fantastic, // a Business Analyst
  strings.homepage.hero.stunning, // a Data Analyst
]

const ROLE_DURATION_MS = 3000

const roleVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

const gradientClass = 'bg-clip-text text-transparent bg-linear-to-r from-[#38bdf8] via-[#22c55e] to-[#a855f7]'

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROLES.length)
    }, ROLE_DURATION_MS)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const role = ROLES[currentIndex]
  const titleTop = strings.homepage.hero['title-top']
  const highlight = "I'm Rahul"
  const [before, after] = titleTop.split(highlight)

  return (
    <section className='px-4 py-16 md:py-24'>
      <div className='mx-auto flex max-w-5xl flex-col items-center gap-10 text-center md:flex-row md:items-center md:gap-16 md:text-left'>
        {/* Profile image (left) */}
        <motion.div
          className='relative size-32 shrink-0 sm:size-40 md:size-60'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BlurImage
            src='/images/picture.png'
            className='size-full overflow-hidden rounded-full'
            imageClassName='size-full rounded-full object-cover object-[40%_60%]'
            width={1024}
            height={1024}
            alt={`${MY_NAME}'s Logo`}
            lazy={false}
          />
          <div className='absolute inset-0 -z-10 bg-linear-to-tl from-purple-700 to-orange-700 opacity-50 blur-2xl' />
        </motion.div>

        {/* Text block (right) */}
        <div className='flex flex-1 flex-col items-center gap-4 md:items-start'>
          {/* Big greeting heading */}
          <motion.h1
            initial={{ x: 15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            className='text-4xl font-semibold sm:text-5xl md:text-4xl'
          >
            {before}
            <span className='text-red-500'>{highlight}</span>
            {after}
          </motion.h1>

          {/* Intro copy with cascading roles at the end */}
          <motion.p
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            className='max-w-xl text-lg/relaxed text-muted-foreground sm:text-xl'
          >
            <span>
              I build things with data. Sometimes it's machine learning models, sometimes it's analytics that uncover
              useful insights. Either way, the goal is the same: turning information into decisions that actually matter
              — whether that’s as{' '}
            </span>
            <span className='relative inline-block w-[18ch] text-left align-baseline'>
              <AnimatePresence mode='wait' initial={false}>
                <motion.span
                  key={role}
                  variants={roleVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className={`inline-block whitespace-nowrap ${gradientClass}`}
                >
                  {role}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          {/* Location / timezone */}
          {strings.homepage.hero['location-timezone'] && (
            <motion.p
              initial={{ x: 35, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeOut' }}
              className='text-sm text-muted-foreground'
            >
              {strings.homepage.hero['location-timezone']}
            </motion.p>
          )}

          {/* Resume button */}
          <motion.a
            href='/resume.pdf'
            download='Rahul-Tamanam-Resume.pdf'
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeOut' }}
            className='group relative mt-2 inline-flex min-w-24 shrink-0 overflow-hidden rounded-full p-0.5 [box-shadow:0_0_12px_2px_rgb(255_126_0/0.6),0_0_24px_8px_rgb(255_87_87/0.4)] transition-transform hover:scale-105'
          >
            <span className='absolute inset-0 rounded-full bg-[linear-gradient(90deg,#FF7E00,#FF5757)]' aria-hidden />
            <span className='relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-base font-medium text-foreground transition-[background-color,color,text-shadow] duration-300 group-hover:bg-transparent group-hover:text-white group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.6)]'>
              {strings.homepage.hero['hire-me']}
              <DownloadIcon className='size-4 shrink-0' aria-hidden />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Hero
