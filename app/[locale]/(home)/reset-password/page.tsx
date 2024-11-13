import { ResetPassWord } from '@/components/page-components/ResetPasswordPageComponent'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import prisma from '@/prisma/db'
import { redirect } from 'next/navigation'

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) => {
  const token = await (await searchParams)?.token
  if (!token) {
    redirect('/forgot-password')
  }
  const findVarification = await prisma.verification.findFirst({
    where: {
      identifier: {
        endsWith: token,
      },
    },
  })

  if (
    !findVarification ||
    new Date(findVarification?.expiresAt as any).getTime() <
      new Date().getTime()
  ) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md  ">
          <CardContent className="w-full max-w-md  dark:text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to FitZone
              </CardTitle>
              <CardDescription className="text-center">
                Reset your account's password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-center text-red-600">
                Password Reset code timeout.
              </h1>
            </CardContent>
          </CardContent>
        </Card>
      </main>
    )
  }

  const userId = findVarification?.value

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
    },
  })
  if (!user) {
    redirect('/forgot-password')
  }
  

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-md  ">
        <CardContent className="w-full max-w-md  dark:text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to FitZone
            </CardTitle>
            <CardDescription className="text-center">
              Reset your account's password.
            </CardDescription>
          </CardHeader>
          <ResetPassWord token={token} email={user?.email}/>
        </CardContent>
      </Card>
    </main>
  )
}

export default ResetPassword
