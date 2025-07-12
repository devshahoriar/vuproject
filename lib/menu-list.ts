import { UserRole } from '@/prisma/out'
import {
  BadgeDollarSign,
  BookOpen,
  CalendarDays,
  CreditCard,
  Grid2x2Plus,
  Home,
  LayoutGrid,
  LucideIcon,
  School2,
  Settings,
  UserCheck,
  Users,
  Wrench
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
  // Common menu items for all roles
  const commonMenuItems: Menu[] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
      submenus: [],
    },
    {
      href: '/dashboard/equipment-instructions',
      label: 'Equipment Instructions',
      icon: BookOpen,
      submenus: [],
    },
    {
      href: '/',
      label: 'Go to Site',
      icon: Home,
      submenus: [],
    },
  ]

  // Role-specific menu items
  const roleSpecificMenus: Record<UserRole, Menu[]> = {
    // Admin Menu Items
    ADMIN: [
      {
        href: '',
        label: 'Equipment',
        icon: Grid2x2Plus,
        submenus: [
          {
            href: '/dashboard/equpments',
            label: 'Manage Equipment',
          },
          {
            href: '/dashboard/equpments/history',
            label: 'Equipment History',
          },
        ],
      },
      {
        href: '/dashboard/payments',
        label: 'Payments',
        icon: BadgeDollarSign,
      },
      {
        href: '',
        label: 'Classes',
        icon: School2,
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
        label: 'User Management',
        icon: Users,
        submenus: [
          {
            href: '/dashboard/manage-users',
            label: 'All Users',
          },
          
        ],
      },
    ],

    // Instructor Menu Items
    INSTRUCTOR: [
      {
        href: '/dashboard/my-class',
        label: 'My Classes',
        icon: School2,
      },
      {
        href: '/dashboard/attendance',
        label: 'Attendance',
        icon: UserCheck,
      },
      {
        href: '',
        label: 'Equipment',
        icon: Wrench,
        submenus: [
          {
            href: '/dashboard/equpments/report',
            label: 'Report Issue',
          },
          {
            href: '/dashboard/equpments/history',
            label: 'View History',
          },
        ],
      },
    ],

    // Regular User Menu Items
    USER: [
      {
        href: '/dashboard/my-membership',
        label: 'My Membership',
        icon: CreditCard,
      },
      {
        href: '/dashboard/enrolled-classes',
        label: 'My Classes',
        icon: CalendarDays,
      },
      {
        href: '/dashboard/payment-history',
        label: 'Payment History',
        icon: BadgeDollarSign,
      },
    ],
  }

  // Account section visible to all users
  const accountSection: Menu[] = [
    {
      href: '/dashboard/account',
      label: 'Account Settings',
      icon: Settings,
    },
  ]

  return [
    // Common navigation section
    {
      groupLabel: 'Navigation',
      menus: commonMenuItems,
    },
    
    // Role-specific section
    {
      groupLabel: role === UserRole.ADMIN 
        ? 'Administration' 
        : role === UserRole.INSTRUCTOR 
          ? 'Instructor Tools' 
          : 'Member Area',
      menus: roleSpecificMenus[role],
    },
    
    // Account section
    {
      groupLabel: 'Account',
      menus: accountSection,
    },
  ]
}
