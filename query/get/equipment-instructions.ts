'use server'

import prisma from '@/prisma/db'

export const getAllEquipmentWithInstructions = async () => {
  try {
    return await prisma.equipment.findMany({
      where: { active: true },
      include: {
        instructions: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            instructions: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })
  } catch (error) {
    console.error('Error fetching equipment with instructions:', error)
    return []
  }
}

export const getEquipmentInstructionById = async (instructionId: number) => {
  try {
    return await prisma.equipmentInstruction.findUnique({
      where: { id: instructionId },
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
          },
        },
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
  } catch (error) {
    console.error('Error fetching equipment instruction:', error)
    return null
  }
}
