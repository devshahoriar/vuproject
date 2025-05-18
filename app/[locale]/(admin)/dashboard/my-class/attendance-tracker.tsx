'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { markAttendance } from './actions'
import { ScrollArea } from '@/components/ui/scroll-area'

type AttendanceProps = {
  classId: number
  students: {
    id: string
    name: string
    email: string
    image: string | null
  }[]
  equipmentUses: {
    id: number
    userId: string
    startTime: Date
    endTime: Date
  }[]
}

export default function AttendanceTracker({ classId, students, equipmentUses }: AttendanceProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    equipmentUses.reduce((acc, curr) => {
      acc[curr.userId] = true
      return acc
    }, {} as Record<string, boolean>)
  )

  const handleAttendance = async (studentId: string, present: boolean) => {
    try {
      setLoading(studentId)
      await markAttendance({
        classId,
        userId: studentId,
        present
      })
      
      setAttendance(prev => ({
        ...prev,
        [studentId]: present
      }))
      
      toast.success(`Attendance ${present ? 'marked' : 'removed'} successfully`)
    } catch (error) {
      toast.error('Failed to update attendance')
      console.error(error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {students.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No students enrolled in this class</p>
            ) : (
              students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {student.image ? (
                        <img src={student.image} alt={student.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg font-semibold">{student.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant={attendance[student.id] ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleAttendance(student.id, true)}
                      disabled={loading === student.id}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Present
                    </Button>
                    <Button 
                      variant={attendance[student.id] ? "outline" : "destructive"} 
                      size="sm"
                      onClick={() => handleAttendance(student.id, false)}
                      disabled={loading === student.id}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
