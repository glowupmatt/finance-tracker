import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { UpdateRecurringBillRequestBody } from "./[recurringPaymentsId]/route";
import { TransactionType } from "@prisma/client";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    if (currentUser) {
      const recurringPayments = await prisma.recurringPayment.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          transactions: true,
        },
      });
      return NextResponse.json({ recurringPayments }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const body: UpdateRecurringBillRequestBody = await request.json();

    const { title, amount, dueDate, paid, frequency, transactions } = body;

    // Validate transaction types
    if (transactions && paid) {
      for (const transaction of transactions) {
        if (!Object.values(TransactionType).includes(transaction.type)) {
          return NextResponse.json(
            { error: `Invalid transaction type: ${transaction.type}` },
            { status: 400 }
          );
        }
      }
      const newRecurringPaymentWithTransaction =
        await prisma.recurringPayment.create({
          data: {
            title,
            amount,
            dueDate,
            paid,
            frequency,
            userId: currentUser.id,
            transactions: {
              create:
                transactions?.map((transaction) => ({
                  title: transaction.title,
                  amount: transaction.amount,
                  date: transaction.date,
                  type: transaction.type,
                  category: transaction.category,
                  isPaid: true,
                  userId: currentUser.id,
                })) || [],
            },
          },
          include: { transactions: true },
        });
      return NextResponse.json(
        { newRecurringPaymentWithTransaction },
        { status: 200 }
      );
    }

    const newRecurringPayment = await prisma.recurringPayment.create({
      data: {
        title,
        amount,
        dueDate,
        paid,
        frequency,
        userId: currentUser.id,
      },
    });

    return NextResponse.json({ newRecurringPayment }, { status: 200 });
  } catch (error) {
    console.error("Error creating recurring payment:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}
