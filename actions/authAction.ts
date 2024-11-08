'use server'

import { createSession, generateSessionToken, SESSION_NAME } from '@/auth'
import prisma from '@/prisma/db'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
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

export const login = async (pv: unknown, fromData: FormData) => {
  const { email, pass } = Object.fromEntries(fromData) as unknown as {
    email: string
    pass: string
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  })

  if (!user) {
    return 'User not found'
  }
  const match = await bcrypt.compare(pass, user.password)
  if (!match) {
    return 'Invalid password'
  }
  const token = generateSessionToken()
  const session = await createSession(token, user.id)
  const cookie = await cookies()
  cookie.set(SESSION_NAME, session.id, {
    expires: session.expiresAt,
  })
  return redirect('/')
}
