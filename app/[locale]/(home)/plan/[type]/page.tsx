import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const plans = {
  basic: {
    name: 'Basic',
    price: 29,
    duration: 'month',
    description: 'Perfect for beginners and casual gym-goers.',
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Free WiFi',
      '1 Guest pass per month',
    ],
    notIncluded: [
      'Group fitness classes',
      'Personal training sessions',
      'Nutrition consultation',
      '24/7 access',
    ],
  },
  pro: {
    name: 'Pro',
    price: 49,
    duration: 'month',
    description: 'Ideal for regular gym enthusiasts looking for more features.',
    features: [
      'All Basic features',
      'Group fitness classes',
      '2 Guest passes per month',
      '24/7 access',
    ],
    notIncluded: ['Personal training sessions', 'Nutrition consultation'],
  },
  elite: {
    name: 'Elite',
    price: 79,
    duration: 'month',
    description: 'The ultimate fitness experience for dedicated athletes.',
    features: [
      'All Pro features',
      '2 Personal training sessions/month',
      'Nutrition consultation',
      'Unlimited guest passes',
    ],
    notIncluded: [],
  },
}

export default async function PlanDetails({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const planType = (await params).type.toLowerCase()
  console.log(planType)
  const plan = plans[planType as keyof typeof plans]

  if (!plan) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">{plan.name} Plan Details</h1>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{plan.name}</CardTitle>
            <CardDescription className="text-xl">
              ${plan.price}/{plan.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{plan.description}</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {plan.notIncluded.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Not Included:</h3>
                  <ul className="space-y-2">
                    {plan.notIncluded.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-500"
                      >
                        <X className="w-5 h-5 mr-2 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Choose {plan.name} Plan
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/membership" className="text-blue-600 hover:underline">
            Compare all plans
          </Link>
        </div>
      </main>
    </div>
  )
}
