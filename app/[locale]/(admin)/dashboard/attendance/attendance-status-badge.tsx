'use client'

import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

interface AttendanceStatusBadgeProps {
  status: boolean
}

export default function AttendanceStatusBadge({ status }: AttendanceStatusBadgeProps) {
  if (status) {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Present
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30 flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        Absent
      </Badge>
    )
  }
}
