import prisma from '@/prisma/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async (user,url) => {
      console.log(url)
      
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24 * 2,
  },
  advanced: {
    cookies: {
      session_token: {
        name: 'token',
      },
    },
  },
})
