// Prisma client initialization with graceful fallback
/* eslint-disable @typescript-eslint/no-explicit-any */

let prismaInstance: any = null;

try {
  // Dynamically require to prevent compile-time failure before prisma generate
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as { prisma: any };
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} catch {
  // Prisma client not yet generated; Supabase is the primary interface
  prismaInstance = null;
}

export const prisma = prismaInstance;
