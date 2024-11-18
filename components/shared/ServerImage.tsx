import { ComponentProps } from 'react'
import ClientImage from './ClientImage'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL

async function dynamicBlurDataUrl(url: String) {
  const base64str = await fetch(`${baseUrl}/_next/image?url=${url}&w=15&q=75`, {
    cache: 'force-cache',
  }).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64')
  )

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`
}

export type ServerImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
} & ComponentProps<typeof ClientImage>

const ServerImage = async (prop: ServerImageProps) => {
  const blurDataURL = await dynamicBlurDataUrl(prop.src)
  
  return (
    <ClientImage
      {...prop}
      blurDataURL={blurDataURL}
      placeholder="blur"
      loading="lazy"
    />
  )
}

export default ServerImage
