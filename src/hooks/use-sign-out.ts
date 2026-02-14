import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'
import { strings } from '@/lib/strings'

type UseSignOutOptions = {
  redirectTo?: string
}

export function useSignOut(options: UseSignOutOptions = {}) {
  const { redirectTo } = options

  const router = useRouter()

  return async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          if (redirectTo) {
            router.push(redirectTo)
          } else {
            router.refresh()
          }
          toast.success(strings.success['signed-out'])
        },
        onError: () => {
          toast.error(strings.error['sign-out-failed'])
        },
      },
    })
  }
}
