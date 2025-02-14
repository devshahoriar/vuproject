import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getLoginUser } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { headers } from 'next/headers'
import { AccountForm } from './account-form'
import { MembershipList } from './membership-list'

const AccountPage = async () => {
  const user = (await getLoginUser(headers)) as any
  const userphone = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      phone: true,
    },
  })
  user.phone = userphone?.phone
  const membership = await prisma.payment.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <ContentLayout title="Account Settings">
      <div className="py-6">
        <AccountForm user={user} />
        <MembershipList memberships={membership} />
      </div>
    </ContentLayout>
  )
}

export default AccountPage
