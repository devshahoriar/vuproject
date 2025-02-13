import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function clearDatabase() {
    // Delete in reverse order of dependencies
    await prisma.payment.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.verification.deleteMany()
    await prisma.class.deleteMany()
    await prisma.classCategory.deleteMany()
    await prisma.file.deleteMany()
    await prisma.user.deleteMany()
}

async function restoreData(backupFile: string) {
    try {
        // Read and parse backup file
        const backupPath = path.resolve(backupFile)
        const rawData = fs.readFileSync(backupPath, 'utf-8')
        const data = JSON.parse(rawData)

        // Clear existing data
        // await clearDatabase()

        // Restore in order of dependencies
        console.log('Restoring files...')
        await prisma.file.createMany({ data: data.files })

        console.log('Restoring users...')
        await prisma.user.createMany({ data: data.users })

        console.log('Restoring class categories...')
        await prisma.classCategory.createMany({ data: data.classCategories })

        console.log('Restoring classes...')
        await prisma.class.createMany({ data: data.classes })

        console.log('Restoring accounts...')
        await prisma.account.createMany({ data: data.accounts })

        console.log('Restoring sessions...')
        await prisma.session.createMany({ data: data.sessions })

        console.log('Restoring verifications...')
        await prisma.verification.createMany({ data: data.verifications })

        console.log('Restoring payments...')
        await prisma.payment.createMany({ data: data.payments })

        console.log('Restore completed successfully!')
    } catch (error) {
        console.error('Restore failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Check if backup file is provided as command line argument
const backupFile = process.argv[2]
if (!backupFile) {
    console.error('Please provide the backup file path as an argument')
    process.exit(1)
}

// Execute restore
restoreData(backupFile)
