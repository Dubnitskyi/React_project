import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password
    }
  })
  await prisma.category.upsert({
    where: { name: 'IT' },
    update: {},
    create: { name: 'IT' }
  })

  await prisma.category.upsert({
    where: { name: 'Math' },
    update: {},
    create: { name: 'Math' }
  })

  await prisma.category.upsert({
    where: { name: 'Soft skills' },
    update: {},
    create: { name: 'Soft skills' }
  })

  await prisma.category.upsert({
    where: { name: 'Other' },
    update: {},
    create: { name: 'Other' }
  })

  await prisma.tag.upsert({
    where: { name: 'Python' },
    update: {},
    create: { name: 'Python', color: '#003ab1' }
  })

  await prisma.tag.upsert({
    where: { name: 'C#' },
    update: {},
    create: { name: 'C#', color: '#6600ff' }
  })

  await prisma.tag.upsert({
    where: { name: 'JavaScript' },
    update: {},
    create: { name: 'JavaScript', color: '#ffae00' }
  })

}


main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
