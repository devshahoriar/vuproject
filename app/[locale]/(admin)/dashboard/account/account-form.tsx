'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateUser } from '@/lib/auth-client'
import { useRef, useState } from 'react'
import { updateAddProfileimage, updatePhone } from './action'

export function AccountForm({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File>()

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(file)
      setSelectedImage(imageUrl)
    }
  }

  const HendelSubmit =async () => {
    setIsLoading(true)
    if (image) {
        await updateAddProfileimage(user.id, image)
    }
    if (name) {
      await updateUser({
        name: name,
      })
    }
    if (phone) {
      await updatePhone(user.id,phone)
    }
    setIsLoading(false)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={selectedImage || user?.image || ''}
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Picture
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.email}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone."
            />
          </div>

          <Button
            onClick={HendelSubmit}
            className="w-full"
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
