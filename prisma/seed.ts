// 1
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// 2
const prisma = new PrismaClient().$extends(withAccelerate());

// 3
// ... you will write your Prisma Client queries here
async function main() {
  // Seed the database with users and transactions
  const user1 = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      firstName: "Alice",
      lastName: "Prisma",
      hashedPassword: "password",
    },
  });

  const budget1 = await prisma.budget.create({
    data: {
      name: "Budget 1",
      maxSpend: 1000,
      user: {
        connect: { id: user1.id },
      },
    },
  });

  const budget2 = await prisma.budget.create({
    data: {
      name: "Budget 2",
      maxSpend: 2000,
      user: {
        connect: { id: user1.id },
      },
    },
  });

  await prisma.pot.create({
    data: {
      title: "Pot 1",
      targetAmount: 5000,
      transactions: {
        create: {
          title: "Pot 1",
          amount: 500,
          type: "INCOME",
          date: new Date(),
          category: "Pot",
          userId: user1.id,
        },
      },
      user: {
        connect: { id: user1.id },
      },
    },
  });

  await prisma.recurringPayment.create({
    data: {
      title: "Rent",
      dueDate: new Date(),
      amount: 1000,
      frequency: "MONTHLY",
      transactions: {
        create: {
          title: "Rent",
          amount: 1000,
          type: "EXPENSE",
          date: new Date(),
          category: "Rent",
          userId: user1.id,
        },
      },
      user: {
        connect: { id: user1.id },
      },
    },
  });

  const transaction1 = await prisma.transaction.create({
    data: {
      title: "Salary",
      amount: 1000,
      type: "INCOME",
      date: new Date(),
      category: "Salary",
      userId: user1.id,
      budgetId: budget1.id,
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      title: "Freelance",
      amount: 200,
      type: "INCOME",
      date: new Date(),
      category: "Freelance",
      userId: user1.id,
      budgetId: budget2.id,
    },
  });

  console.log(`Created user: ${user1.firstName}`);
  console.log(`Created transactions: ${transaction1.id}, ${transaction2.id}`);
}

// 4
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    // 5
    await prisma.$disconnect();
    process.exit(1);
  });
