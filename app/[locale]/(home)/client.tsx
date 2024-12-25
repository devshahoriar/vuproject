'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ChangeLanguage = () => {
  const currentLng = useCurrentLocale()
  const chgLocal = useChangeLocale()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="uppercase">
          {currentLng}
          <span className="sr-only">{currentLng}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => chgLocal('en')}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => chgLocal('bn')}>BN</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const JoinButton = () => {
  const path = usePathname()
  if (path.endsWith('/join')) return null
  return (
    <Button asChild className="hidden md:block">
      <Link passHref scroll={false} href="/join">
        Join Now
      </Link>
    </Button>
  )
}

export const NavBar = () => {
  const path = usePathname()

  return (
    <nav className="hidden md:flex space-x-6 font-medium">
      <Link
        href="/"
        className={cn('hover:text-primary', { 'text-primary': path === '/' })}
      >
        Home
      </Link>
      <Link
        href="/classes"
        className={cn('hover:text-primary', {
          'text-primary': path === '/classes',
        })}
      >
        Classes
      </Link>
      <Link
        href="/membership"
        className={cn('hover:text-primary', {
          'text-primary': path === '/membership',
        })}
      >
        Membership
      </Link>
      <Link
        href="/about"
        className={cn('hover:text-primary', {
          'text-primary': path === '/about',
        })}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={cn('hover:text-primary', {
          'text-primary': path === '/contact',
        })}
      >
        Contact
      </Link>
    </nav>
  )
}
