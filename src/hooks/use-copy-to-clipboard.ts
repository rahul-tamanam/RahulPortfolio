import { useState } from 'react'
import { toast } from 'sonner'

import { strings } from '@/lib/strings'

type CopyOptions = {
  text: string
  timeout?: number
  successMessage?: React.ReactNode
  errorMessage?: React.ReactNode
}

export function useCopyToClipboard(): [(options: CopyOptions) => Promise<void>, boolean] {
  const [isCopied, setIsCopied] = useState(false)

  async function copy({ text, timeout, successMessage, errorMessage }: CopyOptions) {
    if (isCopied) return

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      toast.success(successMessage ?? strings.success['copied-to-clipboard'])

      setTimeout(() => {
        setIsCopied(false)
      }, timeout ?? 2000)
    } catch {
      toast.error(errorMessage ?? 'Unable to copy to clipboard. Please try again.')
    }
  }

  return [copy, isCopied]
}
