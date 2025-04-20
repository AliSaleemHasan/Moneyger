// prisma/seed.ts

import prisma from "@/prisma/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      name: `Test User`,
      password: `testpassword`,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
