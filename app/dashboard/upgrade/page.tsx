'use client'

import { createCheckoutSession } from '@/actions/createCheckoutSession'
import { createStripePortal } from '@/actions/createStripePortal'
import { Button } from '@/components/ui/button'
import useSubscription from '@/hooks/useSubscription'
import getStripe from '@/lib/stripe-js'
import { useUser } from '@clerk/nextjs'
import { CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export type UserDetails = {
  email: string
  name: string
}

function PricingPage() {
  const { user } = useUser()
  const router = useRouter()
  // Pull in user's subscription

  const { hasActiveMembership, loading } = useSubscription()
  const [isPending, startTransition] = useTransition()

  const handleUpgrade = () => {
    if (!user) return

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString()!,
      name: user.fullName!,
    }

    startTransition(async () => {
      const stripe = await getStripe()

      if (hasActiveMembership) {
        // create stripe portal...
        const stripePortalUrl = await createStripePortal()
        return router.push(stripePortalUrl)
      }

      const sessionId = await createCheckoutSession(userDetails)
      await stripe?.redirectToCheckout({
        sessionId,
      })
    })
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto flex flex-col items-center ">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-tight leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold text-foreground tracking-tight sm:text-5xl lg:text-6xl capitalize">
            Collaborate with AI and your documents
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl px-8 text-center text-lg leading-8 text-slate-600 dark:text-slate-400">
          {/* Marketing Subtitle */}
          Unlock the power of AI-driven document collaboration. Boost your
          productivity with our affordable plans.
        </p>

        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* FREE */}
          <div className="flex flex-col flex-1 ring ring-border rounded-3xl p-8 pb-12 h-fit drop-shadow-sm">
            <h3 className="text-lg font-semibold leading-8 text-muted-foreground">
              Starter Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Explore Core Features at No Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                Free
              </span>
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
            >
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                2 PDF Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Up to 4 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Try out the AI chat functionality
              </li>
            </ul>
          </div>
          {/* PRO */}
          <div className="ring-2 ring-ring rounded-3xl p-8 drop-shadow-md">
            <h3 className="text-lg font-semibold leading-8 text-primary">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Maximize Productivity with PRO Features
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                $5.99
              </span>
              <span className="text-sm text-muted-foreground leading-6 font-semibold">
                / month
              </span>
            </p>

            <Button
              className="w-full text-primary-foreground dark:text-foreground shadow-sm mt-6 block rounded-xl px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              disabled={loading || isPending}
              onClick={handleUpgrade}
            >
              {isPending || loading
                ? 'Loading...'
                : hasActiveMembership
                ? 'Manage Plan'
                : 'Upgrade to Pro'}
            </Button>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
            >
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Store up to 20 Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Ability to Delete Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Up to 100 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Full Power AI Chat Functionality with Memory Recall
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="h-6 w-6 flex-none text-primary"
                  aria-hidden="true"
                />
                24-hour Support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
