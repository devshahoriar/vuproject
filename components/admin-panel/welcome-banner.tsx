'use client'

import { Card, CardContent } from "@/components/ui/card"
import { UserRole } from "@/prisma/out"

interface WelcomeBannerProps {
  role: UserRole
  userName: string
}

export function WelcomeBanner({ role, userName }: WelcomeBannerProps) {
  const getRoleBasedMessage = () => {
    switch (role) {
      case UserRole.ADMIN:
        return {
          greeting: `Welcome back, ${userName}!`,
          message: "Manage gym operations, memberships, classes, and equipment from your admin dashboard.",
          tips: "Quick tips: Check the payments section to view recent transactions, or add new instructors from the User Management menu."
        }
      case UserRole.INSTRUCTOR:
        return {
          greeting: `Welcome, Instructor ${userName}!`,
          message: "Check your class schedule and manage attendance for your students.",
          tips: "Quick tips: Use the 'My Classes' section to view your upcoming classes and record attendance."
        }
      case UserRole.USER:
        return {
          greeting: `Hello, ${userName}!`,
          message: "Track your membership, join classes, and see your payment history.",
          tips: "Quick tips: Browse available classes or upgrade your membership plan through the panel on the left."
        }
      default:
        return {
          greeting: `Hello, ${userName}!`,
          message: "Welcome to the gym management system.",
          tips: "Use the menu on the left to navigate through the system."
        }
    }
  }

  const { greeting, message, tips } = getRoleBasedMessage()

  return (
    <Card className="mb-6 border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold">{greeting}</h2>
        <p className="mt-2 text-muted-foreground">{message}</p>
        <p className="mt-4 text-sm font-medium text-primary">{tips}</p>
      </CardContent>
    </Card>
  )
}
