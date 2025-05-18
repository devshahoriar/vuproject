'use server'

import prisma from '@/prisma/db'
import { UserRole } from '@/prisma/out'
import { revalidatePath } from 'next/cache'

export async function promoteToInstructor(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.INSTRUCTOR }
    })
    
    revalidatePath('/dashboard/members')
    revalidatePath('/dashboard/manage-users')
    return { success: true }
  } catch (error) {
    console.error('Error promoting user to instructor:', error)
    return { success: false, error: 'Failed to promote user to instructor' }
  }
}
