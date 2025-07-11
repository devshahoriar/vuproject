import ProtectedPage from '@/components/shared/ProtectedPage'
import prisma from '@/prisma/db'
import AddEquipment from './AddEqipment'
import EditEquipment from './EditEquipment'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { getLoginUser } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { History, BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

const getAllEquipments = async () => {
  return prisma.equipment.findMany({
    select: {
      id: true,
      name: true,
      desc: true,
      active: true,
      remarks: true,
      image: {
        select: {
          url: true,
        },
      },
      _count: {
        select: {
          instructions: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}

const AdminEqupmentPage = async () => {

  const eqs = await getAllEquipments()
  return (
    <ProtectedPage 
      permission="manage:equipment" 
      title="Equipment Management"
      description="Add, edit, and manage gym equipment">
      <div className='mb-4 flex justify-between items-center'>
        <div className='text-muted-foreground'>
          Total Equipments: {eqs.length}
        </div>
        <div className='flex gap-2'>
          <Link href="/dashboard/equpments/history">
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>
          </Link>
          <AddEquipment />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Instructions</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eqs.map((equipment) => (
            <TableRow key={equipment.id}>
              <TableCell>{equipment.name}</TableCell>
              <TableCell>{equipment.desc}</TableCell>
              <TableCell>{equipment.active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Badge variant={equipment._count.instructions > 0 ? 'default' : 'secondary'}>
                  {equipment._count.instructions} instruction{equipment._count.instructions !== 1 ? 's' : ''}
                </Badge>
              </TableCell>
              <TableCell>{equipment.remarks || '-'}</TableCell>
              <TableCell>
                {equipment.image?.url ? (
                  <img
                    src={equipment.image.url}
                    alt={equipment.name}
                    className='h-10 w-10 object-cover rounded-md'
                  />
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/equpments/instructions/${equipment.id}`}>
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-1 h-3 w-3" />
                      Instructions
                    </Button>
                  </Link>
                  <EditEquipment equipment={equipment} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ProtectedPage>
  )
}

export default AdminEqupmentPage
