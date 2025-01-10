import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
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
      try {
        const budgets = await prisma.budget.findMany({
          where: {
            userId: currentUser.id,
          },
          include: {
            transactions: true,
          },
        });
        return NextResponse.json({ budgets }, { status: 200 });
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
