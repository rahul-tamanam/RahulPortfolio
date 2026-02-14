import NextLink from 'next/link'

type LinkProps = React.ComponentProps<'a'>

function Link(props: LinkProps) {
  const { href, children, ...rest } = props

  if (!href) {
    throw new Error('Link must have an href')
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    const { href: _h, ...linkRest } = rest as React.ComponentProps<'a'>
    return <NextLink href={href} {...linkRest}>{children}</NextLink>
  }

  const { prefetch: _prefetch, ...anchorRest } = rest as React.ComponentProps<'a'> & { prefetch?: boolean }
  return (
    <a target='_blank' rel='noopener noreferrer' href={href} {...anchorRest}>
      {children}
    </a>
  )
}

export { Link }
