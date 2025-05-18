import ProtectedPage from '@/components/shared/ProtectedPage'
import prisma from '@/prisma/db'
import { getLoginUser } from '@/lib/auth-client'
import { headers } from 'next/headers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserRole } from '@/prisma/out'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { MembershipType } from '@/prisma/out'
import InstructorPromote from './promote-instructor'

export const dynamic = 'force-dynamic'

// Get all members (users with role USER)
const getMembers = async () => {
  return prisma.user.findMany({
    where: {
      role: UserRole.USER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      memberships: true,
      createdAt: true,
      suspended: true,
      enrolledClass: {
        select: {
          id: true,
          title: true,
        },
      },
      payments: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
        select: {
          amount: true,
          status: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

const getMembershipBadgeColor = (membership: MembershipType) => {
  switch (membership) {
    case MembershipType.BASIC:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case MembershipType.PRO:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case MembershipType.ELIT:
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}

export default async function MembersPage() {
  const user = await getLoginUser(headers)
  const members = await getMembers()

  return (
    <ProtectedPage
      permission='manage:users'
      title='Members'
      description='View and manage gym members'
    >
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Enrolled Class</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-center h-24 text-muted-foreground'
                >
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage
                          src={member.image || undefined}
                          alt={member.name}
                        />
                        <AvatarFallback>
                          {member.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>{member.name}</div>
                        <div className='text-sm text-muted-foreground'>
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className={getMembershipBadgeColor(member.memberships)}
                    >
                      {member.memberships}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.phone || 'Not provided'}</TableCell>
                  <TableCell>
                    {member.enrolledClass
                      ? member.enrolledClass.title
                      : 'Not enrolled'}
                  </TableCell>
                  <TableCell>
                    {member.createdAt &&
                      formatDistanceToNow(new Date(member.createdAt), {
                        addSuffix: true,
                      })}
                  </TableCell>
                  <TableCell>
                    {member.suspended ? (
                      <Badge variant='destructive'>Suspended</Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300'
                      >
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <InstructorPromote
                      userId={member.id}
                      userName={member.name}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ProtectedPage>
  )
}
