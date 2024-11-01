'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({
  href,
  path,
  title,
}: {
  href: string
  path: string
  title: string
}) => {
  return (
    <Link
      href={href}
      className={cn('hover:text-primary', href === path && 'text-primary')}
    >
      {title}
    </Link>
  )
}

const MobileNav = () => {
  const path = usePathname()

  return (
    <div className="flex flex-col mt-36 items-center text-2xl gap-5">
      <ActiveLink href="/" path={path} title="Home" />
      <ActiveLink href="/classes" path={path} title="Classes" />
      <ActiveLink href="/membership" path={path} title="Membership" />
      <ActiveLink href="/about" path={path} title="About" />
      <ActiveLink href="/contact" path={path} title="Contact" />
    </div>
  )
}

export default MobileNav
