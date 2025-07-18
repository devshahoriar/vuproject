import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { headers } from 'next/headers'
import { auth } from './auth'
import { cache } from 'react'
export type USER = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | undefined | undefined;
  role: string;
  suspended: boolean;
}
export const {
  signIn,
  signUp,
  useSession,
  getSession,
  signOut,
  forgetPassword,
  changePassword,
  resetPassword,
  updateUser
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const getLoginUser = cache(async (header: typeof headers) => {
  const session = await getSession({
    fetchOptions: {
      headers: await header(),
    },
  })
  const u = session.data?.user
  return u
})

export const isAdmin = (user: any): boolean => {
  return user?.role === 'ADMIN'
}

export const isInstructor = (user: any): boolean => {
  return user?.role === 'INSTRUCTOR'
}

export const isRegularUser = (user: any): boolean => {
  return user?.role === 'USER'
}

export const notIsAdmin = (user: any): boolean => {
  return user?.role !== 'ADMIN'
}
