import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getLoginUser } from '@/lib/auth-client'
import { Permission } from '@/lib/permissions'
import { hasPermissionServer } from '@/lib/permissions-server'
import { UserRole } from '@/prisma/out'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

interface ProtectedPageProps {
  children: React.ReactNode
  permission: Permission
  title?: string
  description?: string
}

export default async function ProtectedPage({
  children,
  permission,
  title,
  description,
}: ProtectedPageProps) {

  const user = await getLoginUser(headers)
  
  if (!user) {
    redirect('/join?redirect=/dashboard')
  }
  
  if (user?.suspended) {
    redirect('/suspended')
  }

  if (!hasPermissionServer(user.role as UserRole, permission)) {
    return (
      <ContentLayout title={title || "Access Denied"}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Permission Required</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You do not have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <div className="p-6 rounded-lg border border-border bg-primary/5 max-w-md">
            <h3 className="font-semibold mb-2">Required Permission</h3>
            <p className="text-muted-foreground">{permission}</p>
          </div>
        </div>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout title={title || ""} description={description}>
      {children}
    </ContentLayout>
  )
}
