import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'

import type {  Session } from '@prisma/client'
import prisma from '@/prisma/db'
import { cookies } from 'next/headers'
import { cache } from "react";

export const SESSION_NAME = 'token'

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }
  await prisma.session.create({
    data: session,
  })
  return session
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const result = await prisma.session.findUnique({
    where: {
      id: token,
    },
    include: {
      user: {
        select: {
          email: true,
          id: true,
          name: true,
        },
      },
    },
  })
  if (result === null) {
    return { session: null, user: null }
  }
  const { user, ...session } = result
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: token } })
    return { session: null, user: null }
  }

  return { session, user }
}

export const isLogin = cache(async () => {
  const c = await cookies()
  const token = c.get(SESSION_NAME)?.value
  if (!token) {
    return { session: null, user: null }
  }
  return validateSessionToken(token)
})

export type SessionValidationResult =
  | {
      session: Session
      user: {
        id: number
        name: string
        email: string
      }
    }
  | { session: null; user: null }
