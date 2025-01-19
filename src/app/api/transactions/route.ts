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

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Authorization Required" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const {
    title,
    amount,
    date,
    type,
    category,
    budgetId,
    potId,
    senderOrRecipient,
  } = body;

  if (!title || !amount || !date || !type || !category) {
    return NextResponse.json(
      { error: "Title, amount, date, type, and category are required" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {
    title,
    amount,
    date: new Date(date),
    type,
    category,
    userId: currentUser.id,
    senderOrRecipient: senderOrRecipient || "",
  };

  if (budgetId) {
    const budget = await prisma.budget.findUnique({ where: { id: budgetId } });
    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    if (currentUser.id !== budget.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    data.budget = {
      connect: {
        id: budgetId,
      },
    };
  }

  if (potId) {
    const pot = await prisma.pot.findUnique({ where: { id: potId } });
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
  }

  const transaction = await prisma.transaction.create({
    data,
  });

  return NextResponse.json({ transaction }, { status: 201 });
}
