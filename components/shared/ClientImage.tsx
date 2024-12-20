'use client'

import Image from 'next/image'
import { ComponentProps, Suspense, Usable, use } from 'react'

const ClientImage = ({
  blFun,
  ...props
}: { blFun: Usable<unknown> } & ComponentProps<typeof Image>) => {
  const bldata = use(blFun) as string
  return (
    <Suspense fallback={null}>
      <Image placeholder="blur" blurDataURL={bldata} {...props} />
    </Suspense>
  )
}

export default ClientImage
