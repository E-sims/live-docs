'use server'

import { adminDb } from '@/firebase/firebaseAdmin'
import getBaseUrl from '@/lib/getBaseUrl'
import stripe from '@/lib/stripe'
import { auth } from '@clerk/nextjs/server'

export async function createStripePortal() {
  auth().protect()

  const { userId } = auth()
  if (!userId) {
    throw new Error('User not found')
  }

  // Get customer ID from firebaase

  const user = await adminDb.collection('users').doc(userId).get()
  const stripeCustomerId = user.data()?.stripeCustomerId

  if (!stripeCustomerId) {
    throw new Error('Stripe customer not found')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${getBaseUrl()}/dashboard`,
  })

  return session.url
}
