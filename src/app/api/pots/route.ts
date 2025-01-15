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

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Authorization Required" },
      { status: 401 }
    );
  }

  if (currentUser) {
    const { title, targetAmount, colorTag } = await request.json();

    if (!title || !targetAmount || !colorTag) {
      return NextResponse.json(
        { error: "Title and targetAmount are required" },
        { status: 400 }
      );
    }

    try {
      const newPot = await prisma.pot.create({
        data: {
          title,
          targetAmount,
          colorTag,
          userId: currentUser.id,
        },
      });
      return NextResponse.json({ newPot }, { status: 201 });
    } catch (error) {
      console.error("Error creating pot:", error);
      return NextResponse.json({ error: "Error in the DB" }, { status: 500 });
    }
  }
}
