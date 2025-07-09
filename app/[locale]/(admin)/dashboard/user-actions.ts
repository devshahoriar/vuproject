// Server actions for membership data
"use server";

import { getLoginUser } from '@/lib/auth-client';
import prisma from "@/prisma/db";
import { headers } from 'next/headers';


export async function getUserMembership() {
  const session = await getLoginUser(headers);
  if (!session || !session.id) {
    return null;
  }
  
  const user = await prisma.user.findUnique({
    where: {
      id: session.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      memberships: true
    }
  });
  
  return user;
}

export async function getUserPayments() {
 const session = await getLoginUser(headers);
  if (!session || !session.id) {
    return [];
  }
  
  const payments = await prisma.payment.findMany({
    where: {
      userId: session.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return payments;
}

export async function getUserClasses() {
  const session = await getLoginUser(headers);
  if (!session || !session.id) {
    return [];
  }
  
  const user = await prisma.user.findUnique({
    where: {
      id: session.id
    },
    include: {
      enrolledClass: {
        include: {
          instructor: {
            select: {
              name: true,
              email: true,
              image: true
            }
          },
          category: true,
          coverImage: true
        }
      }
    }
  });
  
  return user?.enrolledClass ? [user.enrolledClass] : [];
}
