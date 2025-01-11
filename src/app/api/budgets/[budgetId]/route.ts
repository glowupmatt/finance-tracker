import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { Budget, TransactionType } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ budgetId: string }> }
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
      try {
        const budget = await prisma.budget.findUnique({
          where: {
            id: (await params).budgetId,
          },
          include: {
            transactions: true,
          },
        });

        if (!budget) {
          return NextResponse.json(
            { error: "Budget not found" },
            { status: 404 }
          );
        }

        if (currentUser.id !== budget?.userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ budget }, { status: 200 });
      } catch (error) {
        console.error("Error fetching budgets:", error);
        return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

interface UpdateBudgetRequestBody {
  id: string;
  name: string;
  maxSpend: number;
  userId: string;
  transactions: Array<{
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
  { params }: { params: Promise<{ budgetId: string }>; body: Budget }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const budget = await prisma.budget.findUnique({
      where: { id: (await params).budgetId },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    if (currentUser.id !== budget?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body: UpdateBudgetRequestBody = await req.json();
    const updatedBudget = await prisma.budget.update({
      where: { id: budget.id },
      include: {
        transactions: true,
      },
      data: {
        name: body.name,
        maxSpend: body.maxSpend,
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

    return NextResponse.json({ budget: updatedBudget }, { status: 200 });
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ budgetId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const budget = await prisma.budget.findUnique({
      where: { id: (await params).budgetId },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    if (currentUser.id !== budget.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.budget.delete({
      where: { id: budget.id },
    });

    return NextResponse.json({ message: "Budget deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}
