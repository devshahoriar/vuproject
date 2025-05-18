'use server'

import prisma from '@/prisma/db'
import { startOfDay, endOfDay } from 'date-fns'

type AttendanceParams = {
  classId: number
  startDate: Date
  endDate: Date
  studentId?: string
}

// Function to get attendance records for a specific time period
export async function getAttendanceRecords({
  classId,
  startDate,
  endDate,
  studentId
}: AttendanceParams) {
  // Convert dates to ensure we're getting the full day range
  const startDateTime = startOfDay(new Date(startDate))
  const endDateTime = endOfDay(new Date(endDate))
  
  try {
    // Get all equipment uses (attendance records) for the class in the date range
    const equipmentUses = await prisma.equipmentUses.findMany({
      where: {
        classId,
        startTime: {
          gte: startDateTime
        },
        endTime: {
          lte: endDateTime
        },
        ...(studentId ? { userId: studentId } : {})
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })
    
    // Get all enrolled students
    const enrolledStudents = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })
    
    if (!enrolledStudents) {
      return []
    }
    
    // Get a list of dates between startDate and endDate
    const dates: Date[] = []
    let currentDate = new Date(startDateTime)
    
    while (currentDate <= endDateTime) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    // Format the results
    const results = []
    
    for (const date of dates) {
      const dateStart = startOfDay(date)
      const dateEnd = endOfDay(date)
      
      // Filter students based on the studentId parameter
      const studentsToCheck = studentId
        ? enrolledStudents.students.filter(student => student.id === studentId)
        : enrolledStudents.students
      
      for (const student of studentsToCheck) {
        // Check if the student has an attendance record for this date
        const attendanceRecord = equipmentUses.find(
          record => 
            record.userId === student.id && 
            new Date(record.startTime) >= dateStart &&
            new Date(record.endTime) <= dateEnd
        )
        
        results.push({
          id: `${date.toISOString()}-${student.id}`,
          date: date.toISOString(),
          student: {
            id: student.id,
            name: student.name,
            email: student.email,
            image: student.image
          },
          present: !!attendanceRecord,
          startTime: attendanceRecord?.startTime.toISOString() || null,
          endTime: attendanceRecord?.endTime.toISOString() || null,
        })
      }
    }
    
    return results
  } catch (error) {
    console.error('Error fetching attendance records:', error)
    throw new Error('Failed to fetch attendance records')
  }
}
