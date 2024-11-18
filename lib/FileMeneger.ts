import ImageKit from 'imagekit'

var FileMeneger = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVET_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL!,
})

export default FileMeneger
