import MobileNav from '@/components/shared/MobileNav'
import { ModeToggle } from '@/components/shared/ThemeControl'

import LayOutUserAvater from '@/components/shared/LayOutUserAvater'
import { getLoginUser } from '@/lib/auth-client'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { ChangeLanguage, JoinButton, NavBar } from './client'

const UserPageLayout = async (
  props: Readonly<{
    children: React.ReactNode
    modal?: React.ReactNode
  }>
) => {
  const user = await getLoginUser(headers)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-background">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Fit<span className="text-primary">Zone</span>
            </Link>
            <NavBar />
            <div className="flex items-center gap-2">
              <ChangeLanguage />
              <ModeToggle />
              {user ? (
                <>
                  <LayOutUserAvater
                    email={user.email}
                    image={user.image}
                    name={user?.name}
                  />
                </>
              ) : (
                <JoinButton />
              )}

              <MobileNav />
            </div>
          </div>
        </header>
        
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
                    
                    <Phone className="w-5 h-5 mr-2" /> 
                    01791665458
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
                &copy; 2024 FitZone. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default UserPageLayout
