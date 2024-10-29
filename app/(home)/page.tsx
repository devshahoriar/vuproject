/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button'
import { Clock, Dumbbell, Users } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transform Your Body, Transform Your Life
            </h1>
            <p className="text-xl mb-6">
              Join FitZone and start your fitness journey today. Expert
              trainers, state-of-the-art equipment, and a supportive community
              await you.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
              Get Started
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src='https://images.unsplash.com/photo-1614928228253-dc09cbc3b11c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=sam-moghadam-khamseh-vOZP2LojrHI-unsplash.jpg&w=2400'
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
      <section className="bg-gray-100 py-20 dark:text-black">
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
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Choose Plan
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-red-600">
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">
                $49<span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-6">
                <li className="mb-2">✓ All Basic features</li>
                <li className="mb-2">✓ Group fitness classes</li>
                <li className="mb-2">✓ Personalized workout plan</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Choose Plan
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
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Choose Plan
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
              <Image
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=christian-buehner-DItYlc26zVI-unsplash.jpg"
                alt="Sarah J."
                width={100}
                height={100}
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
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8">
            Join FitZone today and get your first month at 50% off!
          </p>
          <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
            Sign Up Now
          </Button>
        </div>
      </section>
    </main>
  )
}
