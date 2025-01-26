import { ContentLayout } from '@/components/admin-panel/content-layout';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getLoginUser, notIsAdmin } from '@/lib/auth-client';
import { getAllCategories } from '@/query/get/category';
import { countClass, getClassWithUserCatIns } from '@/query/get/class';
import { getOnlyInstructor } from '@/query/get/user';
import { School2 } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { ClassForm } from './class-form';

async function getClasses() {
  const [classes, count, categories, instructors] = await Promise.all([
    getClassWithUserCatIns(),
    countClass(),
    getAllCategories(),
    getOnlyInstructor(),
  ])

  return { classes, count, categories, instructors }
}

export default async function ManageClass() {
  const user = await getLoginUser(headers)

  if (notIsAdmin(user)) {
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
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.title}</TableCell>
                <TableCell>
                  <Image
                    src={cls.coverImage.url}
                    alt="cover image"
                    height={100}
                    width={100}
                    className="size-14 object-cover"
                  />
                </TableCell>
                <TableCell>{cls.category.title}</TableCell>
                <TableCell>{cls.instructor.name}</TableCell>
                <TableCell>{cls.duration} min</TableCell>
                <TableCell>{cls.schedule}</TableCell>
                <TableCell>
                  <ClassForm
                    categories={categories}
                    instructors={instructors}
                    initialData={cls} // Pass class data for editing
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </ContentLayout>
  )
}
