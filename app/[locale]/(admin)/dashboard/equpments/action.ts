'use server'

import { deleteFile, fileUpload } from '@/lib/FileMeneger'
import prisma from '@/prisma/db'
import { EquipmentFormValues } from './AddEqipment'
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
    return true
  } catch (error) {
    !!upImageId && (await deleteFile(upImageId))
    throw error
  }
}
