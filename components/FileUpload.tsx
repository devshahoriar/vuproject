'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value?: File
  onChange: (value: File | undefined) => void
  disabled?: boolean
}

export const FileUpload = ({ value, onChange, disabled }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setLoading(true)
      try {
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)

        onChange(file)
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setLoading(false)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    disabled: disabled || loading,
  })

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
    onChange(undefined)
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-6 transition-colors',
        isDragActive
          ? 'border-primary/50 bg-primary/5'
          : 'border-muted-foreground/25',
        disabled || loading
          ? 'cursor-not-allowed opacity-60'
          : 'hover:border-primary/50 hover:bg-primary/5'
      )}
    >
      <input {...getInputProps()} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
      {preview ? (
        <div className="relative flex h-40 w-40 items-center justify-center">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!disabled && !loading && (
            <button
              onClick={removeImage}
              className="absolute -right-3 -top-3 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Drag & drop your image here</p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, GIF up to 5MB
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
