import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { strings } from '@/lib/strings'

function ProfileSkeleton() {
  return (
    <Card className='p-4 sm:p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <span className='text-muted-foreground'>{strings.account.avatar}</span>
          <Skeleton className='size-24 rounded-full' />
        </div>
        <Button variant='outline'>{strings.account['update-avatar']}</Button>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <span className='text-muted-foreground'>{strings.account['display-name']}</span>
          <Skeleton className='h-6 w-20' />
        </div>
        <Button variant='outline'>{strings.account['edit-name']}</Button>
      </div>
      <div>
        <div className='flex flex-col gap-2'>
          <span className='text-muted-foreground'>{strings.account.email}</span>
          <Skeleton className='h-6 w-20' />
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-2'>
          <span className='text-muted-foreground'>{strings.account['account-created']}</span>
          <Skeleton className='h-6 w-20' />
        </div>
      </div>
    </Card>
  )
}

export default ProfileSkeleton
