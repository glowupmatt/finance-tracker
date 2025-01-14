import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Authorization Required" },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: currentUser.id,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalTransactions = await prisma.transaction.count({
    where: {
      userId: currentUser.id,
    },
  });

  return NextResponse.json(
    {
      transactions,
      pagination: {
        page,
        pageSize,
        totalTransactions,
        totalPages: Math.ceil(totalTransactions / pageSize),
      },
    },
    { status: 200 }
  );
}
