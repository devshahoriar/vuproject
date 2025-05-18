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
import { getLoginUser } from '@/lib/auth-client'
import { headers } from 'next/headers'

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
        <AddEquipment />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
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
                <EditEquipment equipment={equipment} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ProtectedPage>
  )
}

export default AdminEqupmentPage
