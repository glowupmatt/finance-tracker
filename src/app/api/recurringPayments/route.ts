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
