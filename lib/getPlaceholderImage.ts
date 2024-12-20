'use server'
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

import NodeFetchCache, { FileSystemCache } from 'node-fetch-cache'

const fetch = NodeFetchCache.create({
  cache: new FileSystemCache({
    cacheDirectory: path.join(process.cwd(), '.next/cache'),
    ttl: 60 * 60 * 24 * 30,
  }),
})

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getFileBufferLocal(filepath: string) {
  const realFilepath = path.join(process.cwd(), 'public', filepath)
  return fs.readFile(realFilepath)
}

async function getFileBufferRemote(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith('http')
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src)
}

async function getPlaceholderImage(filepath: string) {
  try {
    const originalBuffer = await getFileBuffer(filepath)
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer()
    return bufferToBase64(resizedBuffer)
  } catch {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
  }
}

export default getPlaceholderImage
