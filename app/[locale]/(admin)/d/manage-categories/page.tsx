import { ContentLayout } from '@/components/admin-panel/content-layout'
import prisma from '@/prisma/db'
import { NewCategoryForm } from './NewCategoryForm'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { UserRole } from '@prisma/client'

const ClassCategoryPage = async () => {
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
  const categories = await prisma.classCategory.findMany({
    include: {
      _count: {
        select: {
          Class: true,
        },
      },
    },
  })

  return (
    <ContentLayout title="Class Categories">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <p>Total Categories: {categories.length}</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-500">
              Warning: Categories cannot be removed once created.
            </p>
          </div>
          <NewCategoryForm />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Number of Classes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category._count.Class}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  )
}

export default ClassCategoryPage
