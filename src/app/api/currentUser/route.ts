import { NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const { email } = await req.json();

  const currentUser = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
    include: {
      pots: {
        include: {
          transactions: true,
        },
      },
      budgets: {
        include: {
          transactions: true,
        },
      },
      recurringPayments: {
        include: {
          transactions: true,
        },
      },
      transactions: true,
    },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: currentUser }, { status: 200 });
}

export async function PUT(req: Request) {
  const { email, firstName, lastName, profilePhoto } = await req.json();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (currentUser) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          firstName,
          lastName,
          profilePicture: profilePhoto,
        },
      });
      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }
}
