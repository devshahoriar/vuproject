'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, USER } from '@/lib/auth-client'

import { LayoutGrid, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LayOutUserAvater = ({
  name,
  image,
  email,
}: {
  name: string
  image: string | undefined | any
  email: string
}) => {
  const { refresh } = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='relative h-8 w-8 rounded-full'>
          <Avatar>
            <AvatarImage src={image as string} />
            <AvatarFallback>{name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='hover:cursor-pointer' asChild>
            <Link href='/dashboard' className='flex items-center'>
              <LayoutGrid className='w-4 h-4 mr-3 text-muted-foreground' />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer' asChild>
            <Link href='/dashboard/account' className='flex items-center'>
              <User className='w-4 h-4 mr-3 text-muted-foreground' />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={async () => {
            await signOut()
            refresh()
          }}
        >
          <LogOut className='w-4 h-4 mr-3 text-muted-foreground' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LayOutUserAvater
