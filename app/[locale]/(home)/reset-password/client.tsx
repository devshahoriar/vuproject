'use client'
import { Button } from "@/components/ui/button" 
import { CardContent } from "@/components/ui/card" 
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
type ResetPassWordProps = {
  email: string
  token: string
}

export const ResetPassWord = ({ email, token }: ResetPassWordProps) => {
  return (
    <CardContent>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input defaultValue={email} disabled id="email" />
      </div>
      <div>
        <Label htmlFor="token">Token</Label>
        <Input defaultValue={token} disabled id="token" />
      </div>
      <div>
        <Label htmlFor="newPass">New Password</Label>
        <Input id="newPass" />
      </div>
      <div>
        <Label htmlFor="conPass">Confirm Password</Label>
        <Input id="conPass" />
      </div>
      <Button className='mt-5 w-full'>Reset Password</Button>
    </CardContent>
  )
}
