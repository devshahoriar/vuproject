import ServerImage from "@/components/shared/ServerImage"
import FileMeneger from "@/lib/FileMeneger"


const onSubmit = async (e:FormData) => {
  'use server'
  const files = e.getAll('files')
  for (const file of files) {
    if (file instanceof File) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const res = await FileMeneger.upload({
        file: buffer,
        fileName: file.name,
        folder:'/test',
      })
      console.log(res)
     
    }
  }


  // await FileMeneger.deleteFile('673b6dade375273f6025b0ac')


  
}

const test = () => {
  return (
    <ServerImage
    src="https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=geert-pieters-3RnkZpDqsEI-unsplash.jpg"
    alt="FitZone Gym Interior"
    width={600}
    height={400}
    className="rounded-lg shadow-lg"
  />
  )
}

export default test
