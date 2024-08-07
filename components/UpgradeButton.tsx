'use client'

import useSubscription from '@/hooks/useSubscription'
import { Button } from './ui/button'
import Link from 'next/link'
import { LoaderIcon, StarIcon } from 'lucide-react'
import { createStripePortal } from '@/actions/createStripePortal'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

function UpgradeButton() {
  const { hasActiveMembership, loading } = useSubscription()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleAccount = () => {
    startTransition(async () => {
      const stripePortalUrl = await createStripePortal()
      router.push(stripePortalUrl)
    })
  }

  if (!hasActiveMembership && !loading)
    return (
      <Button
        asChild
        variant="outline"
        className="border-primary hidden sm:inline-flex"
      >
        <Link href={'/dashboard/upgrade'}>
          Upgrade
          <StarIcon className="ml-2 fill-primary text-primary-foreground" />
        </Link>
      </Button>
    )

  return (
    <Button
      onClick={handleAccount}
      disabled={isPending}
      variant="default"
      className="border border-secondary bg-gradient-to-bl from-primary via-primary to-blue-900 text-primary-foreground dark:text-foreground rounded-full hidden sm:inline-flex"
    >
      {isPending ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <p>
          <span className="font-extrabold">PRO </span>
          Plan
        </p>
      )}
    </Button>
  )
}

export default UpgradeButton
