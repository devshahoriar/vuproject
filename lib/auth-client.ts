import { createAuthClient } from 'better-auth/react'
export const { signIn, signUp, useSession, getSession, signOut } =
  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  })
