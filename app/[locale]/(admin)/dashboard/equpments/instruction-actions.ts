'use server'

import prisma from '@/prisma/db'
import { revalidatePath } from 'next/cache'

export interface EquipmentInstructionFormValues {
  equipmentId: number
  title: string
  description: string
  youtubeUrl?: string
  safetyNotes?: string
}

export const saveEquipmentInstruction = async (
  data: EquipmentInstructionFormValues,
  instructorId: string
) => {
  try {
    const { equipmentId, title, description, youtubeUrl, safetyNotes } = data

    await prisma.equipmentInstruction.create({
      data: {
        equipmentId,
        instructorId,
        title,
        description,
        youtubeUrl: youtubeUrl || null,
        safetyNotes: safetyNotes || null,
      },
    })

    revalidatePath('/dashboard/equpments')
    revalidatePath(`/dashboard/equpments/instructions/${equipmentId}`)
    return { success: true }
  } catch (error) {
    console.error('Error saving equipment instruction:', error)
    throw new Error('Failed to save equipment instruction')
  }
}

export const updateEquipmentInstruction = async (
  id: number,
  data: Omit<EquipmentInstructionFormValues, 'equipmentId'>
) => {
  try {
    const { title, description, youtubeUrl, safetyNotes } = data

    await prisma.equipmentInstruction.update({
      where: { id },
      data: {
        title,
        description,
        youtubeUrl: youtubeUrl || null,
        safetyNotes: safetyNotes || null,
      },
    })

    revalidatePath('/dashboard/equpments')
    return { success: true }
  } catch (error) {
    console.error('Error updating equipment instruction:', error)
    throw new Error('Failed to update equipment instruction')
  }
}

export const deleteEquipmentInstruction = async (id: number) => {
  try {
    await prisma.equipmentInstruction.delete({
      where: { id },
    })

    revalidatePath('/dashboard/equpments')
    return { success: true }
  } catch (error) {
    console.error('Error deleting equipment instruction:', error)
    throw new Error('Failed to delete equipment instruction')
  }
}

export const getEquipmentInstructions = async (equipmentId: number) => {
  try {
    return await prisma.equipmentInstruction.findMany({
      where: { equipmentId },
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
    })
  } catch (error) {
    console.error('Error fetching equipment instructions:', error)
    return []
  }
}
