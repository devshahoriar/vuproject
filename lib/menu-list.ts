import {
  Blinds,
  Bookmark,
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

export function getMenuList(role: string): Group[] {
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
        ...(role === 'user'
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
        ...(role === 'admin'
          ? [
              {
                href: '/d/manage-categories',
                label: 'Categories',
                icon: Bookmark,
              },
              {
                href: '/d/manage-class',
                label: 'Manage Class',
                icon: Blinds,
                submenus: [],
              },
              {
                href: '',
                label: 'Users',
                icon: SquarePen,
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
        // {
        //   href: '/users',
        //   label: 'Users',
        //   icon: Users,
        // },
        {
          href: '/d/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ]
}
