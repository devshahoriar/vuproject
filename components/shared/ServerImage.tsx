import { ComponentProps, Suspense } from 'react'
import Image from 'next/image'
import getPlaceholderImage from '@/lib/getPlaceholderImage'
import ClientImage from './ClientImage'

const ServerImage = ({ ...props }: ServerImageProps) => {
  return <Image {...props} />
}

type ServerImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
} & ComponentProps<typeof Image>
export default ServerImage
