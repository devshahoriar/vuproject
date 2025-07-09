'use client'

import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface EnrolledBadgeProps {
  isEnrolled: boolean
}

export function EnrolledBadge({ isEnrolled }: EnrolledBadgeProps) {
  if (!isEnrolled) {
    return null
  }
  
  return (
    <Badge className="absolute top-4 right-4 bg-green-600 text-white flex items-center gap-1 px-3 py-1">
      <Check className="h-4 w-4" />
      Enrolled
    </Badge>
  )
}
