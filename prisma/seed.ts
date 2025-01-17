import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcrypt";

const prisma = new PrismaClient().$extends(withAccelerate());
async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);
  const user1 = await prisma.user.upsert({
    where: { email: "guest@guest.io" },
    update: {
      hashedPassword: hashedPassword,
    },
    create: {
      email: "guest@guest.io",
      firstName: "Pookie",
      lastName: "Bear",
      hashedPassword: hashedPassword,
    },
  });

  console.log("Created user:", user1);

  const budget1 = await prisma.budget.create({
    data: {
      name: "Groceries",
      maxSpend: 1000,
      colorTag: "ARMY",
      user: {
        connect: { id: user1.id },
      },
      transactions: {
        create: [
          {
            title: "Groceries",
            amount: 200,
            type: "EXPENSE",
            date: new Date(),
            category: "Groceries",
            senderOrRecipient: "Tesco",
            userId: user1.id,
          },
          {
            title: "Groceries",
            amount: 150,
            type: "EXPENSE",
            date: new Date(),
            category: "Groceries",
            senderOrRecipient: "Kroger",
            userId: user1.id,
          },
          {
            title: "Groceries",
            amount: 90,
            type: "EXPENSE",
            date: new Date(),
            category: "Groceries",
            senderOrRecipient: "Walmart",
            userId: user1.id,
          },
        ],
      },
    },
    include: {
      transactions: true,
    },
  });

  console.log("Created budget1:", budget1);

  const budget2 = await prisma.budget.create({
    data: {
      name: "Night Out Budget",
      maxSpend: 800,
      colorTag: "GREEN",
      user: {
        connect: { id: user1.id },
      },
    },
  });

  console.log("Created budget2:", budget2);

  const budget3 = await prisma.budget.create({
    data: {
      name: "Bills",
      maxSpend: 2000,
      colorTag: "BLUE",
      user: {
        connect: { id: user1.id },
      },
      transactions: {
        create: [
          {
            title: "Rent",
            amount: 1000,
            isPaid: true,
            type: "EXPENSE",
            date: new Date(),
            category: "Rent",
            senderOrRecipient: "AVA Santa Monica",
            userId: user1.id,
          },
          {
            title: "Electricity",
            amount: 100,
            type: "EXPENSE",
            isPaid: true,
            date: new Date(),
            category: "Electricity",
            senderOrRecipient: "LADWP",
            userId: user1.id,
          },
          {
            title: "Water",
            amount: 50,
            isPaid: true,
            type: "EXPENSE",
            date: new Date(),
            category: "Water",
            senderOrRecipient: "LADWP",
            userId: user1.id,
          },
        ],
      },
    },
    include: {
      transactions: true,
    },
  });

  console.log("Created budget3:", budget3);

  const budget4 = await prisma.budget.create({
    data: {
      name: "Entertainment",
      maxSpend: 500,
      colorTag: "YELLOW",
      user: {
        connect: { id: user1.id },
      },
      transactions: {
        create: [
          {
            title: "Netflix",
            amount: 20,
            type: "EXPENSE",
            isPaid: true,
            date: new Date(),
            category: "Netflix",
            senderOrRecipient: "Netflix",
            userId: user1.id,
          },
          {
            title: "Spotify",
            amount: 10,
            isPaid: true,
            type: "EXPENSE",
            date: new Date(),
            category: "Spotify",
            senderOrRecipient: "Spotify",
            userId: user1.id,
          },
          {
            title: "Hulu",
            amount: 10,
            type: "EXPENSE",
            date: new Date(),
            category: "Hulu",
            senderOrRecipient: "Hulu",
            userId: user1.id,
          },
        ],
      },
    },
    include: {
      transactions: true,
    },
  });

  console.log("Created budget4:", budget4);

  for (const transaction of budget4.transactions) {
    const recurringPayment = await prisma.recurringPayment.create({
      data: {
        title: transaction.title,
        amount: transaction.amount,
        frequency: "MONTHLY",
        dueDate: new Date(),
        user: {
          connect: { id: user1.id },
        },
        transactions: {
          connect: { id: transaction.id },
        },
      },
      include: {
        transactions: true,
      },
    });
    console.log("Created recurringPayment for transaction:", recurringPayment);
  }

  for (const transaction of budget3.transactions) {
    const recurringPayment = await prisma.recurringPayment.create({
      data: {
        title: transaction.title,
        amount: transaction.amount,
        frequency: "MONTHLY",
        dueDate: new Date(),
        user: {
          connect: { id: user1.id },
        },
        transactions: {
          connect: { id: transaction.id },
        },
      },
      include: {
        transactions: true,
      },
    });
    console.log("Created recurringPayment for transaction:", recurringPayment);
  }

  const recurringIncome = await prisma.recurringPayment.create({
    data: {
      title: "Salary",
      amount: 6000,
      frequency: "MONTHLY",
      dueDate: new Date(),
      user: { connect: { id: user1.id } },
      transactions: {
        create: {
          title: "Salary",
          amount: 6000,
          isPaid: true,
          type: "INCOME",
          date: new Date(),
          category: "Salary",
          userId: user1.id,
        },
      },
    },
  });

  console.log("Created recurringIncome:", recurringIncome);

  const savingsPot = await prisma.pot.create({
    data: {
      title: "Savings",
      targetAmount: 5000,
      colorTag: "PURPLE",
      transactions: {
        create: {
          title: "Salary Contribution",
          amount: 300,
          type: "SAVINGS",
          date: new Date(),
          category: "Savings",
          userId: user1.id,
        },
      },
      user: {
        connect: { id: user1.id },
      },
    },
  });

  console.log("Created savingsPot:", savingsPot);

  const concertTicketPot = await prisma.pot.create({
    data: {
      title: "Concert Tickets",
      targetAmount: 200,
      colorTag: "RED",
      user: {
        connect: { id: user1.id },
      },
    },
  });
  console.log("Created concertTicketPot:", concertTicketPot);

  const newLaptopPot = await prisma.pot.create({
    data: {
      title: "New Laptop",
      targetAmount: 1500,
      colorTag: "ORANGE",
      user: {
        connect: { id: user1.id },
      },
    },
  });
  console.log("Created newLaptopPot:", newLaptopPot);

  const vacationPot = await prisma.pot.create({
    data: {
      title: "Vacation",
      targetAmount: 3000,
      colorTag: "GREY",
      user: {
        connect: { id: user1.id },
      },
    },
  });
  console.log("Created vacationPot:", vacationPot);
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
