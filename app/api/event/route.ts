import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/schemas/event.schema";
import { v2 as cloudinary } from "cloudinary"

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const contentType = request.headers.get("content-type") || "";
    let eventData: Record<string, unknown> = {};
    let formData: FormData | null = null;

    if (contentType.includes("application/json")) {
      eventData = await request.json();
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      formData = await request.formData();
      eventData = Object.fromEntries(formData.entries());

      // Attempt to parse stringified JSON or comma-separated values for array/object fields
      const jsonFields = ["overview", "tags", "agenda", "about"];
      for (const field of jsonFields) {
        if (typeof eventData[field] === "string") {
          try {
            eventData[field] = JSON.parse(eventData[field] as string);
          } catch {
            if (["tags", "overview"].includes(field)) {
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
          {
            message: "Unsupported Content-Type. Please send JSON or FormData.",
          },
          { status: 400 },
        );
      }
    }

    const file = formData ? (formData.get("image") as File | null) : null;

    if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "event-images",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          )
          .end(buffer);
      });

      eventData.imageUrl = (uploadResult as { secure_url: string }).secure_url;
    } else if (!eventData.imageUrl) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    delete eventData.image;

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


export async function GET() {
  try {
    await connectDB();
    const event = await Events.find().sort({createdAt: -1})
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
