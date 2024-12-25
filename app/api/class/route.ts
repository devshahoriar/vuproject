import { NextResponse } from 'next/server'

import { getSession } from '@/lib/auth-client'
import { UserRole } from '@prisma/client'
import { headers } from 'next/headers'
import FileMeneger from '@/lib/FileMeneger'
import prisma from '@/prisma/db'
import { revalidateTag } from 'next/cache'

export async function PUT(req: Request) {
  try {
    const session = await getSession({
      fetchOptions: {
        headers: await headers(),
      },
    })
    if (!session?.data?.user || session.data.user.role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const coverImage = formData.get('coverImage') as File
    const classId = formData.get('classId') as string

    if (!classId) {
      return new NextResponse(
        JSON.stringify({ error: 'Class ID is required.' }),
        { status: 400 }
      )
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('categoryId') as string
    const instructorId = formData.get('instructorId') as string
    const duration = formData.get('duration') as string
    const scheduleRaw = formData.get('schedule') as string

    if (
      !title ||
      !description ||
      !categoryId ||
      !instructorId ||
      !duration ||
      !scheduleRaw
    ) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      )
    }

    let file
    if (coverImage && coverImage instanceof File) {
      const previousClass = await prisma.class.findUnique({
        where: { id: Number(classId) },
        select: {
          coverImage: {
            select: {
              fileId: true,
              id: true,
            },
          },
        },
      })

      if (previousClass?.coverImage) {
        await FileMeneger.deleteFile(previousClass.coverImage.fileId)
        await prisma.file.delete({ where: { id: previousClass.coverImage.id } })
      }

      const bytes = await coverImage.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const res = await FileMeneger.upload({
        file: buffer,
        fileName: coverImage.name,
        folder: '/vuproject/class',
      })

      file = await prisma.file.create({
        data: {
          fileId: res.fileId,
          url: res.url,
        },
      })
    }

    const schedule = JSON.parse(scheduleRaw)

    await prisma.class.update({
      where: { id: Number(classId) },
      data: {
        desc: description,
        duration: Number(duration),
        schedule: String(schedule),
        title: title,
        categoryId: Number(categoryId),
        instructorId: instructorId,
        ...(file && { coverImageId: file.id }),
      },
    })
    revalidateTag('class')
    return NextResponse.json({
      title,
      description,
      categoryId,
      instructorId,
      duration,
      scheduleRaw,
    })
  } catch (error) {
    console.error('[CLASS_PUT]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession({
      fetchOptions: {
        headers: await headers(),
      },
    })
    if (!session?.data?.user || session.data.user.role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const coverImage = formData.get('coverImage') as File

    if (!coverImage || !(coverImage instanceof File)) {
      return new NextResponse(
        JSON.stringify({ error: 'Cover image reqered.' }),
        { status: 400 }
      )
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('categoryId') as string
    const instructorId = formData.get('instructorId') as string
    const duration = formData.get('duration') as string
    const scheduleRaw = formData.get('schedule') as string

    if (
      !title ||
      !description ||
      !categoryId ||
      !instructorId ||
      !duration ||
      !scheduleRaw
    ) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      )
    }

    const bytes = await coverImage.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const res = await FileMeneger.upload({
      file: buffer,
      fileName: coverImage.name,
      folder: '/vuproject/class',
    })

    const file = await prisma.file.create({
      data: {
        fileId: res.fileId,
        url: res.url,
      },
    })

    const schedule = JSON.parse(scheduleRaw)

    await prisma.class.create({
      data: {
        desc: description,
        duration: Number(duration),
        schedule: String(schedule),
        title: title,
        categoryId: Number(categoryId),
        instructorId: instructorId,
        coverImageId: file.id,
      },
    })
    revalidateTag('class')
    return NextResponse.json({
      title,
      description,
      categoryId,
      instructorId,
      duration,
      scheduleRaw,
    })
  } catch (error) {
    console.error('[CLASS_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
