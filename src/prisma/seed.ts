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

function getRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Utility function to generate a random date between two dates.
function getRandomDate(start: Date, end: Date): Date {
  const diff = end.getTime() - start.getTime();
  return new Date(start.getTime() + Math.random() * diff);
}

async function populateRecords() {
  const numberOfRecords = 2000;

  // Define the date range: from one year ago until now.
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  // Pre-define the possible values.
  const types: ("EXPENSE" | "INCOME")[] = ["EXPENSE", "INCOME"];
  // Based on your seeded defaults:
  const possibleAccountIds = [1, 2, 3];
  const possibleCategoryIds = [1, 2, 3, 4, 5, 6, 7];

  // Build an array of records
  const records = Array.from({ length: numberOfRecords }).map((_, index) => {
    const createdAt = getRandomDate(oneYearAgo, now);
    const type = getRandom(types);
    // Random amount between 1.00 and 500.00 (rounded to 2 decimals)
    const amount = parseFloat((Math.random() * 500 + 1).toFixed(2));
    const accountId = getRandom(possibleAccountIds);
    const categoryId = getRandom(possibleCategoryIds);
    const note = `Seeded record ${index + 1}`;

    return {
      amount,
      type,
      note,
      createdAt,
      accountId,
      categoryId,
      userId: 1,
    };
  });

  // Use createMany for bulk insertion.
  // Note: createMany does not support nested writes (like connect), so we
  // pass the foreign keys directly.
  const result = await prisma.record.createMany({ data: records });
  console.log(`Inserted ${result.count} records.`);
}

async function main() {
  await prisma.user.create({
    data: {
      name: "test_user",
      email: "testUser@gmail.com",
      password: "$2b$10$1rcyCJVIuAu2/NM5pl6kgu5VgUwQ9ND0T5fpdMW7USiWfR.1DnDe.",
    },
  });
  await prisma.category.createMany({ data: defaultCategories });
  await prisma.account.createMany({ data: defaultAccounts });

  await populateRecords();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
