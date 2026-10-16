import { NextResponse } from "next/server";
import { createBookingAction } from "@/app/actions/bookings";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Expected a JSON request body" },
      { status: 400 },
    );
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? body.email
      : undefined;

  const result = await createBookingAction(id, email);
  if (!result.success) {
    return NextResponse.json(
      { message: result.error, error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json(
    {
      message: "Your spot is booked",
      bookingCount: result.bookingCount,
    },
    { status: 201 },
  );
}
