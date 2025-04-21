import ImageKit from 'imagekit'

var FileMeneger = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVET_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL!,
})

export const fileUpload = async ({
  file,
  fileName,
  folder = '/',
}: {
  file: File
  fileName?: string
  folder?: string
}) => {
  fileName = fileName ? fileName : `${Date.now()}_${file.name}`
  const buffer = await file.arrayBuffer()
  const res = await FileMeneger.upload({
    file: Buffer.from(buffer),
    fileName: fileName,
    folder: folder,
  })
  return {
    url: res.url,
    fileId: res.fileId,
  }
}

export const deleteFile = async (fileId: string) => {
  return await FileMeneger.deleteFile(fileId)
}


export default FileMeneger
