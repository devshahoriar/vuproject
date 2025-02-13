import { PrismaClient } from "./out"


const prismaClientSingleton = (): PrismaClient => {
  const x = new PrismaClient({
    log: ['query'],
  })
  return x as unknown as PrismaClient
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
