import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";

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

    const body = await request.json();

    const { title, amount, dueDate, paid, frequency } = body;

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
