import MobileNav from '@/components/shared/MobileNav'
import { ModeToggle } from '@/components/shared/ThemeControl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'

const UserPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Fit<span className="text-primary">Zone</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link href="/classes" className="hover:text-gray-300">
                Classes
              </Link>
              <Link href="/membership" className="hover:text-gray-300">
                Membership
              </Link>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/join">Join Now</Link>
              </Button>
              <Sheet>
                <SheetTrigger asChild className='md:hidden'>
                  <Button variant="ghost">
                    <Menu className="!size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className='md:hidden'>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                  </SheetHeader>
                  <SheetDescription>
                    <div>
                      <Link href="/" className="text-4xl font-bold ">
                        Fit<span className="text-primary">Zone</span>
                      </Link>
                      <MobileNav />
                    </div>
                  </SheetDescription>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        {children}
        <footer className="bg-gray-900 text-white py-12">
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
                    <Link href="#" className="hover:text-gray-300">
                      Classes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Membership
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
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
                  <Link href="#" className="hover:text-gray-300">
                    <Facebook className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-gray-300">
                    <Twitter className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="hover:text-gray-300">
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
