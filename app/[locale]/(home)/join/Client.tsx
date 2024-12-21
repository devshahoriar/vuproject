'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { signIn, signUp, useSession } from '@/lib/auth-client'
import { Facebook, Instagram, Loader, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormEvent, useEffect, useState } from 'react'

export const JoinPage = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [registerData, setRegisterData] = useState<any>({})
  const [loginData, setLoginData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginError, setLoginError] = useState('')
  const { data } = useSession()

  const { replace, refresh } = useRouter()
  useEffect(() => {
    if (data !== null) {
      replace('/')
    }
  }, [data?.session])

  const _hendelRegister = async (e: FormEvent) => {
    e.preventDefault()
    await signUp.email(
      {
        email: registerData?.email,
        name: registerData?.name,
        password: registerData?.pass,
      },
      {
        onSuccess: () => {
          refresh()
          replace('/')
          setLoading(false)
        },
        onError: (v) => {
          setError(v.error.message)
          setLoading(false)
        },
        onRequest: () => {
          setError('')
          setLoading(true)
        },
      }
    )
  }

  const _hendelLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn.email({
      email: loginData.email,
      password: loginData.pass,
      callbackURL: '/',
    })
    if (error) {
      setLoginError(error?.message as string)
    }
    setLoading(false)
  }
  
  return (
    <Card className="w-[85vw] sm:w-[448px]  dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome to FitZone
        </CardTitle>
        <CardDescription className="text-center">
          Login or create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-black dark:bg-opacity-25 bg-opacity-10">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={_hendelLogin}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <PasswordInput
                    id="login-password"
                    required
                    name="pass"
                    placeholder="Password"
                    onChange={(e) =>
                      setLoginData({ ...loginData, pass: e.target.value })
                    }
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-sm">{loginError}</p>
                )}
                {/* <p className="text-sm text-red-600">{loginMessage}</p> */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-opacity-30"
                  disabled={loading}
                >
                  {loading ? <Loader className="animate-spin" /> : 'Log In'}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={_hendelRegister}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    name="name"
                    placeholder="John Doe"
                    required
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <PasswordInput
                    name="pass"
                    id="register-password"
                    required
                    placeholder="Password"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        pass: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="register-confirm-password">
                    Confirm Password
                  </Label>
                  <PasswordInput
                    name="repass"
                    id="register-confirm-password"
                    required
                    placeholder="Password"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        conPass: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required name="trams" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{' '}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <p className="text-sm text-red-600">{error}</p>
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? <Loader className="animate-spin" /> : 'Register'}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-foreground" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
