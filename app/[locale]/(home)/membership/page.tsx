import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Calendar, Check, Clock, Dumbbell, Users, X } from 'lucide-react'

const membershipPlans = [
  {
    name: 'Basic',
    price: 29,
    duration: 'month',
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
    url: '/plan/basic',
  },
  {
    name: 'Pro',
    price: 49,
    duration: 'month',
    features: [
      'All Basic features',
      'Group fitness classes',
      '2 Guest passes per month',
      '24/7 access',
    ],
    notIncluded: ['Personal training sessions', 'Nutrition consultation'],
    url: '/plan/pro',
  },
  {
    name: 'Elite',
    price: 79,
    duration: 'month',
    features: [
      'All Pro features',
      '2 Personal training sessions/month',
      'Nutrition consultation',
      'Unlimited guest passes',
    ],
    notIncluded: [],
    url: '/plan/elite',
  },
]

export default function MembershipPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Membership Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {membershipPlans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">${plan.price}</span>/
                {plan.duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-400">
                    <X className="w-5 h-5 mr-2 text-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={plan.url}>Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Membership Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Dumbbell className="w-12 h-12 mb-4 text-red-600" />
              <CardTitle>State-of-the-art Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Access to the latest fitness technology and equipment for
                optimal workouts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-12 h-12 mb-4 text-red-600" />
              <CardTitle>Expert Trainers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our certified trainers are here to guide and motivate you every
                step of the way.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="w-12 h-12 mb-4 text-red-600" />
              <CardTitle>Flexible Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With 24/7 access, you can workout on your schedule, any time
                that suits you.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="w-12 h-12 mb-4 text-red-600" />
              <CardTitle>Diverse Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Choose from a wide range of classes to keep your workouts varied
                and exciting.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Membership Comparison</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Feature</TableHead>
              <TableHead>Basic</TableHead>
              <TableHead>Pro</TableHead>
              <TableHead>Elite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Gym Access</TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Group Classes</TableCell>
              <TableCell>
                <X className="w-5 h-5 text-red-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">24/7 Access</TableCell>
              <TableCell>
                <X className="w-5 h-5 text-red-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Personal Training</TableCell>
              <TableCell>
                <X className="w-5 h-5 text-red-500" />
              </TableCell>
              <TableCell>
                <X className="w-5 h-5 text-red-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Nutrition Consultation
              </TableCell>
              <TableCell>
                <X className="w-5 h-5 text-red-500" />
              </TableCell>
              <TableCell>
                <X className="w-5 h-5 text-red-500" />
              </TableCell>
              <TableCell>
                <Check className="w-5 h-5 text-green-500" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Can I cancel my membership at any time?
            </h3>
            <p>
              Yes, you can cancel your membership at any time. However, please
              note that there may be a cancellation fee depending on your
              contract terms.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Are there any joining fees?
            </h3>
            <p>
              We occasionally run promotions with no joining fees. Please check
              with our staff for current offers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Can I freeze my membership?
            </h3>
            <p>
              Yes, you can freeze your membership for a maximum of 3 months per
              year. A small fee may apply.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Do you offer family memberships?
            </h3>
            <p>
              Yes, we offer family memberships with discounted rates. Please
              inquire at the front desk for more information.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
