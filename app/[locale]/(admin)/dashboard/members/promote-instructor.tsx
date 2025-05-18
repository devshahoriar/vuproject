'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Loader2, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { promoteToInstructor } from './actions'

interface InstructorPromoteProps {
  userId: string
  userName: string
}

export default function InstructorPromote({ userId, userName }: InstructorPromoteProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const handlePromote = async () => {
    setIsLoading(true)
    try {
      const result = await promoteToInstructor(userId)
      if (result.success) {
        toast.success(`${userName} has been promoted to instructor`)
        setOpen(false)
        router.refresh()
      } else {
        toast.error(result.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <UserPlus className="h-3.5 w-3.5" />
          <span>Make Instructor</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promote to Instructor</DialogTitle>
          <DialogDescription>
            Are you sure you want to promote {userName} to an instructor role? They will gain access to instructor features such as class management and attendance tracking.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handlePromote} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Promoting...
              </>
            ) : (
              'Promote to Instructor'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
