// prisma/seed.ts

import prisma from "@/prisma/prisma";
import { Category, Account } from "generated";
const defaultCategories: Partial<Category>[] = [
  { description: "Car, Plane, Train ..etc", name: "Transportation" },
  { description: "Furniture, Electronics ...etc ", name: "HouseHold" },
  { description: "Phone, landline, WIFI", name: "Communication" },
  { description: "Friend, Fellowship, Alumni, Dues", name: "Social Life" },
  { description: "Dogs, Cats, Birds ..etc", name: "Pets" },
  { description: "Books, Moview, Music, Apps", name: "Culture" },
  { description: "Clothing, Fashion, Shoews, Laundry", name: "Apparel" },
];

const defaultAccounts: Partial<Account>[] = [
  { name: "Revolute" },
  { name: "Cash" },
  { name: "OTP" },
];
async function main() {
  await prisma.category.createMany({ data: defaultCategories });
  await prisma.account.createMany({ data: defaultAccounts });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
