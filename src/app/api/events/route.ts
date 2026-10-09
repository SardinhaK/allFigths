import { NextResponse } from "next/server";
import { getPublishedEvents } from "@/lib/content";

export async function GET() {
  const events = await getPublishedEvents();
  return NextResponse.json({
    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      summary: event.summary,
      imageUrl: event.imageUrl,
      startsAt: event.startsAt.toISOString(),
    })),
  });
}
