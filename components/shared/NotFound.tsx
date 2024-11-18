import React from 'react'
import ServerImage from './ServerImage'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <main className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <ServerImage
          alt="Page not found"
          height={1000}
          width={1000}
          src="/imgs/notfound.png"
          className='size-[100%] sm:size-[550px]'
        />
        <Button asChild>
          <Link href="/"><Home/> Go back home</Link>
        </Button>
      </div>
    </main>
  )
}

export default NotFound
