'use client'

import { UserRole } from "@/prisma/out"
import { redirect } from "next/navigation"

export type Permission = 
  | 'manage:users'      // Can view and edit all users
  | 'manage:instructors' // Can assign instructor roles  
  | 'manage:equipment'  // Can add/edit equipment
  | 'manage:classes'    // Can create/edit classes
  | 'manage:categories' // Can create/edit class categories
  | 'view:payments'     // Can view all payment history
  | 'track:attendance'  // Can track class attendance
  | 'join:classes'      // Can join classes as a student
  | 'view:own-classes'  // Can view own enrolled/teaching classes

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'manage:users',
    'manage:instructors',
    'manage:equipment',
    'manage:classes',
    'manage:categories',
    'view:payments'
  ],
  INSTRUCTOR: [
    'track:attendance',
    'view:own-classes'
  ],
  USER: [
    'join:classes',
    'view:own-classes'
  ]
}

export function hasPermission(userRole: UserRole | string | null | undefined, permission: Permission): boolean {
  if (!userRole) return false
  
  const role = typeof userRole === 'string' ? userRole as UserRole : userRole
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}

export function withPermission(permission: Permission) {
  return function PermissionGuard({ children, role }: { children: React.ReactNode, role: UserRole | null | undefined }) {
    if (!role || !hasPermission(role, permission)) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You do not have permission to view this page.
          </p>
        </div>
      )
    }

    return <>{children}</>
  }
}

// Server-side permission check
export function checkPermission(userRole: UserRole | string | null | undefined, permission: Permission): boolean {
  return hasPermission(userRole, permission)
}

// Helper function to protect routes on server components
export function protectRoute(userRole: UserRole | string | null | undefined, permission: Permission) {
  if (!hasPermission(userRole, permission)) {
    redirect('/dashboard')
  }
}
