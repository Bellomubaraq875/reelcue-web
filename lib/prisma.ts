import { PrismaClient } from "@prisma/client";

// Prevents creating a new PrismaClient on every hot-reload / serverless
// invocation. DATABASE_URL should point at Neon's pooled (pgbouncer)
// connection string — never the direct one — since Next.js API routes
// and server actions run as short-lived, highly concurrent functions.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
