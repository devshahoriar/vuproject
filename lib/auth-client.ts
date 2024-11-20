import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from './auth';
export const {
  signIn,
  signUp,
  useSession,
  getSession,
  signOut,
  forgetPassword,
  changePassword,
  resetPassword,
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  plugins: [inferAdditionalFields<typeof auth>()],
})
