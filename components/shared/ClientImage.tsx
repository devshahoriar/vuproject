'use client'

import { ComponentProps, useState } from 'react'

import Image from 'next/image'

const ClientImage = ({ className, ...props }: ComponentProps<typeof Image>) => {
  const [isReady, setIsReady] = useState(false)
  const onLoadCallback = () => {
    setIsReady(true)
  }
  return (
    <div className='overflow-hidden'>
      <Image
        {...props}
        className={` transition duration-500 ease-in-out ${
          isReady ? 'blur-0 scale-100' : 'blur-2xl scale-105'
        } ${className}`}
        onLoad={onLoadCallback}
      />
    </div>
  )
}

export default ClientImage
