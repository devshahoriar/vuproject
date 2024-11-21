'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
} from '@/components/ui/credenza'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ImageIcon, X } from 'lucide-react'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'

// Define the validation schema
const ClassFormSchema = z.object({
  title: z.string().nonempty('Class Title is required'),
  description: z.string().nonempty('Description is required'),
  categoryId: z.string().nonempty('Category is required'),
  instructorId: z.string().nonempty('Instructor is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  schedule: z.array(z.string()).nonempty('Please select at least one day'),
  coverImage: z.instanceof(File).optional(),
})

type Props = {
  categories: { id: number; title: string }[]
  instructors: { id: string; name: string }[]
}

export function ClassForm({ categories, instructors }: Props) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    instructorId: '',
    duration: '',
    schedule: [] as string[],
    coverImage: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setFormData({ ...formData, coverImage: file })
    }
  }

  const removeImage = () => {
    setPreview(null)
    setFile(null)
  }

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        schedule: [...prevData.schedule, value],
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        schedule: prevData.schedule.filter((day) => day !== value),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Parse and validate form data
    const result = ClassFormSchema.safeParse({
      ...formData,
      duration: Number(formData.duration),
    })
    if (!result.success) {
      // Collect and set errors
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0] || ''])
        )
      )
      return
    }
    console.log(result)
    // ...submit form data...
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Add New Class</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Add New Class</CredenzaTitle>
        </CredenzaHeader>
        <form onSubmit={handleSubmit}>
          <CredenzaBody>
            <div className="space-y-4">
              <div className="grid gap-4">
                <label className="font-medium">Cover Image</label>
                <div className={cn(
                  "border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition-colors",
                  "cursor-pointer relative flex items-center justify-center",
                  preview ? "h-[200px]" : "h-[120px]"
                )}>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  
                  {preview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.preventDefault()
                          removeImage()
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click or drag image to upload
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Input
                placeholder="Class Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              <Select
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && <p className="text-sm text-red-600">{errors.categoryId}</p>}
              <Select
                onValueChange={(value) => setFormData({ ...formData, instructorId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.instructorId && <p className="text-sm text-red-600">{errors.instructorId}</p>}
              <Input
                type="number"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              {errors.duration && <p className="text-sm text-red-600">{errors.duration}</p>}
              <div className="grid gap-2">
                <label className="font-medium">Schedule</label>
                <div className="flex flex-wrap gap-4">
                  {['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <div key={day} className="flex items-center space-x-1">
                      <Checkbox
                        id={day}
                        checked={formData.schedule.includes(day)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prevData) => ({
                              ...prevData,
                              schedule: [...prevData.schedule, day],
                            }))
                          } else {
                            setFormData((prevData) => ({
                              ...prevData,
                              schedule: prevData.schedule.filter((d) => d !== day),
                            }))
                          }
                        }}
                      />
                      <label htmlFor={day} className="text-sm">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.schedule && <p className="text-sm text-red-600">{errors.schedule}</p>}
              </div>
            </div>
          </CredenzaBody>
          <CredenzaFooter className='mt-2'>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Class</Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  )
}
