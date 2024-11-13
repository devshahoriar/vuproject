'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgetPassword } from '@/lib/auth-client'
import { Loader } from 'lucide-react'
import { useState } from 'react'

const ForGotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const hendelSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      await forgetPassword({ email: email, redirectTo: '/reset-password' })
      setMessage('Reset link sent to your email.')
    } catch (error: any) {
      console.log(error)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-md  dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to FitZone
          </CardTitle>
          <CardDescription className="text-center">
            Reset your account's password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="login-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={hendelSubmit}
            disabled={loading}
            className="mt-5 w-[150px]"
          >
            {loading ? <Loader className="animate-spin" /> : 'Send Reset Link'}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default ForGotPassword
