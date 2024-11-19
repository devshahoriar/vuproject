import { ComponentProps } from 'react'
import ClientImage from './ClientImage'

const ServerImage = async (prop: ServerImageProps) => {
  return <ClientImage {...prop}  />
}

type ServerImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
} & ComponentProps<typeof ClientImage>
export default ServerImage
