'use client'

import { Button } from '@/components/ui/button'
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, UserRole } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { Users2 } from 'lucide-react'






type RoleOption = {
  label: string;
  value: UserRole;
};

interface UpdateRoleDialogProps {
  user: User
  currentUserId: string
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

interface UsersTableProps {
  users: User[]
  currentUserId: string
}
export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const [selectedRole, setSelectedRole] = useState<string>('ALL')
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleRoleUpdate = async (userId: string, role: UserRole) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/users/${userId}/role`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role }),
        })

        if (!response.ok) throw new Error('Failed to update role')
        toast.success('User role updated successfully')
        refresh()
      } catch (error) {
        toast.error('Failed to update user role')
        console.error(error)
      }
    })
  }

  const filteredUsers = users.filter((user) => {
    if (selectedRole === 'ALL') return true
    return user.role === selectedRole
  })

  return (
    <div className="rounded-md border dark:border-zinc-500">
      <div className="p-4">
        {/* Add Filter Section */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by role:</span>
            <Select
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Users</SelectItem>
                <SelectItem value={UserRole.ADMIN}>Admins</SelectItem>
                <SelectItem value={UserRole.INSTRUCTOR}>Instructors</SelectItem>
                <SelectItem value={UserRole.USER}>Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b dark:[&_tr]:border-zinc-500">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle">User</th>
                <th className="h-12 px-4 text-left align-middle">Role</th>
                <th className="h-12 px-4 text-left align-middle">Joined</th>
                <th className="h-12 px-4 text-right align-middle">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Users2 className="h-8 w-8 mb-2" />
                      <span>No users found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image || ''} alt={user.name} />
                          <AvatarFallback>
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          user.role === 'ADMIN'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : user.role === 'INSTRUCTOR'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-400'
                        }`}
                      >
                        {user.role.toLowerCase()}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <span className="text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <UpdateRoleDialog
                        user={user}
                        currentUserId={currentUserId}
                        onRoleUpdate={handleRoleUpdate}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}