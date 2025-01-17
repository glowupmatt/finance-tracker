import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { Budget } from "@prisma/client";

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

// interface UpdateBudgetRequestBody {
//   id: string;
//   name: string;
//   maxSpend: number;
//   userId: string;
//   transactions: Array<{
//     id?: string;
//     title: string;
//     amount: number;
//     date: Date;
//     type: TransactionType;
//     category: string;
//   }>;
// }

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

    const body = await req.json();
    const { name, maxSpend, colorTag, amount, title } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      name,
      maxSpend,
      colorTag,
    };

    if (amount !== undefined && amount !== null) {
      data.transactions = {
        create: {
          title: title,
          amount: amount,
          date: new Date(),
          type: "EXPENSE",
          category: name,
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      };
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: budget.id },
      data,
      include: {
        transactions: true,
      },
    });
    console.log(body);
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
