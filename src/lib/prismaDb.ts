import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClient = new PrismaClient().$extends(withAccelerate());

declare global {
  // eslint-disable-next-line no-var
  var prisma: typeof prismaClient | undefined;
}
const client = globalThis.prisma || prismaClient;

if (process.env.NODE_ENV === "production") globalThis.prisma = client;

export default client;
