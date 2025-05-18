import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRole } from "@/prisma/out"
import { 
  CalendarIcon, 
  DumbbellIcon, 
  LineChart, 
  ShieldIcon, 
  UsersIcon, 
  ClipboardCheckIcon,
  BadgeDollarSign 
} from "lucide-react"
import Link from "next/link"
import { WelcomeBanner } from "./welcome-banner"

interface DashboardOverviewProps {
  role: UserRole
  stats: {
    totalMembers?: number
    totalInstructors?: number
    totalClasses?: number
    totalEquipments?: number
    totalPayments?: number
    upcomingClass?: {
      title: string
      schedule: string
      id: number
    } | null
    enrolledClass?: {
      title: string
      schedule: string
      id: number
    } | null
  }
  userName?: string
}

export function DashboardOverview({ role, stats, userName = "User" }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      <WelcomeBanner role={role} userName={userName} />
      
      {/* Admin Dashboard */}
      {role === UserRole.ADMIN && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stats.totalMembers}</div>
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Link href="/dashboard/manage-users" className="text-primary hover:underline">
                    View all members
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stats.totalInstructors}</div>
                  <ShieldIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Link href="/dashboard/manage-users" className="text-primary hover:underline">
                    Manage instructors
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stats.totalClasses}</div>
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Link href="/dashboard/manage-class" className="text-primary hover:underline">
                    Manage classes
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stats.totalPayments}</div>
                  <BadgeDollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <Link href="/dashboard/payments" className="text-primary hover:underline">
                    View payment history
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="h-[300px]">
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>New member registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <LineChart className="h-32 w-32 text-muted-foreground" />
                <p className="text-muted-foreground">Chart visualization would go here</p>
              </CardContent>
            </Card>
            
            <Card className="h-[300px]">
              <CardHeader>
                <CardTitle>Equipment Status</CardTitle>
                <CardDescription>Currently active equipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span>Total Equipment</span>
                    <span className="font-medium">{stats.totalEquipments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Equipment</span>
                    <span className="font-medium">{stats.totalEquipments}</span>
                  </div>
                  <Link href="/dashboard/equpments" className="text-primary hover:underline text-sm">
                    Manage equipment inventory
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {/* Instructor Dashboard */}
      {role === UserRole.INSTRUCTOR && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">
                    {stats.upcomingClass ? (
                      <div className="grid gap-1">
                        <div>{stats.upcomingClass.title}</div>
                        <div className="text-xs text-muted-foreground">{stats.upcomingClass.schedule}</div>
                      </div>
                    ) : (
                      "No classes scheduled"
                    )}
                  </div>
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  <Link href="/dashboard/my-class" className="text-primary hover:underline">
                    View all classes
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Attendance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">Mark Attendance</div>
                  <ClipboardCheckIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  <Link href="/dashboard/my-class" className="text-primary hover:underline">
                    Update class attendance
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Equipment Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium">Check Availability</div>
                  <DumbbellIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  <Link href="/dashboard/equpments" className="text-primary hover:underline">
                    View equipment
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {/* User Dashboard */}
      {role === UserRole.USER && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bold">Basic</div>
                  <div className="text-sm text-muted-foreground">Expires on: Dec 31, 2025</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    <Link href="/membership" className="text-primary hover:underline">
                      Upgrade membership
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">My Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {stats.enrolledClass ? (
                    <>
                      <div className="text-xl font-bold">{stats.enrolledClass.title}</div>
                      <div className="text-sm text-muted-foreground">{stats.enrolledClass.schedule}</div>
                    </>
                  ) : (
                    <div className="text-xl font-medium">Not enrolled in any class</div>
                  )}
                  <div className="text-xs text-muted-foreground mt-2">
                    <Link href="/classes" className="text-primary hover:underline">
                      Browse classes
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bold">Last Payment</div>
                  <div className="text-sm text-muted-foreground">$29 - Basic Membership</div>
                  <div className="text-xs text-muted-foreground">May 1, 2025</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
