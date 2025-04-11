import { UserRole } from '@/prisma/out'
import {
  Blinds,
  Grid2x2Plus,
  Home,
  LayoutGrid,
  LucideIcon,
  Settings,
  Tag,
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
        {
          href: '/dashboard//equpments',
          label: 'Equpments',
          icon: Grid2x2Plus ,
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
        ...(role === UserRole.ADMIN
          ? [
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
