'use client'

import { useEffect, useState } from 'react'

type ClientOnlyProps = {
  children: React.ReactNode
  /** Optional placeholder shown during SSR and until hydration. Use to avoid layout shift. */
  placeholder?: React.ReactNode
}

/**
 * Renders children only after mount. Use to avoid hydration mismatches when a component
 * (e.g. Base UI) generates different IDs or content on server vs client.
 */
function ClientOnly(props: ClientOnlyProps) {
  const { children, placeholder = null } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{placeholder}</>
  return <>{children}</>
}

export default ClientOnly
