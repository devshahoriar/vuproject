import ProtectedPage from '@/components/shared/ProtectedPage'
import prisma from '@/prisma/db'
import { getLoginUser } from '@/lib/auth-client'
import { headers } from 'next/headers'
import AddEquipmentInstruction from '@/components/shared/AddEquipmentInstruction'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Youtube, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{
    equipmentId: string
  }>
}

const getEquipmentWithInstructions = async (equipmentId: number) => {
  return prisma.equipment.findUnique({
    where: { id: equipmentId },
    include: {
      instructions: {
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

const EquipmentInstructionsPage = async ({ params }: PageProps) => {
  const equipmentId = parseInt((await params).equipmentId)
  const user = await getLoginUser(headers)

  if (!user) {
    return <div>Unauthorized</div>
  }

  const equipment = await getEquipmentWithInstructions(equipmentId)

  if (!equipment) {
    return <div>Equipment not found</div>
  }

  const canAddInstruction = user.role === 'INSTRUCTOR' || user.role === 'ADMIN'

  return (
    <ProtectedPage
      permission='view:equipment'
      title={`Instructions for ${equipment.name}`}
      description='View and manage equipment usage instructions'
    >
      <div className='mb-4 flex justify-between items-center'>
        <Link href='/dashboard/equpments'>
          <Button variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Equipment
          </Button>
        </Link>
        {canAddInstruction && (
          <AddEquipmentInstruction
            equipmentId={equipment.id}
            equipmentName={equipment.name}
            instructorId={user.id}
          />
        )}
      </div>

      <div className='grid gap-6'>
        {equipment.instructions.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12'>
              <AlertTriangle className='h-12 w-12 text-muted-foreground mb-4' />
              <h3 className='text-lg font-semibold mb-2'>
                No Instructions Available
              </h3>
              <p className='text-muted-foreground text-center mb-4'>
                There are no usage instructions for this equipment yet.
              </p>
              {canAddInstruction && (
                <AddEquipmentInstruction
                  equipmentId={equipment.id}
                  equipmentName={equipment.name}
                  instructorId={user.id}
                />
              )}
            </CardContent>
          </Card>
        ) : (
          equipment.instructions.map((instruction) => (
            <Card key={instruction.id}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-xl'>
                      {instruction.title}
                    </CardTitle>
                    <CardDescription>
                      By {instruction.instructor.name} •{' '}
                      {new Date(instruction.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {instruction.youtubeUrl && (
                    <Badge
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      <Youtube className='h-3 w-3' />
                      Video
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-semibold mb-2'>Instructions</h4>
                    <p className='text-muted-foreground whitespace-pre-wrap'>
                      {instruction.description}
                    </p>
                  </div>

                  {instruction.youtubeUrl && (
                    <div>
                      <h4 className='font-semibold mb-2 flex items-center gap-2'>
                        <Youtube className='h-4 w-4 text-red-500' />
                        Video Tutorial
                      </h4>
                      <div className='aspect-video bg-black rounded-lg overflow-hidden'>
                        <iframe
                          width='100%'
                          height='100%'
                          src={instruction.youtubeUrl.replace(
                            'watch?v=',
                            'embed/'
                          )}
                          title={instruction.title}
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {instruction.safetyNotes && (
                    <div className='bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4'>
                      <h4 className='font-semibold mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-200'>
                        <AlertTriangle className='h-4 w-4' />
                        Safety Notes
                      </h4>
                      <p className='text-amber-700 dark:text-amber-300 whitespace-pre-wrap'>
                        {instruction.safetyNotes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ProtectedPage>
  )
}

export default EquipmentInstructionsPage
