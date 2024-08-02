'use client'

import { PlusCircleIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function PlaceHolderDocument() {
  const router = useRouter()

  const handleClick = () => {
    // check if user is at free tier limit and push to upgrade page
    router.push('/dashboard/upload')
  }

  return (
    <Button
      onClick={handleClick}
      className="flex flex-col items-center gap-y-2 w-64 h-80 rounded-xl border border-border bg-secondary drop-shadow-md text-secondary-foreground"
    >
      <PlusCircleIcon strokeWidth="1.2" className="h-16 w-16" />
      <p>Add a new document</p>
    </Button>
  )
}

export default PlaceHolderDocument
