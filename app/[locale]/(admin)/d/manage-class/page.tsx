import { ContentLayout } from '@/components/admin-panel/content-layout'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import prisma from '@/prisma/db'
import { ClassForm } from './class-form'
import { School2 } from 'lucide-react' // Add this import
import { getSession } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { UserRole } from '@prisma/client'

async function getClasses() {
  const [classes, count, categories, instructors] = await Promise.all([
    prisma.class.findMany({
      include: {
        instructor: true,
        category: true,
      },
    }),
    prisma.class.count(),
    prisma.classCategory.findMany(),
    prisma.user.findMany({
      where: { role: 'INSTRUCTOR' },
    }),
  ])
  return { classes, count, categories, instructors }
}

export default async function ManageClass() {
  const { data } = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })
  const user = data?.user

  if (user?.role !== UserRole.ADMIN) {
    return (
      <ContentLayout title="Users">
        <h1>You have not permission this page.</h1>
      </ContentLayout>
    )
  }
  const { classes, count, categories, instructors } = await getClasses()

  return (
    <ContentLayout title="Class">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-muted-foreground">Total Classes: {count}</div>
        <ClassForm categories={categories} instructors={instructors} />
      </div>

      {classes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg dark:border-zinc-500">
          <School2 className="w-12 h-12 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">No Classes Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Get started by creating your first class.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Schedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.title}</TableCell>
                <TableCell>{cls.category.title}</TableCell>
                <TableCell>{cls.instructor.name}</TableCell>
                <TableCell>{cls.duration} min</TableCell>
                <TableCell>{cls.schedule}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </ContentLayout>
  )
}
