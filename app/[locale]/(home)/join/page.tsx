'use client'

import { login, register } from '@/actions/authAction'
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
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useActionState, useState } from 'react'

export default function LoginRegistrationPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [registerMessage, regisAction, isPendingRe] = useActionState(
    register,
    null
  )
  const isRegisterd = Boolean(useSearchParams().get('registered'))

  const [loginMessage, loginAction, isPendingLg] = useActionState(login, null)

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-md dark:bg-zinc-800 dark:text-white">
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
              <form action={loginAction}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <PasswordInput
                      id="login-password"
                      required
                      name="pass"
                      placeholder="Password"
                    />
                  </div>
                  {isRegisterd && (
                    <p className="text-green-500 text-sm">
                      Registration Success
                    </p>
                  )}
                  <p className="text-sm text-red-600">{loginMessage}</p>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-30"
                    disabled={isPendingLg}
                  >
                    Log In
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <form action={regisAction}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
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
                  <p className="text-sm text-red-600">
                    {registerMessage as string}
                  </p>
                  <Button
                    disabled={isPendingRe}
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Register
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
                <span className="w-full border-t" />
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
    </main>
  )
}
