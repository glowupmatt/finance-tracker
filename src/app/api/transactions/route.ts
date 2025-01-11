import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Authorization Required" },
      { status: 401 }
    );
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: currentUser.id,
    },
  });
  return NextResponse.json({ transactions }, { status: 200 });
}
