import { ContentLayout } from '@/components/admin-panel/content-layout'
import prisma from '@/prisma/db'
import AddEquipment from './AddEqipment'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'

const getAllEquipments = async () => {
  return prisma.equipment.findMany({
    select:{
      id: true,
      name: true,
      desc: true,
      active: true,
      remarks: true,
      image:{
        select:{
          url:true
        }
      }
    }
  })
}

const AdminEqupmentPage = async () => {
  const eqs = await getAllEquipments()

  return (
    <ContentLayout title="Equipments">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-muted-foreground">Total Equipments: {eqs.length}</div>
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
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {eqs.map((equipment) => (
            <TableRow key={equipment.id}>
              <TableCell>{equipment.name}</TableCell>
              <TableCell>{equipment.desc}</TableCell>
              <TableCell>{equipment.active ? "Active" : "Inactive"}</TableCell>
              <TableCell>{equipment.remarks || "-"}</TableCell>
              <TableCell>
                {equipment.image?.url ? (
                  <img 
                    src={equipment.image.url} 
                    alt={equipment.name} 
                    className="h-10 w-10 object-cover rounded-md"
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              {/* <TableCell>
                <Button size="sm" variant="ghost">
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContentLayout>
  )
}

export default AdminEqupmentPage
