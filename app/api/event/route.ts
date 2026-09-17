import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/schemas/event.schema";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const contentType = request.headers.get("content-type") || "";
    let eventData: Record<string, unknown>;

    if (contentType.includes("application/json")) {
      eventData = await request.json();
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      eventData = Object.fromEntries(formData.entries());

      // Attempt to parse stringified JSON or comma-separated values for array/object fields
      const jsonFields = ["overview", "details", "tags", "agenda", "about"];
      for (const field of jsonFields) {
        if (typeof eventData[field] === "string") {
          try {
            eventData[field] = JSON.parse(eventData[field] as string);
          } catch {
            if (["tags", "overview", "details"].includes(field)) {
              eventData[field] = (eventData[field] as string)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
            }
          }
        }
      }
    } else {
      // Default to attempting JSON parse if content-type header is not set
      try {
        eventData = await request.json();
      } catch {
        return NextResponse.json(
          { message: "Unsupported Content-Type. Please send JSON or FormData." },
          { status: 400 },
        );
      }
    }

    const createdEvent = await Events.create(eventData);
    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.error("Error creating event:", err);
    return NextResponse.json(
      {
        message: "Failed to create event",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
