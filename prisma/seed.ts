// prisma/seed.ts

import {PrismaClient} from "../src/generated/prisma"
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      name: `Test User`,
      password: `testpassword`,
      
    },
  })

  
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
