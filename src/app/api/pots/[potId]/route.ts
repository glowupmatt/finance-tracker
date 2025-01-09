import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { TransactionType } from "@prisma/client";

export async function GET({ params }: { params: Promise<{ potId: string }> }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }
    const pot = await prisma.pot.findUnique({
      where: {
        id: (await params).potId,
      },
      include: {
        transactions: true,
      },
    });

    if (currentUser.id !== pot?.userId) {
      return NextResponse.json(
        { error: "Access Not Granted" },
        { status: 403 }
      );
    }

    return NextResponse.json({ pot }, { status: 200 });
  } catch (error) {
    console.log("Error fetching pot:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

interface UpdatePotRequestBody {
  title?: string;
  targetAmount?: number;
  currentAmount?: number;
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
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const pot = await prisma.pot.findUnique({
      where: {
        id: (await params).potId,
      },
    });

    if (!pot) {
      return NextResponse.json({ error: "Pot not found" }, { status: 404 });
    }

    if (currentUser.id !== pot.userId) {
      return NextResponse.json(
        { error: "Access Not Granted" },
        { status: 403 }
      );
    }

    const body: UpdatePotRequestBody = await req.json();
    const { title, targetAmount, transactions } = body;

    const updatedPot = await prisma.pot.update({
      where: {
        id: pot.id,
      },
      include: {
        transactions: true,
      },
      data: {
        title,
        targetAmount,
        transactions:
          transactions && transactions.length > 0
            ? {
                createMany: {
                  data: transactions.map((transaction) => ({
                    title: transaction.title,
                    amount: transaction.amount,
                    date: transaction.date,
                    type: transaction.type,
                    category: transaction.category,
                    userId: currentUser.id,
                  })),
                },
              }
            : undefined,
      },
    });

    return NextResponse.json({ pot: updatedPot }, { status: 200 });
  } catch (error) {
    console.log("Error updating pot:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const pot = await prisma.pot.findUnique({
      where: {
        id: (await params).potId,
      },
    });

    if (!pot) {
      return NextResponse.json({ error: "Pot not found" }, { status: 404 });
    }

    if (currentUser.id !== pot.userId) {
      return NextResponse.json(
        { error: "Access Not Granted" },
        { status: 403 }
      );
    }

    await prisma.pot.delete({
      where: {
        id: pot.id,
      },
      include: {
        transactions: true,
      },
    });

    return NextResponse.json({ message: "Pot deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error deleting pot:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}
