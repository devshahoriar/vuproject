'use server'

import prisma from "@/prisma/db"

export const getCategoryWithCountOfClass =async () => await prisma.classCategory.findMany({
  include: {
    _count: {
      select: {
        Class: true,
      },
    },
  },
})

export const getAllCategories = async () => await prisma.classCategory.findMany()