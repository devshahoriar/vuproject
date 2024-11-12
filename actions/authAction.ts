'use server'


import prisma from '@/prisma/db'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

type BodyType = {
  name: string
  email: string
  pass: string
  repass: string
  trams: string
}

export const register = async (pv: unknown, fromData: FormData) => {
  const { email, name, pass, repass, trams } = Object.fromEntries(
    fromData
  ) as unknown as BodyType

  if (trams !== 'on') {
    return 'Please accept the terms and conditions'
  }
  if (pass !== repass) {
    return 'Password does not match'
  }
  const hashedPassword = await bcrypt.hash(pass, 10)
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return 'Email already exist'
    }
    return 'An error occurred'
  }
  return redirect('/join?registered=true')
}

