import { NextResponse } from "next/server";
import { getBookingCountAction } from "@/app/actions/bookings";
import { getEventAction } from "@/app/actions/event-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const event = await getEventAction(id);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 },
      );
    }

    const bookingCount = await getBookingCountAction(id);
    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event: { ...event, bookingCount },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
