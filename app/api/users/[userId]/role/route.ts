import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { UserRole } from '@prisma/client'
import { headers } from 'next/headers'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getSession({
      fetchOptions: {
        headers: await headers(),
      },
    })
    if (!session?.data?.user || session.data.user.role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { role, suspended } = await req.json()

    const userId = (await params).userId

    const upUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        id: true,
      },
    })
    if (
      upUser?.id &&
      upUser.role === UserRole.INSTRUCTOR &&
      role !== UserRole.INSTRUCTOR
    ) {
      const useClassInstructorCount = await prisma.class.count({
        where: {
          instructorId: upUser.id,
        },
      })
      if (useClassInstructorCount > 0) {
        return NextResponse.json(
          {
            error: 'Instructor has classes, please remove classes first',
          },
          { status: 400 }
        )
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
        suspended,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('[USER_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
