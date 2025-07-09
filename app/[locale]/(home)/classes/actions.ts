'use server'

import { getLoginUser } from '@/lib/auth-client'
import prisma from '@/prisma/db'
import { MembershipType, UserRole } from '@/prisma/out'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'

export async function getUserEnrolledClass() {
  try {
    const user = await getLoginUser(headers)
    
    if (!user) {
      return null
    }
    
    // Get fresh data directly from database
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { 
        enrolledClassId: true,
        role: true,
        memberships: true
      }
    })
    
    return userData
  } catch (error) {
    console.error('Error getting user enrolled class:', error)
    return null
  }
}

export async function joinClass(classId: number) {
  try {
    const user = await getLoginUser(headers)
    
    if (!user) {
      return { success: false, error: 'You must be logged in to join a class' }
    }
    
    // Get fresh user data to ensure membership status is up to date
    const freshUserData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { memberships: true }
    })
    
    // Check if the user has an active membership
    if (!freshUserData || freshUserData.memberships === MembershipType.USER) {
      return { 
        success: false, 
        error: 'You need an active membership to join classes. Please upgrade your membership plan.' 
      }
    }
    
    // Check if the user is already enrolled in another class
    const currentEnrollment = await prisma.user.findUnique({
      where: { id: user.id },
      select: { 
        enrolledClassId: true,
        role: true
      }
    })
    
    // Instructors can't join classes as students
    if (currentEnrollment?.role === UserRole.INSTRUCTOR) {
      return { success: false, error: 'Instructors cannot join classes as students' }
    }
    
    // If user is already enrolled in this class, unenroll them
    if (currentEnrollment?.enrolledClassId === classId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { enrolledClassId: null }
      })
      
      revalidatePath('/classes')
      revalidatePath('/dashboard')
      
      return { success: true, message: 'You have left the class' }
    }
    
    // If enrolled in a different class, switch to the new one
    await prisma.user.update({
      where: { id: user.id },
      data: { enrolledClassId: classId }
    })
    
    revalidatePath('/classes')
    revalidatePath('/dashboard')
    
    return { success: true, message: 'Successfully joined the class' }
  } catch (error) {
    console.error('Error joining class:', error)
    return { success: false, error: 'Failed to join class. Please try again.' }
  }
}
