'use client'

import { Button } from "@/components/ui/button"
import { MembershipType, UserRole } from "@/prisma/out"
import { joinClass } from "./actions"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface JoinClassButtonProps {
  classId: number
  enrolledClassId: number | null
  userRole: UserRole | null
  membership: MembershipType | null
  isLoggedIn: boolean
}

export function JoinClassButton({ 
  classId, 
  enrolledClassId, 
  userRole, 
  membership,
  isLoggedIn
}: JoinClassButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const isEnrolled = enrolledClassId === classId
  const isInstructor = userRole === UserRole.INSTRUCTOR
  const hasValidMembership = membership && membership !== MembershipType.USER
  
  const handleJoinClass = async () => {
    if (!isLoggedIn) {
      router.push(`/join?redirect=/classes`)
      return
    }
    
    if (isInstructor) {
      toast.error("Instructors cannot join classes as students")
      return
    }
    
    if (!hasValidMembership) {
      toast.error("You need an active membership to join classes")
      router.push('/membership')
      return
    }
    
    try {
      setIsLoading(true)
      const result = await joinClass(classId)
      
      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to join class")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Button 
      className="w-full" 
      onClick={handleJoinClass}
      disabled={isLoading || isInstructor}
      variant={isEnrolled ? "secondary" : "default"}
    >
      {isLoading ? "Processing..." : isEnrolled ? "Leave Class" : "Join Class"}
    </Button>
  )
}
