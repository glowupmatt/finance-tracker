import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }
    const pot = await prisma.pot.findUnique({
      where: {
        id: (await params).potId,
      },
      include: {
        transactions: true,
      },
    });

    if (currentUser.id !== pot?.userId) {
      return NextResponse.json(
        { error: "Access Not Granted" },
        { status: 403 }
      );
    }

    return NextResponse.json({ pot }, { status: 200 });
  } catch (error) {
    console.log("Error fetching pot:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const pot = await prisma.pot.findUnique({
      where: {
        id: (await params).potId,
      },
    });

    if (!pot) {
      return NextResponse.json({ error: "Pot not found" }, { status: 404 });
    }

    if (currentUser.id !== pot.userId) {
      return NextResponse.json(
        { error: "Access Not Granted" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, targetAmount, colorTag, isDeposit, amount } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      title,
      targetAmount,
      colorTag,
    };

    if (amount !== undefined && amount !== null) {
      data.transactions = {
        create: {
          title: pot.title,
          amount: isDeposit ? amount : amount * -1,
          date: new Date(),
          type: "SAVINGS",
          category: "Savings",
          user: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      };
    }

    const updatedPot = await prisma.pot.update({
      where: {
        id: pot.id,
      },
      include: {
        transactions: true,
      },
      data,
    });

    return NextResponse.json({ pot: updatedPot }, { status: 200 });
  } catch (error) {
    console.log("Error updating pot:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authorization Required" },
        { status: 401 }
      );
    }

    const pot = await prisma.pot.findUnique({
      where: {
        id: (await params).potId,
      },
    });

    if (!pot) {
      return NextResponse.json({ error: "Pot not found" }, { status: 404 });
    }

    if (currentUser.id !== pot.userId) {
      return NextResponse.json(
        { error: "Access Not Granted" },
        { status: 403 }
      );
    }

    await prisma.pot.delete({
      where: {
        id: pot.id,
      },
      include: {
        transactions: true,
      },
    });

    return NextResponse.json({ message: "Pot deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error deleting pot:", error);
    return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
  }
}
