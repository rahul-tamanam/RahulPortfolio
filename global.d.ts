import type {} from 'react'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style -- It must be an interface
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
