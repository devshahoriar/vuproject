import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'
import SignInRequeredPage from '@/components/shared/SignInRequered'
import { getSession } from '@/lib/auth-client'
import { UserRole } from '@prisma/client'
import { headers } from 'next/headers'
import React from 'react'

const DashBoardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data } = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })
  if (!data) {
    return <SignInRequeredPage />
  }
  const { user } = data
  
  return <AdminPanelLayout role={user?.role as UserRole}>{children}</AdminPanelLayout>
}

export default DashBoardLayout
