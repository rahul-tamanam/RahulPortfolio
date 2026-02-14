'use client'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { strings } from '@/lib/strings'

function GoToHomepage() {
  return (
    <Link href='/' className={buttonVariants()}>
      {strings['go-to-homepage']}
    </Link>
  )
}

export default GoToHomepage
