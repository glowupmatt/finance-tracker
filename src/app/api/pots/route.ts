import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Authorization Required" },
      { status: 401 }
    );
  }

  if (currentUser) {
    try {
      const pots = await prisma.pot.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          transactions: true,
        },
      });
      return NextResponse.json({ pots }, { status: 200 });
    } catch (error) {
      console.error("Error fetching pots:", error);
      return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
    }
  }
}
