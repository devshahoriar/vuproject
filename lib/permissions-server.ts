import { UserRole } from "@/prisma/out"

// Define the Permission type
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

// Define role permissions
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

// Server-side permission check function
export function hasPermissionServer(userRole: UserRole | string | null | undefined, permission: Permission): boolean {
  if (!userRole) return false
  
  const role = typeof userRole === 'string' ? userRole as UserRole : userRole
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}

// Helper function to protect routes on server components
export function protectRouteServer(userRole: UserRole | string | null | undefined, permission: Permission) {
  if (!hasPermissionServer(userRole, permission)) {
    return false
  }
  return true
}
