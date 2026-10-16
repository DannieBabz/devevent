import "server-only";

import { Types } from "mongoose";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Bookings from "@/schemas/booking.model";
import Events from "@/schemas/event.model";

const bookingSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(254),
});

type BookingResult =
  | { success: true; bookingCount: number }
  | { success: false; status: 400 | 404 | 409 | 500; error: string };

export async function createBookingAction(
  eventId: string,
  email: unknown,
): Promise<BookingResult> {
  if (!Types.ObjectId.isValid(eventId)) {
    return { success: false, status: 404, error: "Event not found" };
  }

  const validatedEmail = bookingSchema.safeParse({ email });
  if (!validatedEmail.success) {
    return {
      success: false,
      status: 400,
      error: validatedEmail.error.issues[0]?.message ?? "Invalid email address",
    };
  }

  try {
    await connectDB();
    const eventObjectId = new Types.ObjectId(eventId);
    const eventExists = await Events.exists({ _id: eventObjectId });

    if (!eventExists) {
      return { success: false, status: 404, error: "Event not found" };
    }

    await Bookings.create({
      eventId: eventObjectId,
      email: validatedEmail.data.email.toLowerCase(),
    });

    const bookingCount = await Bookings.countDocuments({
      eventId: eventObjectId,
    });

    return { success: true, bookingCount };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        status: 409,
        error: "This email has already booked a spot for this event",
      };
    }

    console.error("Create booking action error:", error);
    return {
      success: false,
      status: 500,
      error: "Could not complete your booking. Please try again.",
    };
  }
}

export async function getBookingCountAction(eventId: string): Promise<number> {
  if (!Types.ObjectId.isValid(eventId)) {
    return 0;
  }

  await connectDB();
  return Bookings.countDocuments({ eventId: new Types.ObjectId(eventId) });
}
