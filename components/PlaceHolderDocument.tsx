'use client'

import { FrownIcon, PlusCircleIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import useSubscription from '@/hooks/useSubscription'

function PlaceHolderDocument() {
  const { isOverFileLimit } = useSubscription()
  const router = useRouter()

  const handleClick = () => {
    // check if user is at free tier limit and push to upgrade page

    if (isOverFileLimit) {
      router.push('/dashboard/upgrade')
    } else {
      router.push('/dashboard/upload')
    }
  }

  return (
    <Button
      disabled={isOverFileLimit}
      onClick={handleClick}
      className="flex flex-col items-center gap-y-2 w-64 h-80 rounded-xl border border-border bg-secondary drop-shadow-md text-secondary-foreground"
    >
      {isOverFileLimit ? (
        <FrownIcon className="h-16 w-16" />
      ) : (
        <PlusCircleIcon strokeWidth="1.2" className="h-16 w-16" />
      )}

      <p className="font-medium text-center">
        {isOverFileLimit
          ? 'Upgrade to add more documents'
          : 'Add a new document'}
      </p>
    </Button>
  )
}

export default PlaceHolderDocument
