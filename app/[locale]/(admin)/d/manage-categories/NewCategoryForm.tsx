'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaTrigger,
} from '@/components/ui/credenza'
import { z } from "zod";

const categorySchema = z.object({
  title: z.string().min(1, "Category name is required"),
  desc: z.string().optional(),
});

export function NewCategoryForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ title?: string; desc?: string }>({});
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({});

    const formData = { title, desc };
    const result = categorySchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title ? fieldErrors.title.join(', ') : undefined,
        desc: fieldErrors.desc ? fieldErrors.desc.join(', ') : undefined,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(formData),
        
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create category')
      }
      
      setTitle('')
      setDesc('')
      setIsOpen(false)
      router.refresh()
      toast.info('Category created successfully')
    } catch (error) {
      toast.error('Failed to create category')
      console.log('Failed to create category:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> New Category
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create New Category</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Category Name</Label>
              <Input
                id="title"
                placeholder="Category name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                placeholder="Description (optional)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}
            </div>
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}