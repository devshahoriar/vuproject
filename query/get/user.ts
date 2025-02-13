'use server'

import prisma from "@/prisma/db"
import { UserRole } from '@/prisma/out'

export const getOnlyInstructor = async () => await prisma.user.findMany({
  where: { role: UserRole.INSTRUCTOR },
  select:{
    id: true,
    name: true,
    email: true,
    image: true,
  }
})

export const countUser = async () => await prisma.user.count()

export const getAllUser = async () => await prisma.user.findMany({
  select:{
    id: true,
    name: true,
    email: true,
    role: true,
    image: true,
    createdAt: true,
    suspended: true,
  },
  orderBy: { createdAt: 'desc' } 
})