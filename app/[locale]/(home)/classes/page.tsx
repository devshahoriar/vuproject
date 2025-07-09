import ServerImage from '@/components/shared/ServerImage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import prisma from '@/prisma/db'
import { getLoginUser } from '@/lib/auth-client'
import { Calendar, Clock, Users } from 'lucide-react'
import { headers } from 'next/headers'
import { SearchBox, SelectExType } from './client'
import { JoinClassButton } from './join-class-button'
import { EnrolledBadge } from './enrolled-badge'
import { getUserEnrolledClass } from './actions'

export default async function ClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string; category: string }>
}) {
  const { q, category } = await searchParams
  const currentUser = await getLoginUser(headers)
  
  // Get user enrollment status directly from database to ensure it's up-to-date
  const userEnrollmentData = await getUserEnrolledClass()
  
  const classes = await prisma.class.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: { contains: q, mode: 'insensitive' },
            },
            {
              desc: { contains: q, mode: 'insensitive' },
            },
          ],
        },
        {
          category: {
            title: { contains: category, mode: 'insensitive' },
          },
        },
      ],
    },

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
          <SearchBox />
        </div>
        <div className="w-full md:w-1/3">
          <SelectExType classCat={classCat} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">        {classes.map(async (gymClass) => (
          <Card key={gymClass.id} className="relative">
            <EnrolledBadge isEnrolled={userEnrollmentData?.enrolledClassId === gymClass.id} />
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
                  <p title={
                    gymClass.schedule.split(',').join('\n')
                  } className='whitespace-pre-line'>Schedule: {gymClass.schedule.split(',').slice(0,3).join(',')}...</p>
                </div>
              </div>
            </CardContent>            <CardFooter>
              <JoinClassButton 
                classId={gymClass.id}
                enrolledClassId={userEnrollmentData?.enrolledClassId || null}
                userRole={userEnrollmentData?.role || null}
                membership={userEnrollmentData?.memberships || null}
                isLoggedIn={!!currentUser}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
