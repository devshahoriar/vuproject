import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getLoginUser, notIsAdmin, USER } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { countUser, getAllUser } from '@/query/get/user'
import { UserRole } from '@/prisma/out'
import { GraduationCap, Shield, Users } from 'lucide-react'
import { headers } from 'next/headers'
import { UsersTable } from './client'


const ManageUser = async () => {

  const user = await getLoginUser(headers) as USER

  if (notIsAdmin(user)) {
    return (
      <ContentLayout title="Users">
        <h1>You have not permission this page.</h1>
      </ContentLayout>
    )
  }

  const [totalUser, adminCount, instructorCount, users] = await Promise.all([
    countUser(),
    prisma.user.count({ where: { role: UserRole.ADMIN } }),
    prisma.user.count({ where: { role: UserRole.INSTRUCTOR } }),
    getAllUser(),
  ])

  return (
    <ContentLayout title="Users">
      <div className="bg-background py-6 px-4 rounded-md w-full">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Users</div>
                <div className="text-2xl font-bold text-primary mt-1">
                  {totalUser}
                </div>
              </div>
              <Users className="h-8 w-8 text-primary/50" />
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Admins</div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {adminCount}
                </div>
              </div>
              <Shield className="h-8 w-8 text-emerald-500/50" />
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Instructors</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {instructorCount}
                </div>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-500/50" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <UsersTable users={users} currentUserId={user.id} />
        </div>
      </div>
    </ContentLayout>
  )
}

export default ManageUser
