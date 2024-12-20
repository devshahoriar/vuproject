import { ComponentProps, Suspense } from 'react'
import Image from 'next/image'
import getPlaceholderImage from '@/lib/getPlaceholderImage'
import ClientImage from './ClientImage'

const ServerImage = ({ src, ...props }: ServerImageProps) => {
  const bldata = getPlaceholderImage(src)
  return (
    <ClientImage blFun={bldata} {...props} src={src} />
  )
}

type ServerImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
} & ComponentProps<typeof Image>
export default ServerImage
