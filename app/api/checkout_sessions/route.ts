import stripe from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { message: 'Stripe API key is not configured' },
      { status: 500 }
    )
  }

  try {
    const { amount } = await req.json()
    const origin = req.headers.get('origin') || 'http://localhost:3000'

    // Map amount to membership type
    const getMembershipType = (amount: number) => {
      switch (amount) {
        case 2900:
          return 'BASIC'
        case 4900:
          return 'PRO'
        case 7900:
          return 'ELIT'
        default:
          return 'BASIC'
      }
    }

    const membershipType = getMembershipType(amount)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${membershipType} Membership Plan`,
              description: 'Monthly membership subscription',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        membershipType,
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plan/${getMembershipType(amount).toLowerCase()}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const error = err as Error
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
