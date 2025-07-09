import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(123) 456-7890" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help you?" />
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-red-600" />
                <p>123 Fitness Street, Gymville, GY 12345</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-2 text-red-600" />
                <p>01791665458</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-2 text-red-600" />
                <p>info@fitzone.com</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-2 text-red-600" />
                <p>Open 24/7</p>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Follow Us</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  <Facebook className="w-8 h-8" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  <Twitter className="w-8 h-8" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-red-600">
                  <Instagram className="w-8 h-8" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Our Location</h2>
        <Card>
          <CardHeader>
            <CardTitle>FitZone Gym</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="map h-[600px] w-full rounded-lg pointer-events-none"
                // width="924"
                // height="208"
                // frameBorder="0"
                // scrolling="no"
                // marginHeight="0"
                // marginWidth="0"
                src="https://maps.google.com/?ie=UTF8&t=m&ll=38.841274,-77.0170872&spn=0.003381,0.017231&z=16&output=embed"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-center">
              <Button className="">
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What are your operating hours?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                FitZone is open 24/7, allowing our members to work out at their
                convenience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Do you offer free trials?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Yes, we offer a 3-day free trial for new members. Contact us or
                visit our gym to get started.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do I cancel or freeze my membership?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To cancel or freeze your membership, please visit our front desk
                or contact our customer service team.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
