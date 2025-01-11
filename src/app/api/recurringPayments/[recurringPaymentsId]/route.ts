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

interface UpdateRecurringBillRequestBody {
  id: string;
  title: string;
  dueDate: Date;
  amount: number;
  paid: boolean;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  endDate: Date | null;
  userId: string;
  transactions?: Array<{
    id?: string;
    title: string;
    amount: number;
    date: Date;
    type: TransactionType;
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
        transactions:
          body.transactions && body.transactions.length > 0
            ? {
                upsert: body.transactions.map((transaction) => ({
                  where: { id: transaction.id },
                  update: {
                    title: transaction.title,
                    amount: transaction.amount,
                    date: transaction.date,
                    type: transaction.type,
                    category: transaction.category,
                    userId: currentUser.id,
                  },
                  create: {
                    title: transaction.title,
                    amount: transaction.amount,
                    date: transaction.date,
                    type: transaction.type,
                    category: transaction.category,
                    userId: currentUser.id,
                  },
                })),
              }
            : undefined,
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
