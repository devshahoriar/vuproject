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
import { useState, useEffect } from 'react'

export const ChangeLanguage = () => {
  const [mounted, setMounted] = useState(false)
  const currentLng = useCurrentLocale()
  const chgLocal = useChangeLocale()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="uppercase">
        EN
        <span className="sr-only">Language</span>
      </Button>
    )
  }

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
  const [mounted, setMounted] = useState(false)
  const path = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || path.endsWith('/join')) {
    return null
  }

  return (
    <Button asChild className="hidden md:block">
      <Link passHref scroll={false} href="/join">
        Join Now
      </Link>
    </Button>
  )
}

export const NavBar = () => {
  const [mounted, setMounted] = useState(false)
  const path = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="hidden md:flex space-x-6 font-medium">
        <Link href="/" className="hover:text-primary">Home</Link>
        <Link href="/classes" className="hover:text-primary">Classes</Link>
        <Link href="/membership" className="hover:text-primary">Membership</Link>
        <Link href="/about" className="hover:text-primary">About</Link>
        <Link href="/contact" className="hover:text-primary">Contact</Link>
      </nav>
    )
  }

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
