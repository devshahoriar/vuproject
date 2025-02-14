'use server'

import FileMeneger from '@/lib/FileMeneger'
import prisma from '@/prisma/db'

export const updateAddProfileimage = async (id: string, profile: File) => {
  const oldImage = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      profileImageId: true,
      profileImage: {
        select: {
          fileId: true,
          id: true,
        },
      },
    },
  })

  // Delete old image if exists
  if (oldImage?.profileImage?.fileId) {
    try {
      await FileMeneger.deleteFile(oldImage.profileImage.fileId)
    } catch (error) {
      console.log('This image not found')
    }
  }

  if (profile) {
    const bytes = await profile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const res = await FileMeneger.upload({
      file: buffer,
      fileName: profile.name,
      folder: '/vuproject/class',
    })

    // Update or create file record
    let file;
    if (oldImage?.profileImageId) {
      file = await prisma.file.update({
        where: {
          id: oldImage.profileImageId
        },
        data: {
          fileId: res.fileId,
          url: res.url,
        },
      })
    } else {
      file = await prisma.file.create({
        data: {
          fileId: res.fileId,
          url: res.url,
        },
      })
    }

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: res.url,
        profileImageId: file.id,
      },
    })
  }
}

export const updatePhone = async (id: string, phone: string) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      phone: phone,
    },
  })
}
