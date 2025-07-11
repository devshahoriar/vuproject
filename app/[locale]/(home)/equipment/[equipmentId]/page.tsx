import prisma from '@/prisma/db'
import EquipmentInstructionView from '@/components/shared/EquipmentInstructionView'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    equipmentId: string
  }
}

const getEquipmentWithInstructions = async (equipmentId: number) => {
  return prisma.equipment.findUnique({
    where: { 
      id: equipmentId,
      active: true // Only show active equipment
    },
    include: {
      instructions: {
        include: {
          instructor: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

const PublicEquipmentInstructionsPage = async ({ params }: PageProps) => {
  const equipmentId = parseInt(params.equipmentId)
  
  if (isNaN(equipmentId)) {
    notFound()
  }

  const equipment = await getEquipmentWithInstructions(equipmentId)

  if (!equipment) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/classes">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">How to Use {equipment.name}</h1>
        <p className="text-muted-foreground text-lg">{equipment.desc}</p>
      </div>

      <EquipmentInstructionView 
        instructions={equipment.instructions}
        equipmentName={equipment.name}
      />
    </div>
  )
}

export default PublicEquipmentInstructionsPage
