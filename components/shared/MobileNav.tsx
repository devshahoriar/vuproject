'use client'

import { signOut, useSession } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const { data } = useSession()
  const user = data?.user
  const { refresh } = useRouter()
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  useEffect(() => {
    setOpen(false)
  }, [pathName])
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <Menu className="!size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:hidden">
        <SheetHeader className="hidden">
          <SheetTitle>{''}</SheetTitle>
        </SheetHeader>
        <SheetContent>
          <div>
            <Link href="/" className="text-4xl font-bold ">
              Fit<span className="text-primary">Zone</span>
            </Link>
            <div className="flex flex-col mt-36 items-center text-2xl gap-5">
              <ActiveLink href="/" path={path} title="Home" />
              <ActiveLink href="/classes" path={path} title="Classes" />
              <ActiveLink href="/membership" path={path} title="Membership" />
              <ActiveLink href="/about" path={path} title="About" />
              <ActiveLink href="/contact" path={path} title="Contact" />
              {user ? (
                <Button
                  onClick={async () => {
                    await signOut()
                    refresh()
                  }}
                >
                  Log Out
                </Button>
              ) : (
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/join">Join Now</Link>
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
