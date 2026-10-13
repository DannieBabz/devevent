import "server-only";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import Events from "@/schemas/event.model";
import type { Event } from "@/types/events";

export type EventPageData = Omit<Event, "createdAt" | "updatedAt">;

export async function getEvents(): Promise<EventPageData[]> {
  await connectDB();
  const events = await Events.find().sort({ createdAt: -1 }).lean();

  return events.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));
}

export async function getEventById(id: string): Promise<EventPageData | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();
  const event = await Events.findById(id).lean();

  return event ? { ...event, _id: event._id.toString() } : null;
}
