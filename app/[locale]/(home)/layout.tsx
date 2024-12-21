import MobileNav from '@/components/shared/MobileNav'
import { ModeToggle } from '@/components/shared/ThemeControl'
import { Button } from '@/components/ui/button'

import LayOutUserAvater from '@/components/shared/LayOutUserAvater'
import { getSession } from '@/lib/auth-client'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

const UserPageLayout = async (
  props: Readonly<{
    children: React.ReactNode
    modal?: React.ReactNode
  }>
) => {
  const { data } = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })
  const user = data?.user

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-background">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Fit<span className="text-primary">Zone</span>
            </Link>
            <nav className="hidden md:flex space-x-6 font-medium">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/classes" className="hover:text-primary">
                Classes
              </Link>
              <Link href="/membership" className="hover:text-primary">
                Membership
              </Link>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              {user ? (
                <>
                  <LayOutUserAvater user={user} />
                </>
              ) : (
                <Button asChild className=" hidden md:block">
                  <Link passHref scroll={false} href="/join">
                    Join Now
                  </Link>
                </Button>
              )}

              <MobileNav />
            </div>
          </div>
        </header>
        <div id="modal-root" />
        {props.children}
        {props.modal}
        <footer className="bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">FitZone</h3>
                <p>Transforming lives through fitness since 2010.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Classes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Membership
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <address className="not-italic">
                  <p className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2" /> 123 Fitness Street,
                    Gymville, GY 12345
                  </p>
                  <p className="flex items-center mb-2">
                    <Phone className="w-5 h-5 mr-2" /> (555) 123-4567
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" /> info@fitzone.com
                  </p>
                </address>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="hover:text-primary">
                    <Facebook className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-primary">
                    <Twitter className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-primary">
                    <Instagram className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} FitZone. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default UserPageLayout
