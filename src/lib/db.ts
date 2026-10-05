import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const raw = databaseUrl.replace(/^file:/, "");
  if (path.isAbsolute(raw)) {
    return `file:${raw}`;
  }
  return `file:${path.join(/*turbopackIgnore: true*/ process.cwd(), raw.replace(/^\.\//, ""))}`;
}

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: resolveDatabaseUrl(),
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
