import prisma from "@/lib/prismaDb";
import getSession from "./getSession";
import { User } from "@prisma/client";

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export default getCurrentUser;
