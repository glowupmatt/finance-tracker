import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";

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

    const body = await req.json();
    const {
      title,
      amount,
      type,
      category,
      budgetId,
      potId,
      senderOrRecipient,
      isPaid,
    } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      title,
      amount,
      type,
      category,
      isPaid,
      senderOrRecipient: senderOrRecipient || "",
      // user: currentUser.id,
    };

    // Check and update budget connection
    if (budgetId && budgetId !== transaction.budgetId) {
      const budget = await prisma.budget.findUnique({
        where: { id: budgetId },
      });
      if (!budget) {
        return NextResponse.json(
          { error: "Budget not found" },
          { status: 404 }
        );
      }

      if (currentUser.id !== budget.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      data.budget = {
        connect: {
          id: budgetId,
        },
      };
    } else if (!budgetId && transaction.budgetId) {
      // Disconnect existing budget if budgetId is not provided in the request
      data.budget = {
        disconnect: true,
      };
    }

    // Check and update pot connection
    if (potId && potId !== transaction.potId) {
      const pot = await prisma.pot.findUnique({
        where: { id: potId },
      });
      if (!pot) {
        return NextResponse.json({ error: "Pot not found" }, { status: 404 });
      }

      if (currentUser.id !== pot.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      data.pot = {
        connect: {
          id: potId,
        },
      };
    } else if (!potId && transaction.potId) {
      // Disconnect existing pot if potId is not provided in the request
      data.pot = {
        disconnect: true,
      };
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: (await params).transactionId },
      data,
    });

    return NextResponse.json(
      { transaction: updatedTransaction, message: "Transaction updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
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
