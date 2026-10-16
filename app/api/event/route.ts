import { NextResponse } from "next/server";
import { createEventAction } from "@/app/actions/save-event";
import { getEventsAction } from "@/app/actions/event-data";

export async function GET() {
  try {
    const events = await getEventsAction();
    return NextResponse.json(
      { message: "Events fetched successfully", event: events },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Expected multipart form data" },
      { status: 400 },
    );
  }

  const result = await createEventAction(formData);
  if (!result.success) {
    return NextResponse.json(
      { message: "Failed to create event", error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json(
    { message: "Event created successfully", event: result.event },
    { status: 201 },
  );
}
