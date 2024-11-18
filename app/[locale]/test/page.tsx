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
    <form action={onSubmit}>
      <input type="file" name="files" />
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default test
