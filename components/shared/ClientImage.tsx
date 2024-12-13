'use client'

import { ComponentProps, useState } from 'react'

import Image from 'next/image'

const ClientImage = ({ className, ...props }: ComponentProps<typeof Image>) => {
  const [isReady, setIsReady] = useState(true)

  const onLoadCallback = () => {
    setIsReady(true)
  }

  return (
    <div className="overflow-hidden">
      <Image
        {...props}
        className={` transition duration-300 ease-in-out
           ${
             isReady
               ? 'blur-0 scale-100 opacity-100'
               : 'blur-3xl scale-105 opacity-0'
           }
         ${className}`}
        onLoad={onLoadCallback}
     
      />
    </div>
  )
}

export default ClientImage
