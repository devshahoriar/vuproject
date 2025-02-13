"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentButtonProps {
  amount: number; // Make amount required
  productId?: string;
  className?: string;
  onError?: (error: string) => void;
}

export default function PaymentButton({ 
  amount, 
  productId, 
  className,
  onError 
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      onError?.('Amount is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: Math.round(amount * 100),
          productId 
        }),
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Payment request failed');
      }

      window.location.href = data.url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      console.error('Payment error:', errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handlePayment}>
      <Button
        type="submit"
        disabled={isLoading}
        className={`payment-button ${className || ''}`}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>

     
    </form>
  );
}
