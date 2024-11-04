import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Clock, Users } from 'lucide-react'
import Image from 'next/image'

const classCategories = [
  'All Classes',
  'Strength Training',
  'Cardio',
  'Yoga',
  'Pilates',
  'HIIT',
  'Cycling',
]

const gymClasses = [
  {
    id: 1,
    name: 'Power Lifting',
    category: 'Strength Training',
    description:
      'Build strength and power with our intensive weightlifting class.',
    instructor: 'John Doe',
    duration: '60 min',
    schedule: 'Mon, Wed, Fri - 6:00 PM',
    image:
      'https://images.unsplash.com/photo-1533560777802-046814bc297c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=alora-griffiths-XW47yQNE0TQ-unsplash.jpg',
  },
  {
    id: 2,
    name: 'Cardio Blast',
    category: 'Cardio',
    description:
      'High-energy cardio workout to boost your endurance and burn calories.',
    instructor: 'Jane Smith',
    duration: '45 min',
    schedule: 'Tue, Thu - 7:00 AM',
    image:
      'https://images.unsplash.com/photo-1583969430660-b303545eb313?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=logan-weaver-lgnwvr-IXXkrUO2qw0-unsplash.jpg',
  },
  {
    id: 3,
    name: 'Yoga Flow',
    category: 'Yoga',
    description:
      'Find balance and flexibility with our relaxing yoga sessions.',
    instructor: 'Emily Chen',
    duration: '75 min',
    schedule: 'Mon, Wed, Fri - 8:00 AM',
    image:
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=dane-wetton-t1NEMSm1rgI-unsplash.jpg',
  },
  {
    id: 4,
    name: 'Core Pilates',
    category: 'Pilates',
    description:
      'Strengthen your core and improve posture with Pilates exercises.',
    instructor: 'Michael Brown',
    duration: '60 min',
    schedule: 'Tue, Thu - 6:30 PM',
    image:
      'https://images.unsplash.com/photo-1591258370814-01609b341790?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=logan-weaver-lgnwvr-u76Gd0hP5w4-unsplash.jpg',
  },
  {
    id: 5,
    name: 'HIIT Revolution',
    category: 'HIIT',
    description:
      'Intense interval training to maximize calorie burn and improve fitness.',
    instructor: 'Sarah Johnson',
    duration: '30 min',
    schedule: 'Mon, Wed, Fri - 12:00 PM',
    image: 'https://images.unsplash.com/photo-1604900067458-5901533f99cc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=gayatri-malhotra-5obnzS2eOsc-unsplash.jpg',
  },
  {
    id: 6,
    name: 'Spin Cycle',
    category: 'Cycling',
    description: 'High-energy indoor cycling class for all fitness levels.',
    instructor: 'David Lee',
    duration: '45 min',
    schedule: 'Tue, Thu, Sat - 5:30 PM',
    image: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=trust-tru-katsande-A_ftsTh53lM-unsplash.jpg',
  },
]

export default function ClassesPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Classes</h1>

      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Input
            type="text"
            placeholder="Search classes..."
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3 dark:text-black">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {classCategories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gymClasses.map((gymClass) => (
          <Card key={gymClass.id}>
            <CardHeader>
              <Image
                src={gymClass.image}
                alt={gymClass.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{gymClass.name}</CardTitle>
              <CardDescription>{gymClass.description}</CardDescription>
              <div className="mt-4 space-y-2">
                <p className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Instructor: {gymClass.instructor}
                </p>
                <p className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Duration: {gymClass.duration}
                </p>
                <p className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule: {gymClass.schedule}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Book Class
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
