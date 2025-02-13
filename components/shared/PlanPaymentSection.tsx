'use client'

import { CardFooter } from '@/components/ui/card'
import PaymentButton from './PaymentButton'

interface PlanPaymentSectionProps {
  amount: number
}

export default function PlanPaymentSection({ amount }: PlanPaymentSectionProps) {
  const handleError = (error: string) => {
    console.error(error)
    // Add any error handling UI logic here
  }

  return (
    <CardFooter>
      <PaymentButton 
        amount={amount}
        className="w-full bg-red-600 hover:bg-red-700"
        onError={handleError}
      />
    </CardFooter>
  )
}
