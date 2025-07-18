/* eslint-disable react/no-unescaped-entities */

import ServerImage from '@/components/shared/ServerImage'
import { Button } from '@/components/ui/button'
import { getLoginUser } from '@/lib/auth-client'
import { getScopedI18n } from '@/locales/server'
import { Clock, Dumbbell, Users } from 'lucide-react'
import { headers } from 'next/headers'

import Link from 'next/link'

export default async function HomePage() {
  const t = await getScopedI18n('home')
  const user = await getLoginUser(headers)

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('bannerSlogan')}
            </h1>
            <p className="text-xl mb-6">{t('sloganSub')}</p>
            <Button className="text-lg px-8 py-3" asChild>
              <a href="#membership">Get Started</a>
            </Button>
          </div>
          <div className="md:w-1/2">
            <ServerImage
              src="/imgs/home.jpg"
              alt="Gym Interior"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose FitZone?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">
                State-of-the-art Equipment
              </h3>
              <p>
                Access to the latest fitness technology and equipment for
                optimal workouts.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p>
                Our certified trainers are here to guide and motivate you every
                step of the way.
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p>
                Workout on your schedule with our round-the-clock gym access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="bg-gray-100 py-20 dark:text-black" id="membership">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Membership Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-4">
                $29<span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-6">
                <li className="mb-2">✓ Access to gym equipment</li>
                <li className="mb-2">✓ Locker room access</li>
                <li className="mb-2">✓ Free WiFi</li>
              </ul>
              <Button className="w-full" asChild>
                <Link href={user ? '/plan/basic' : '/join?redirect=/plan/basic'}>Choose Plan</Link>
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-primary">
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">
                $49<span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-6">
                <li className="mb-2">✓ All Basic features</li>
                <li className="mb-2">✓ Group fitness classes</li>
                <li className="mb-2">✓ Personalized workout plan</li>
              </ul>
              <Button className="w-full" asChild>
                <Link href={user ? '/plan/pro' : '/join?redirect=/plan/pro'}>Choose Plan</Link>
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Elite</h3>
              <p className="text-4xl font-bold mb-4">
                $79<span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-6">
                <li className="mb-2">✓ All Pro features</li>
                <li className="mb-2">✓ Personal training sessions</li>
                <li className="mb-2">✓ Nutrition consultation</li>
              </ul>
              <Button className="w-full" asChild>
                <Link href={user ? '/plan/elite' : '/join?redirect=/plan/elite'}>Choose Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 dark:text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            What Our Members Say
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl italic mb-4">
              "FitZone has completely transformed my life. The trainers are
              amazing, the equipment is top-notch, and the community is so
              supportive. I've never felt better!"
            </p>
            <div className="flex items-center">
              <ServerImage
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=christian-buehner-DItYlc26zVI-unsplash.jpg"
                alt="Sarah J."
                width={100}
                height={100}
                // placeholder='blur'
                className="rounded-full mr-4 object-cover aspect-square size-14"
              />
              <div>
                <p className="font-semibold">Sarah J.</p>
                <p className="text-gray-600">Member since 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8">
            Join FitZone today and get your first month at 50% off!
          </p>
          <Button
            asChild
            className="bg-white hover:bg-gray-100 text-lg px-8 py-3 text-black dark:text-black"
          >
            <Link href={user ? '/membership' : '/join'}>
              {user ? 'Get Membership' : 'Sign Up Now'}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
