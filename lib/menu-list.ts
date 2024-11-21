import { UserRole } from '@prisma/client'
import {
  Blinds,
  Home,
  LayoutGrid,
  LucideIcon,
  Settings,
  SquarePen,
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
          href: '/d',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/',
          label: 'Home',
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
          href: '',
          label: 'posts',
          icon: SquarePen,
          submenus: [
            {
              href: '/posts',
              label: 'All Posts',
            },
            {
              href: '/posts/new',
              label: 'New Post',
            },
          ],
        },

        {
          href: '/tags',
          label: 'Tags',
          icon: Tag,
        },
        ...(role === UserRole.ADMIN
          ? [
              {
                href: '',
                label: 'Class',
                icon: Blinds,
                submenus: [
                  {
                    href: '/d/manage-categories',
                    label: 'Categories',
                  },
                  {
                    href: '/d/manage-class',
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
                    href: '/d/manage-users',
                    label: 'Manage Users',
                  },
                ],
              },
            ]
          : []),
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/d/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ]
}
