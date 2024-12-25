
import { NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { z } from 'zod';
import { getSession } from '@/lib/auth-client';
import { headers } from 'next/headers';
import { UserRole } from '@prisma/client';
import { revalidateTag } from 'next/cache';

const categorySchema = z.object({
  title: z.string().min(1, "Category name is required"),
  desc: z.string().optional(),
});

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
    const body = await req.json();
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return new NextResponse(JSON.stringify({ error: result.error.errors[0].message }), { status: 400 });
    }

    const { title, desc } = result.data;

    const newCategory = await prisma.classCategory.create({
      data: {
        title,
        desc,
      },
    });
    revalidateTag('class-category');
    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('[CATEGORY_CREATE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}