import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
import { notFound } from 'next/navigation'
import PaymentButton from '@/components/shared/PaymentButton'
import PlanPaymentSection from '@/components/shared/PlanPaymentSection'

interface PlanDetails {
  name: string
  price: number
  duration: string
  description: string
  features: string[]
  notIncluded: string[]
  faq: { question: string; answer: string }[]
}

const plans: Record<string, PlanDetails> = {
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
    faq: [
      {
        question: 'What equipment is available with the Basic plan?',
        answer:
          'The Basic plan provides access to all standard gym equipment, including cardio machines, free weights, and strength training machines.',
      },
      {
        question: 'Can I bring a friend with the Basic plan?',
        answer:
          'Yes, you get 1 guest pass per month with the Basic plan. Additional guest passes can be purchased separately.',
      },
      {
        question: 'Are there any time restrictions for gym access?',
        answer:
          'The Basic plan allows access during regular gym hours. For 24/7 access, consider upgrading to our Pro or Elite plans.',
      },
    ],
  },
  pro: {
    name: 'Pro',
    price: 49,
    duration: 'month',
    description: 'Ideal for regular gym enthusiasts looking for more features.',
    features: [
      'Group fitness classes',
      'Personal training sessions',
      'Nutrition consultation',
      '24/7 access',
      'Group fitness classes',
      '2 Guest passes per month',
      '24/7 access',
    ],
    notIncluded: ['Personal training sessions', 'Nutrition consultation'],
    faq: [
      {
        question: 'What types of group fitness classes are included?',
        answer:
          'The Pro plan includes access to all our group fitness classes, such as yoga, spinning, HIIT, and more. Check our class schedule for details.',
      },
      {
        question: 'How does 24/7 access work?',
        answer:
          "With the Pro plan, you'll receive a special key fob that allows you to enter the gym at any time, day or night.",
      },
      {
        question: 'Can I freeze my Pro membership?',
        answer:
          'Yes, Pro members can freeze their membership for up to 3 months per year. A small fee may apply.',
      },
    ],
  },
  elite: {
    name: 'Elite',
    price: 79,
    duration: 'month',
    description: 'The ultimate fitness experience for dedicated athletes.',
    features: [
      'Group fitness classes',
      'Personal training sessions',
      'Nutrition consultation',
      '24/7 access',
      'Group fitness classes',
      '2 Guest passes per month',
      '24/7 access',
      '2 Personal training sessions/month',
      'Nutrition consultation',
      'Unlimited guest passes',
    ],
    notIncluded: [],
    faq: [
      {
        question: 'How do I schedule my personal training sessions?',
        answer:
          'As an Elite member, you can schedule your 2 monthly personal training sessions through our app or at the front desk.',
      },
      {
        question: 'What does the nutrition consultation include?',
        answer:
          'The nutrition consultation includes a one-on-one session with our certified nutritionist to create a personalized meal plan tailored to your fitness goals.',
      },
      {
        question:
          'Are there any limitations on guest passes for Elite members?',
        answer:
          'Elite members enjoy unlimited guest passes. However, the same guest can only visit up to 3 times per month.',
      },
    ],
  },
}
export default async function PlanDetails({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const planType = (await params).type.toLowerCase()
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
          <PlanPaymentSection amount={plan.price} />
        </Card>

        <section className="mt-12 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {plan.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  )
}
