import prisma from '@/prisma/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import sendMail from './sendEmail'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async (user, url) => {
      const result = await sendMail(
        user.email,
        'Reset Password',
        `Click here to reset your password: ${url}`
      )
      if (result.error) {
        throw new Error('Failed to send email')
      }
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

