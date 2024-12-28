import ServerImage from '@/components/shared/ServerImage'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import prisma from '@/prisma/db'
import { Calendar, Clock, Users } from 'lucide-react'
import { SearchBox, SelectExType } from './client'



export default async function ClassesPage() {
  const classes = await prisma.class.findMany({
    select: {
      category: { select: { title: true } },
      coverImage: { select: { url: true } },
      desc: true,
      duration: true,
      id: true,
      instructor: {
        select: {
          name: true,
        },
      },
      schedule: true,
      title: true,
      _count: {
        select: {
          students: true,
        },
      },
    },
  })
  const classCat = await prisma.classCategory.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          Class: true,
        },
      },
    },
  })
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Classes</h1>

      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <SearchBox/>
        </div>
        <div className="w-full md:w-1/3">
         <SelectExType classCat={classCat} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map(async (gymClass) => (
          <Card key={gymClass.id}>
            <CardHeader>
              <ServerImage
                src={gymClass.coverImage.url}
                alt={gymClass.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{gymClass.title}</CardTitle>
              <CardDescription>{gymClass.desc}</CardDescription>
              <div className="mt-4 space-y-2">
                <p className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Instructor: {gymClass.instructor.name}
                </p>
                <p className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Duration: {gymClass.duration}
                </p>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p>
                    
                          Schedule:{' '}
                          {gymClass.schedule.split(',').slice(0, 2).join(', ')}
                          ...
                        </p>
                      </TooltipTrigger>
                      <TooltipContent asChild>
                         <p>{gymClass.schedule}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Class</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
