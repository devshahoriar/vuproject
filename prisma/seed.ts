import { PrismaClient } from './out'
import bcrypt from 'bcrypt'


const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Hash the common password for all users
  const commonPassword = 'asdfghjkl'
  const hashedPassword = await bcrypt.hash(commonPassword, 10)

  // Create sample files for equipment and classes
  let treadmillImage = await prisma.file.findFirst({
    where: { fileId: 'sample-treadmill' }
  })
  if (!treadmillImage) {
    treadmillImage = await prisma.file.create({
      data: {
        fileId: 'sample-treadmill',
        url: 'https://placehold.co/600x400/4CAF50/white?text=Treadmill'
      }
    })
  }

  let benchPressImage = await prisma.file.findFirst({
    where: { fileId: 'sample-benchpress' }
  })
  if (!benchPressImage) {
    benchPressImage = await prisma.file.create({
      data: {
        fileId: 'sample-benchpress',
        url: 'https://placehold.co/600x400/FF5722/white?text=Bench+Press'
      }
    })
  }

  let yogaClassImage = await prisma.file.findFirst({
    where: { fileId: 'yoga-class-cover' }
  })
  if (!yogaClassImage) {
    yogaClassImage = await prisma.file.create({
      data: {
        fileId: 'yoga-class-cover',
        url: 'https://placehold.co/600x400/9C27B0/white?text=Yoga+Class'
      }
    })
  }

  // Create sample equipment if they don't exist
  const equipment1 = await prisma.equipment.upsert({
    where: { name: 'Treadmill' },
    update: {},
    create: {
      name: 'Treadmill',
      desc: 'Cardiovascular exercise equipment for running and walking',
      active: true,
      imageId: treadmillImage.id
    }
  })

  const equipment2 = await prisma.equipment.upsert({
    where: { name: 'Bench Press' },
    update: {},
    create: {
      name: 'Bench Press',
      desc: 'Weight training equipment for chest and arm exercises',
      active: true,
      imageId: benchPressImage.id
    }
  })

  // Create a sample instructor user if they don't exist
  const instructor = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      id: 'instructor-1',
      name: 'John Instructor',
      email: 'admin@gmail.com',
      phone: '+1234567890',
      emailVerified: true,
      role: 'INSTRUCTOR',
      memberships: 'PRO',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  // Create the instructor's account with password
  await prisma.account.upsert({
    where: { 
      id: 'instructor-account-1'
    },
    update: {
      password: hashedPassword,
    },
    create: {
      id: 'instructor-account-1',
      accountId: instructor.email,
      providerId: 'credential',
      userId: instructor.id,
      password: hashedPassword,
    }
  })

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@admin.com',
      phone: '+1234567891',
      emailVerified: true,
      role: 'ADMIN',
      memberships: 'ELIT',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  // Create the admin's account with password
  await prisma.account.upsert({
    where: { 
      id: 'admin-account-1'
    },
    update: {
      password: hashedPassword,
    },
    create: {
      id: 'admin-account-1',
      accountId: admin.email,
      providerId: 'credential',
      userId: admin.id,
      password: hashedPassword,
    }
  })

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'shuvo@gmail.com' },
    update: {},
    create: {
      id: 'user-1',
      name: 'Shuvo Test User',
      email: 'shuvo@gmail.com',
      phone: '+1234567892',
      emailVerified: true,
      role: 'USER',
      memberships: 'BASIC',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  // Create the test user's account with password
  await prisma.account.upsert({
    where: { 
      id: 'user-account-1'
    },
    update: {
      password: hashedPassword,
    },
    create: {
      id: 'user-account-1',
      accountId: testUser.email,
      providerId: 'credential',
      userId: testUser.id,
      password: hashedPassword,
    }
  })

  // Create sample class categories
  const cardioCategory = await prisma.classCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Cardio',
      desc: 'Cardiovascular fitness classes for heart health and endurance'
    }
  })

  const strengthCategory = await prisma.classCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Strength Training',
      desc: 'Weight training and muscle building classes'
    }
  })

  const yogaCategory = await prisma.classCategory.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Yoga & Flexibility',
      desc: 'Mind-body classes focused on flexibility and relaxation'
    }
  })

  // Create sample classes
  const yogaClass = await prisma.class.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Morning Yoga Flow',
      desc: 'Start your day with energizing yoga poses and breathing exercises',
      instructorId: instructor.id,
      categoryId: yogaCategory.id,
      duration: 60,
      schedule: 'Monday, Wednesday, Friday at 7:00 AM',
      coverImageId: yogaClassImage.id
    }
  })

  // Create sample instructions
  await prisma.equipmentInstruction.upsert({
    where: { id: 1 },
    update: {},
    create: {
      equipmentId: equipment1.id,
      instructorId: instructor.id,
      title: 'How to Use the Treadmill Safely',
      description: 'Step-by-step guide:\n\n1. Start by stepping onto the side rails\n2. Set a comfortable speed (start with 2-3 mph)\n3. Hold the handrails initially for balance\n4. Keep your posture upright\n5. Land on the balls of your feet\n6. Gradually increase speed as you get comfortable\n7. Cool down by gradually reducing speed\n8. Step onto side rails to stop',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      safetyNotes: 'Always use the safety clip attached to your clothing. Never jump off a moving treadmill. Stay hydrated during your workout.'
    }
  })

  await prisma.equipmentInstruction.upsert({
    where: { id: 2 },
    update: {},
    create: {
      equipmentId: equipment2.id,
      instructorId: instructor.id,
      title: 'Proper Bench Press Technique',
      description: 'Correct form for bench pressing:\n\n1. Lie flat on the bench with feet firmly on the ground\n2. Grip the bar with hands slightly wider than shoulder-width\n3. Keep your back flat against the bench\n4. Lower the bar slowly to your chest\n5. Press the bar up in a controlled motion\n6. Keep your core engaged throughout\n7. Always use a spotter for heavy weights',
      youtubeUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
      safetyNotes: 'Never bench press alone without a spotter. Start with lighter weights to perfect your form. Ensure the bar is properly secured before starting.'
    }
  })

  console.log('Database seeded successfully!')
  console.log('Created users:')
  console.log('- Admin: admin@admin.com (password: asdfghjkl)')
  console.log('- Instructor: admin@gmail.com (password: asdfghjkl)')
  console.log('- Test User: shuvo@gmail.com (password: asdfghjkl)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
