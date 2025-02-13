import { redirect } from 'next/navigation';
import { getLoginUser } from '@/lib/auth-client';
import prisma from '@/prisma/db';

import { headers } from 'next/headers';
import stripe from '@/lib/stripe';
import { MembershipType } from '@/prisma/out';

async function validatePayment(sessionId: string, userId: string) {
  try {
    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { sessionId },
    });

    if (existingPayment) {
      return existingPayment;
    }

    // Verify stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }
    console.log(session)
    // Record payment in database
    const payment = await prisma.payment.create({
      data: {
        sessionId,
        userId,
        amount: session.amount_total! / 100,
        status: 'success',
        membershipType: (session.metadata?.membershipType as MembershipType) || 'BASIC',
      },
    });

    // Update user membership
    await prisma.user.update({
      where: { id: userId },
      data: { memberships: (session.metadata?.planType as MembershipType) || 'BASIC' },
    });

    return payment;
  } catch (error) {
    console.error('Payment validation error:', error);
    throw error;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const user = await getLoginUser(headers);
  if (!user) redirect('/login');
  const sp = await searchParams;
  const sessionId = sp.session_id as string;
  if (!sessionId) redirect('/');

  try {
    await validatePayment(sessionId, user.id);

    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-8">
          Thank you for your purchase. Your membership has been activated.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Go to Dashboard
        </a>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          Payment Verification Failed
        </h1>
        <p className="text-xl mb-8">
          There was an issue verifying your payment. Please contact support.
        </p>
      </div>
    );
  }
}
