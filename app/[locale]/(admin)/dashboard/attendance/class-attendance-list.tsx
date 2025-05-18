'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { getAttendanceRecords } from './actions'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AttendanceStatusBadge from './attendance-status-badge'

type Student = {
  id: string
  name: string
  email: string
  image: string | null
}

type ClassAttendanceListProps = {
  classId: number
  className: string
  students: Student[]
}

export default function ClassAttendanceList({ classId, className, students }: ClassAttendanceListProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })
  const [loading, setLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | 'all'>('all')
  const [attendanceData, setAttendanceData] = useState<any[]>([])

  const handleFetchAttendance = async () => {
    if (!date?.from) return
    
    setLoading(true)
    try {
      const results = await getAttendanceRecords({
        classId,
        startDate: date.from,
        endDate: date.to || date.from,
        studentId: selectedStudent === 'all' ? undefined : selectedStudent,
      })
      
      setAttendanceData(results)
    } catch (error) {
      console.error('Failed to fetch attendance records', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Date Range Selector */}
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Student Selector */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[200px]">
                {selectedStudent === 'all' 
                  ? 'All Students' 
                  : students.find(s => s.id === selectedStudent)?.name || 'Select Student'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedStudent('all')}>
                All Students
              </DropdownMenuItem>
              {students.map((student) => (
                <DropdownMenuItem 
                  key={student.id} 
                  onClick={() => setSelectedStudent(student.id)}
                >
                  {student.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Apply Button */}
        <Button 
          onClick={handleFetchAttendance}
          disabled={loading || !date?.from}
        >
          {loading ? 'Loading...' : 'View Attendance'}
        </Button>
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Attendance Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  {loading ? 'Loading records...' : 'No attendance records found for the selected criteria'}
                </TableCell>
              </TableRow>
            ) : (
              attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{format(new Date(record.date), 'PPP')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {record.student.image ? (
                          <img src={record.student.image} alt={record.student.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-sm font-semibold">{record.student.name.charAt(0)}</span>
                        )}
                      </div>
                      <span>{record.student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AttendanceStatusBadge status={record.present} />
                  </TableCell>
                  <TableCell>
                    {record.present 
                      ? format(new Date(record.startTime), 'h:mm a') 
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
