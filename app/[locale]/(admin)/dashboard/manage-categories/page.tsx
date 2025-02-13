import { ContentLayout } from '@/components/admin-panel/content-layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getLoginUser } from '@/lib/auth-client'
import { getCategoryWithCountOfClass } from '@/query/get/category'
import { UserRole } from '@/prisma/out'
import { headers } from 'next/headers'
import { NewCategoryForm } from './NewCategoryForm'

const ClassCategoryPage = async () => {

  const user = await getLoginUser(headers)

  if (user?.role !== UserRole.ADMIN) {
    return (
      <ContentLayout title="Users">
        <h1>You have not permission this page.</h1>
      </ContentLayout>
    )
  }
  const categories = await getCategoryWithCountOfClass()

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
              <TableHead>Description</TableHead>
              <TableHead>Number of Classes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.desc}</TableCell>
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
