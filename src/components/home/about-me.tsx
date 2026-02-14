'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

import OpenTo from './open-to'
import Connect from './connect'
import BadgesCertifications from './badges-certifications'
import LocationCard from './location-card'
import StacksCard from './stacks-card'

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

function AboutMe() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5,
      }}
      className='relative my-24'
    >
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{
          y: 30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {strings.homepage['about-me'].title}
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className='grid gap-4'>
          <LocationCard />
          <StacksCard />
        </div>
        <div className='grid gap-4'>
          <Connect />
          <div className='grid gap-4 [@media(min-width:450px)]:grid-cols-2'>
            <OpenTo />
            <BadgesCertifications />
          </div>
        </div>
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }))}>
          {strings.homepage['about-me'].more}
        </Link>
      </div>
    </motion.div>
  )
}

export default AboutMe
