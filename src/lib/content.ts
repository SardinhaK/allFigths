import { prisma } from "@/lib/db";

export async function getUnitsWithDetails() {
  return prisma.unit.findMany({
    orderBy: { name: "asc" },
    include: {
      plans: { orderBy: { priceCents: "asc" } },
      schedules: { orderBy: [{ sortOrder: "asc" }, { time: "asc" }] },
    },
  });
}

export async function getPublishedEvents() {
  return prisma.event.findMany({
    where: { published: true },
    orderBy: { startsAt: "asc" },
  });
}
