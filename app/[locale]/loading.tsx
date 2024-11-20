import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="h-[98vh] w-full flex justify-center items-center">
      <div className="flex flex-col text-center  ">
        <h1 className="text-6xl font-bold">
          Fit<span className="text-primary">Zone</span>
        </h1>
       <p className='mt-5 animate-pulse text-xl flex justify-center items-center gap-3'>
        <Loader className="animate-spin"/>
        Loading...</p>
      </div>
    </div>
  )
}

export default Loading
