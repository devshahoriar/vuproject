'use client'

import { useState } from 'react'
import { User, UserRole } from '@prisma/client'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '../../ui/credenza'

type RoleOption = {
  label: string;
  value: UserRole;
};

interface UpdateRoleDialogProps {
  user: User
  currentUserId: string // Add this prop
  onRoleUpdate: (userId: string, role: UserRole) => Promise<void>
}

export function UpdateRoleDialog({
  user,
  currentUserId, // Add this parameter
  onRoleUpdate,
}: UpdateRoleDialogProps) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<UserRole>(user.role)
  const [isLoading, setIsLoading] = useState(false)

  const roleOptions: RoleOption[] = [
    { label: 'Admin', value: UserRole.ADMIN },
    { label: 'Instructor', value: UserRole.INSTRUCTOR },
    { label: 'User', value: UserRole.USER },
  ]

  const handleUpdateRole = async () => {
    try {
      setIsLoading(true)
      await onRoleUpdate(user.id, role)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const isSelfUpdate = currentUserId === user.id

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          disabled={isSelfUpdate}
          title={isSelfUpdate ? "You cannot update your own role" : "Update role"}
        >
          Update Role
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Update User Role</CredenzaTitle>
          <CredenzaDescription>
            Change the role for user {user.name}
          </CredenzaDescription>
        </CredenzaHeader>
        <div className="p-4">
          <Select
            value={role}
            onValueChange={(value: UserRole) => setRole(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CredenzaFooter>
          <Button
            disabled={isLoading || role === user.role || isSelfUpdate}
            onClick={handleUpdateRole}
          >
            {isLoading ? 'Updating...' : 'Update role'}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
