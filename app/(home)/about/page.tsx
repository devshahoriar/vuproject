/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Clock,
  MapPin,
  Users
} from 'lucide-react'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & Head Trainer',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'With over 15 years of experience in fitness and nutrition, John founded FitZone to help people achieve their health goals.',
  },
  {
    name: 'Jane Smith',
    role: 'Yoga Instructor',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Jane is a certified yoga instructor with a passion for helping people find balance in their lives through mindfulness and movement.',
  },
  {
    name: 'Mike Johnson',
    role: 'Strength Coach',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'As a former competitive powerlifter, Mike brings his expertise in strength training to help members build muscle and increase their overall fitness.',
  },
  {
    name: 'Sarah Lee',
    role: 'Nutritionist',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Sarah is a registered dietitian who works with our members to develop personalized nutrition plans that complement their fitness goals.',
  },
]

export default function AboutPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About FitZone</h1>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2010, FitZone began with a simple mission: to create a
              welcoming and inclusive environment where people of all fitness
              levels could achieve their health and wellness goals. Our founder,
              John Doe, recognized the need for a gym that not only provided
              top-notch equipment but also fostered a supportive community.
            </p>
            <p>
              Over the years, we've grown from a small local gym to a thriving
              fitness center, but our core values remain the same. We're
              committed to helping our members transform their lives through
              expert guidance, state-of-the-art facilities, and a motivating
              atmosphere.
            </p>
          </div>
          <div className="order-first md:order-last">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="FitZone Gym Interior"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <Card>
          <CardHeader>
            <CardTitle>Empowering Healthier Lives</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              At FitZone, our mission is to empower individuals to lead
              healthier, more active lives. We believe that fitness is not just
              about physical strength, but also about mental well-being and
              community support. Our goal is to provide a comprehensive approach
              to health and fitness that caters to people of all ages,
              backgrounds, and fitness levels.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              State-of-the-Art Equipment
            </h3>
            <p className="mb-4">
              Our gym is equipped with the latest fitness technology and a wide
              range of equipment to suit all workout styles. From cardio
              machines to free weights, we have everything you need to reach
              your fitness goals.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Cardio Area</li>
              <li>Strength Training Zone</li>
              <li>Functional Fitness Area</li>
              <li>Stretching and Recovery Space</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
            <p className="mb-4">
              We offer a range of amenities to make your workout experience
              comfortable and enjoyable:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Spacious Locker Rooms</li>
              <li>Showers and Changing Areas</li>
              <li>Sauna and Steam Room</li>
              <li>Juice Bar</li>
              <li>Free Parking</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">FitZone Gym</h3>
              <p className="flex items-center mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                123 Fitness Street, Gymville, GY 12345
              </p>
              <p className="flex items-center mb-2">
                <Clock className="w-5 h-5 mr-2" />
                Open 24/7
              </p>
              <p className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                (555) 123-4567
              </p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              Get Directions
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
