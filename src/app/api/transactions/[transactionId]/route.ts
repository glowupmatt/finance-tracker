import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { Transaction } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }
    const transaction = await prisma.transaction.findUnique({
      where: { id: (await params).transactionId },
    });

    if (currentUser.id !== transaction?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ transaction }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: (await params).transactionId },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    if (currentUser.id !== transaction.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body: Partial<Transaction> = await req.json();
    const updatedTransaction = await prisma.transaction.update({
      where: { id: (await params).transactionId },
      data: body,
    });
    if (!updatedTransaction) {
      return NextResponse.json(
        { error: "Error updating transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { transaction: updatedTransaction, message: "Transaction updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: (await params).transactionId },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    if (currentUser.id !== transaction.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: { id: (await params).transactionId },
    });

    if (!deletedTransaction) {
      return NextResponse.json(
        { error: "Error deleting transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { transaction: deletedTransaction, message: "Transaction deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}
