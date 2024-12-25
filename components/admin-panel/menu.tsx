'use client'

import { Ellipsis, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { CollapseMenuButton } from '@/components/admin-panel/collapse-menu-button'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getMenuList } from '@/lib/menu-list'
import { cn } from '@/lib/utils'
import { useRole } from './admin-panel-layout'
import { signOut } from '@/lib/auth-client'


interface MenuProps {
  isOpen: boolean | undefined
}

export function Menu({ isOpen }: MenuProps) {
  const role = useRole((state) => state.role)
  const pathname = usePathname()
  const {replace} = useRouter()
  const menuList = getMenuList(role)

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-3 h-[98%] w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <div className="w-full flex justify-center items-center">
                  <Ellipsis className="h-5 w-5" />
                </div>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(({ href, label, icon: Icon, submenus }, index) =>
                !submenus || submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <Button
                      variant={pathname.endsWith(href) ? 'secondary' : 'ghost'}
                      className="w-full justify-start h-10 mb-1"
                      asChild
                    >
                      <Link href={href}>
                        <span className={cn(isOpen === false ? '' : 'mr-4')}>
                          <Icon size={18} />
                        </span>
                        <p
                          className={cn(
                            'max-w-[200px] truncate',
                            isOpen === false
                              ? '-translate-x-96 opacity-0'
                              : 'translate-x-0 opacity-100'
                          )}
                        >
                          {label}
                        </p>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <Button
               onClick={async () => {
                          await signOut()
                          replace('/')
                        }}
              variant="outline"
              className="w-full justify-center h-10 mt-5"
            >
              <span className={cn(isOpen === false ? '' : 'mr-4')}>
                <LogOut size={18} />
              </span>
              <p
                className={cn(
                  'whitespace-nowrap',
                  isOpen === false ? 'opacity-0 hidden' : 'opacity-100'
                )}
              >
                Sign out
              </p>
            </Button>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  )
}
