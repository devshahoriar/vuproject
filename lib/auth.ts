import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import sendMail from './sendEmail'
import prisma from '@/prisma/db'
import { UserRole } from '@prisma/client'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
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
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: UserRole.USER,
        required: true,
      },
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
