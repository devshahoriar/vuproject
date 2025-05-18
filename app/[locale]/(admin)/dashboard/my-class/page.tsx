import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLoginUser } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { UserRole } from '@/prisma/out'
import { Clock, Users } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AttendanceTracker from './attendance-tracker'

export const dynamic = 'force-dynamic'

async function getInstructorClasses(userId: string) {
  return prisma.class.findMany({
    where: {
      instructorId: userId
    },
    include: {
      coverImage: true,
      category: true,
      students: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      EquipmentUses: {
        where: {
          startTime: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          },
          endTime: {
            lte: new Date(new Date().setHours(23, 59, 59, 999))
          }
        },
        select: {
          id: true,
          userId: true,
          startTime: true,
          endTime: true
        }
      }
    }
  })
}

export default async function MyClassPage() {
  const user = await getLoginUser(headers)
  
  if (!user || user.role !== UserRole.INSTRUCTOR) {
    return redirect('/dashboard')
  }

  const classes = await getInstructorClasses(user.id)

  return (
    <ContentLayout title="My Classes">
      <div className="grid gap-6">
        {classes.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">You are not teaching any classes yet</h3>
            <p className="text-muted-foreground mt-1">
              Contact an administrator to be assigned to a class
            </p>
          </div>
        ) : (
          classes.map((cls) => (
            <div key={cls.id} className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{cls.title}</CardTitle>
                  <CardDescription>{cls.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.duration} minutes | {cls.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.students.length} enrolled students</span>
                    </div>
                    <div className="mt-2">
                      <img 
                        src={cls.coverImage.url} 
                        alt={cls.title}
                        className="rounded-md h-40 w-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <AttendanceTracker 
                classId={cls.id} 
                students={cls.students} 
                equipmentUses={cls.EquipmentUses} 
              />
            </div>
          ))
        )}
      </div>
    </ContentLayout>
  )
}
