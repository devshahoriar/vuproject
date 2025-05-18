'use server'

import { deleteFile, fileUpload } from '@/lib/FileMeneger'
import prisma from '@/prisma/db'
import { EquipmentFormValues } from './AddEqipment'
import { revalidatePath } from 'next/cache'

export const saveEqupment = async (data: EquipmentFormValues) => {
  let upImageId: string = ''
  try {
    const { active, desc, image, name, remarks } = data
    const fRes = await fileUpload({
      file: image,
      fileName: `eq-${name}`,
      folder: '/eqipments',
    })
    upImageId = fRes.fileId
    const nImg = await prisma.file.create({
      data: {
        fileId: fRes.fileId,
        url: fRes.url,
      },
    })
    await prisma.equipment.create({
      data: {
        desc: desc,
        name: name,
        active: active,
        remarks: remarks,
        imageId: nImg.id,
      },
    })
    revalidatePath('/dashboard/equpments')
    return true
  } catch (error) {
    !!upImageId && (await deleteFile(upImageId))
    throw error
  }
}

export const updateEquipment = async (data: { 
  id: number;
  name: string;
  desc: string;
  active: boolean;
  remarks?: string;
}) => {
  try {
    const { id, active, desc, name, remarks } = data
    
    await prisma.equipment.update({
      where: {
        id: id
      },
      data: {
        desc,
        name,
        active,
        remarks: remarks || null,
      },
    })
    
    revalidatePath('/dashboard/equpments')
    return true
  } catch (error) {
    console.error("Error updating equipment:", error)
    throw error
  }
}
