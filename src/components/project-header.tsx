'use client'

import type { Project } from 'content-collections'

import { ArrowUpRightIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { strings } from '@/lib/strings'
import { cn } from '@/utils/cn'

const animation = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
}

type ProjectHeaderProps = Project

function ProjectHeader(props: ProjectHeaderProps) {
  const { name, description, homepage, github } = props

  const repoPath = github.replace(/^https?:\/\/github\.com\/?/, '') // e.g. "username/repo"

  return (
    <div className='space-y-8 pt-10'>
      <motion.div className='flex items-center gap-3' initial={animation.hide} animate={animation.show}>
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold'>{name}</h1>
          <h2 className='text-muted-foreground'>{description}</h2>
        </div>
      </motion.div>
      <motion.div
        className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {homepage && (
          <Link href={homepage} className={cn(buttonVariants(), 'group')}>
            {strings.projects['visit-website']}
            <ArrowUpRightIcon className='size-5 transition-transform group-hover:-rotate-12' />
          </Link>
        )}
        <Link href={github} className={cn(buttonVariants(), 'group')}>
          {repoPath}
          <ArrowUpRightIcon className='size-5 transition-transform group-hover:-rotate-12' />
        </Link>
      </motion.div>
    </div>
  )
}
export default ProjectHeader
