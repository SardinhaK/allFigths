import path from "node:path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

export function resolveDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  const raw = databaseUrl.replace(/^file:/, "");
  if (path.isAbsolute(raw)) {
    return `file:${raw}`;
  }
  const absolute = path.join(process.cwd(), raw.replace(/^\.\//, ""));
  return `file:${absolute}`;
}

export function createPrismaClient() {
  const adapter = new PrismaLibSql({
    url: resolveDatabaseUrl(),
  });
  return new PrismaClient({ adapter });
}
