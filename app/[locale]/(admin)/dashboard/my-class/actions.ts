'use server'

import prisma from '@/prisma/db'
import { revalidatePath } from 'next/cache'

// Action to mark student attendance
export async function markAttendance({
  classId,
  userId,
  present
}: {
  classId: number
  userId: string
  present: boolean
}) {
  try {
    // Get current date with time set to beginning of class
    const today = new Date()
    const startTime = new Date(today.setHours(0, 0, 0, 0))
    const endTime = new Date(today.setHours(23, 59, 59, 999))
    
    // Check if there's already an attendance record for today
    const existingRecord = await prisma.equipmentUses.findFirst({
      where: {
        classId,
        userId,
        startTime: {
          gte: startTime
        },
        endTime: {
          lte: endTime
        }
      }
    })
    
    if (present) {
      // If present and no record exists, create one
      if (!existingRecord) {
        // Get the equipment with ID 1 (assuming a default equipment) or any equipment
        const equipment = await prisma.equipment.findFirst({
          where: { active: true }
        })
        
        if (!equipment) {
          throw new Error("No active equipment found")
        }
        
        await prisma.equipmentUses.create({
          data: {
            equipmentId: equipment.id,
            userId,
            classId,
            startTime,
            endTime,
            remarks: 'Attendance marked by instructor'
          }
        })
      }
    } else {
      // If marked as absent and record exists, delete it
      if (existingRecord) {
        await prisma.equipmentUses.delete({
          where: {
            id: existingRecord.id
          }
        })
      }
    }
    
    revalidatePath(`/dashboard/my-class/${classId}`)
    return { success: true }
  } catch (error) {
    console.error('Error marking attendance:', error)
    return { success: false, error }
  }
}
