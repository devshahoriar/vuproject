'use client'

import { Sidebar } from '@/components/admin-panel/sidebar'
import { useSidebar } from '@/hooks/use-sidebar'
import { useStore } from '@/hooks/use-store'
import { cn } from '@/lib/utils'
import { UserRole } from '@prisma/client'
import { create } from 'zustand'
import { useEffect } from 'react'

interface RoleState {
  role: UserRole
  setRole: (role: UserRole) => void
}

export const useRole = create<RoleState>((set) => ({
  role: 'USER' as UserRole,
  setRole: (role: UserRole) => set({ role }),
}))

export default function AdminPanelLayout({
  children,
  role,
}: {
  children: React.ReactNode
  role: UserRole
}) {
  const { setRole } = useRole()
  const sidebar = useStore(useSidebar, (x) => x)

  useEffect(() => {
    setRole(role)
  }, [role])

  if (!sidebar) return null

  const { getOpenState, settings } = sidebar
  
  return (
    <>
      <Sidebar  />
      <main
        className={cn(
          'min-h-[calc(100vh_-_10px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        {children}
      </main>
     
    </>
  )
}
