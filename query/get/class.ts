'use server'

import prisma from '@/prisma/db'

export const getClassWithUserCatIns = async () => {
  return await prisma.class.findMany({
    select: {
      id: true,
      title: true,
      coverImage: {
        select: {
          url: true,
        },
      },
      desc: true,
      categoryId: true,
      instructorId: true,
      category: {
        select: {
          title: true,
        },
      },
      instructor: {
        select: {
          name: true,
        },
      },
      duration: true,
      schedule: true,
    },
  })
}

export const countClass = async () => await prisma.class.count()
