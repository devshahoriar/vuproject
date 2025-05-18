import { ContentLayout } from '@/components/admin-panel/content-layout'
import { DashboardOverview } from '@/components/admin-panel/dashboard-overview'
import { getLoginUser } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { UserRole } from '@/prisma/out'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

const DashBoardHomePage = async () => {
  const user = await getLoginUser(headers)

  if (!user) {
    return (
      <ContentLayout title="Dashboard">
        <div>Please log in to view your dashboard</div>
      </ContentLayout>
    )
  }

  // Ensure user.role is treated as a UserRole
  const userRole = (user.role as UserRole) || UserRole.USER
  const stats = await getDashboardStats(userRole, user.id)

  return (
    <ContentLayout title={`Dashboard - ${user.name}`}>
      <DashboardOverview role={userRole} stats={stats} />
    </ContentLayout>
  )
}

async function getDashboardStats(role: UserRole, userId: string) {
  // Common stats for all users
  const baseStats = {}

  if (role === UserRole.ADMIN) {
    // Admin-specific stats
    const [totalMembers, totalInstructors, totalClasses, totalEquipments, totalPayments] = await Promise.all([
      prisma.user.count({ where: { role: UserRole.USER } }),
      prisma.user.count({ where: { role: UserRole.INSTRUCTOR } }),
      prisma.class.count(),
      prisma.equipment.count(),
      prisma.payment.count()
    ])

    return {
      ...baseStats,
      totalMembers,
      totalInstructors,
      totalClasses,
      totalEquipments,
      totalPayments
    }
  } 
  
  if (role === UserRole.INSTRUCTOR) {
    // Instructor-specific stats
    const upcomingClass = await prisma.class.findFirst({
      where: { instructorId: userId },
      select: { id: true, title: true, schedule: true }
    })

    return {
      ...baseStats,
      upcomingClass
    }
  }

  if (role === UserRole.USER) {
    // User-specific stats
    const enrolledClass = await prisma.class.findFirst({
      where: { students: { some: { id: userId } } },
      select: { id: true, title: true, schedule: true }
    })

    return {
      ...baseStats,
      enrolledClass
    }
  }

  return baseStats
}

export default DashBoardHomePage
