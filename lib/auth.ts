import prisma from '@/prisma/db'
import { UserRole } from '@prisma/client'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import sendMail from './sendEmail'

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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: UserRole.USER,
        required: false,
      },
      createdAt: {
        returned: false,
        type: 'date',
        required: false,
      },
      updatedAt: {
        returned: false,
        type: 'date',
        required: false,
      },
      suspended: {
        type: 'boolean',
        defaultValue: false,
        required: false,
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
  trustedOrigins: ['http://localhost:3000', 'https://vuproject.vercel.app'],
})
