import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismaDb";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, firstName, lastName } = body;

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      firstName,
      lastName,
    },
  });

  return NextResponse.json({ user: newUser }, { status: 201 });
}
