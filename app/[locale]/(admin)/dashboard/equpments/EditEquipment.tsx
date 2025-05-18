'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
} from '@/components/ui/credenza'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateEquipment } from './action'

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Equipment name is required'),
  desc: z.string().min(1, 'Description is required'),
  active: z.boolean(),
  remarks: z.string().optional(),
});

type EditFormValues = z.infer<typeof formSchema>;

interface EditEquipmentProps {
  equipment: {
    id: number
    name: string
    desc: string
    active: boolean
    remarks: string | null
  }
}

export default function EditEquipment({ equipment }: EditEquipmentProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<EditFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: equipment.id,
      name: equipment.name,
      desc: equipment.desc,
      active: equipment.active,
      remarks: equipment.remarks || '',
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: EditFormValues) {
    try {
      await updateEquipment(values)
      
      toast.success('Equipment updated successfully')
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update equipment')
    }
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button size="sm" variant="outline">
          <PencilIcon className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Edit Equipment</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Equipment name"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Equipment description"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Set equipment as active or inactive
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CredenzaBody>
        <CredenzaFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Equipment'}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
