import { UserRole } from '@/prisma/out'
import {
  BadgeDollarSign,
  Blinds,
  Grid2x2Plus,
  Home,
  LayoutGrid,
  LucideIcon,
  Settings,
  Users,
} from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(role: UserRole): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/',
          label: 'Go to Site',
          icon: Home,
          submenus: [],
        },
        ...(role === UserRole.USER
          ? [
              {
                href: '/admin',
                label: 'Admin Panel',
                icon: Settings,
                submenus: [],
              },
            ]
          : []),
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        // only user can see this menu
        ...(role === UserRole.USER
          ? [
              {
                href: '/admin',
                label: 'Admin Panel',
                icon: Settings,
                submenus: [],
              },
            ]
          : []),

        // only admin can see this menu
        ...(role === UserRole.ADMIN
          ? [
              {
                href: '/dashboard/equpments',
                label: 'Equipments',
                icon: Grid2x2Plus,
              },
              {
                href: '/dashboard/payments',
                label: 'Payments',
                icon: BadgeDollarSign,
              },
              {
                href: '',
                label: 'Class',
                icon: Blinds,
                submenus: [
                  {
                    href: '/dashboard/manage-categories',
                    label: 'Categories',
                  },
                  {
                    href: '/dashboard/manage-class',
                    label: 'Classes',
                  },
                ],
              },
              {
                href: '',
                label: 'Users',
                icon: Users,
                submenus: [
                  {
                    href: '/dashboard/manage-users',
                    label: 'Manage Users',
                  },
                ],
              },
            ]
          : []),
      ],
    },

    //all user can see this menu
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ]
}
