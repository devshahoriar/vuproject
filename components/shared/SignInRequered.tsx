import Link from "next/link"
import { Button } from "../ui/button"
import ServerImage from "./ServerImage"
import { User } from "lucide-react"

const SignInRequered = () => {
  return (
    <main className="h-screen w-screen">
    <div className="flex flex-col items-center justify-center h-full">
      <ServerImage
        alt="Page not found"
        height={1000}
        width={1000}
        src="/imgs/unauth.png"
        className='size-[100%] sm:size-[550px]'
      />
      <Button asChild>
        <Link href="/join"><User/> Login</Link>
      </Button>
    </div>
  </main>
  )
}

export default SignInRequered