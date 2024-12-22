import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'
import SignInRequeredPage from '@/components/shared/SignInRequered'
import { getLoginUser } from '@/lib/auth-client'
import { UserRole } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const DashBoardLayout = async ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const user = await getLoginUser(headers)
  if (user?.suspended) {
    return redirect('/suspended')
  }
  if (!user) {
    return <SignInRequeredPage />
  }

  return (
    <AdminPanelLayout role={user?.role as UserRole}>
      {children}
    </AdminPanelLayout>
  )
}

export default DashBoardLayout
