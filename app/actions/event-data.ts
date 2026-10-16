import "server-only";

import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import Events, { type PersistedEvent } from "@/schemas/event.model";
import Bookings from "@/schemas/booking.model";
import type { Event } from "@/types/events";

function toEventDTO(
  value: PersistedEvent & { _id: Types.ObjectId },
): Event {
  return {
    _id: value._id.toString(),
    title: value.title,
    description: value.description,
    date: value.date,
    time: value.time,
    venue: value.venue,
    location: value.location,
    imageUrl: value.imageUrl,
    type: value.type,
    mode: value.mode,
    audience: value.audience,
    overview: value.overview,
    agenda: value.agenda,
    about: value.about,
    tags: value.tags,
    createdAt: value.createdAt.toISOString(),
    updatedAt: value.updatedAt.toISOString(),
  };
}

export async function getEventsAction(): Promise<Event[]> {
  await connectDB();
  const [events, bookingCounts] = await Promise.all([
    Events.find().sort({ createdAt: -1 }),
    Bookings.aggregate<{ _id: Types.ObjectId; count: number }>([
      { $group: { _id: "$eventId", count: { $sum: 1 } } },
    ]),
  ]);
  const countByEventId = new Map(
    bookingCounts.map(({ _id, count }) => [_id.toString(), count]),
  );

  return events.map((event) => ({
    ...toEventDTO(event),
    bookingCount: countByEventId.get(event._id.toString()) ?? 0,
  }));
}

export async function getEventAction(id: string): Promise<Event | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();
  const event = await Events.findById(id);
  if (!event) {
    return null;
  }

  const bookingCount = await Bookings.countDocuments({ eventId: event._id });
  return { ...toEventDTO(event), bookingCount };
}
