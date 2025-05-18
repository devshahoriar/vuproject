import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLoginUser } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { UserRole } from '@/prisma/out'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ClassAttendanceList from './class-attendance-list'

export const dynamic = 'force-dynamic'

async function getInstructorClasses(userId: string) {
  return prisma.class.findMany({
    where: {
      instructorId: userId
    },
    include: {
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

export default async function AttendancePage() {
  const user = await getLoginUser(headers)
  
  if (!user || user.role !== UserRole.INSTRUCTOR) {
    return redirect('/dashboard')
  }

  const classes = await getInstructorClasses(user.id)

  return (
    <ContentLayout title="Attendance Management">
      <div className="grid gap-6">
        {classes.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">You are not teaching any classes yet</h3>
            <p className="text-muted-foreground mt-1">
              Contact an administrator to be assigned to a class
            </p>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Class Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={classes[0].id.toString()}>
                <TabsList className="mb-6">
                  {classes.map((cls) => (
                    <TabsTrigger key={cls.id} value={cls.id.toString()}>
                      {cls.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {classes.map((cls) => (
                  <TabsContent key={cls.id} value={cls.id.toString()}>
                    <ClassAttendanceList 
                      classId={cls.id}
                      className={cls.title} 
                      students={cls.students} 
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </ContentLayout>
  )
}
