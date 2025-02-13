import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function getAllData() {
    const users = await prisma.user.findMany()
    const sessions = await prisma.session.findMany()
    const accounts = await prisma.account.findMany()
    const verifications = await prisma.verification.findMany()
    const files = await prisma.file.findMany()
    const classCategories = await prisma.classCategory.findMany()
    const classes = await prisma.class.findMany()
    const payments = await prisma.payment.findMany()

    return {
        users,
        sessions,
        accounts,
        verifications,
        files,
        classCategories,
        classes,
        payments
    }
}

async function createBackup() {
    try {
        const data = await getAllData()
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const backupPath = path.join(__dirname, 'backups')
        
        // Create backups directory if it doesn't exist
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true })
        }

        const filename = path.join(backupPath, `backup-${timestamp}.json`)
        fs.writeFileSync(filename, JSON.stringify(data, null, 2))
        
        console.log(`Backup created successfully: ${filename}`)
    } catch (error) {
        console.error('Backup failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Execute backup
createBackup()
