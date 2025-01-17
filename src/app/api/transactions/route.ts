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
  const page = parseInt(url.searchParams.get("page") || "0", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "0", 10);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: currentUser.id,
    },
    skip: page > 0 && pageSize > 0 ? (page - 1) * pageSize : undefined,
    take: pageSize > 0 ? pageSize : undefined,
    orderBy: {
      date: "desc",
    },
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
        page: page > 0 ? page : 1,
        pageSize: pageSize > 0 ? pageSize : totalTransactions,
        totalTransactions,
        totalPages: pageSize > 0 ? Math.ceil(totalTransactions / pageSize) : 1,
      },
    },
    { status: 200 }
  );
}
