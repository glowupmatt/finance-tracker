import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { TransactionType } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ recurringPaymentsId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    if (currentUser) {
      const recurringBill = await prisma.recurringPayment.findUnique({
        where: {
          id: (await params).recurringPaymentsId,
        },
      });

      if (!recurringBill) {
        return NextResponse.json(
          { error: "Recurring Bill not found" },
          { status: 404 }
        );
      }

      if (currentUser.id !== recurringBill?.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      return NextResponse.json({ recurringBill }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export interface UpdateRecurringBillRequestBody {
  id: string;
  title: string;
  dueDate: Date;
  amount: number;
  paid: boolean;
  frequency: "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";
  endDate: Date | null;
  userId: string;
  transactions?: Array<{
    id?: string;
    title: string;
    amount: number;
    date: Date;
    type: TransactionType;
    isPaid: boolean;
    category: string;
  }>;
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ recurringPaymentsId: string }>;
    body: UpdateRecurringBillRequestBody;
  }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const recurringBill = await prisma.recurringPayment.findUnique({
      where: { id: (await params).recurringPaymentsId },
    });

    if (!recurringBill) {
      return NextResponse.json(
        { error: "Recurring Bill not found" },
        { status: 404 }
      );
    }

    if (currentUser.id !== recurringBill?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body: UpdateRecurringBillRequestBody = await req.json();

    if (body.transactions) {
      for (const transaction of body.transactions) {
        if (!Object.values(TransactionType).includes(transaction.type)) {
          return NextResponse.json(
            { error: `Invalid transaction type: ${transaction.type}` },
            { status: 400 }
          );
        }
      }
    }

    const updatedRecurringBill = await prisma.recurringPayment.update({
      where: { id: recurringBill.id },
      include: { transactions: true },
      data: {
        title: body.title,
        amount: body.amount,
        dueDate: body.dueDate,
        paid: body.paid,
        frequency: body.frequency,
        endDate: body.endDate,
        transactions: {
          create:
            body.transactions?.map((transaction) => ({
              title: transaction.title,
              amount: transaction.amount,
              date: transaction.date,
              type: transaction.type,
              category: transaction.category,
              isPaid: transaction.isPaid,
              userId: currentUser.id,
            })) || [],
        },
      },
    });

    return NextResponse.json({ updatedRecurringBill }, { status: 200 });
  } catch (error) {
    console.error("Error updating recurring bill:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ recurringPaymentsId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const recurringBill = await prisma.recurringPayment.findUnique({
      where: { id: (await params).recurringPaymentsId },
    });

    if (!recurringBill) {
      return NextResponse.json(
        { error: "Recurring Bill not found" },
        { status: 404 }
      );
    }

    if (currentUser.id !== recurringBill?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const deletedRecurringBill = await prisma.recurringPayment.delete({
      where: { id: recurringBill.id },
    });

    return NextResponse.json({ deletedRecurringBill }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recurring bill:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}
