import "server-only";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import Events from "@/schemas/event.model";
import { EventDocumentSchema, EventSchema } from "@/schemas/event.schema";

function splitList(value: string): string[] {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatValidationError(error: {
  issues: { path: PropertyKey[]; message: string }[];
}): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "event"}: ${issue.message}`)
    .join(", ");
}

export async function createEventAction(formData: FormData) {
  let agenda: unknown;
  const agendaValue = formData.get("agenda");

  if (typeof agendaValue !== "string") {
    return { success: false, status: 400, error: "Agenda data is missing" };
  }

  try {
    agenda = JSON.parse(agendaValue);
  } catch {
    return { success: false, status: 400, error: "Agenda data is invalid" };
  }

  const validatedForm = EventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    venue: formData.get("venue"),
    location: formData.get("location"),
    image: formData.get("image"),
    type: formData.get("type"),
    mode: formData.get("mode"),
    audience: formData.get("audience"),
    overview: formData.get("overview"),
    agenda,
    organizerName: formData.get("organizerName"),
    about: formData.get("about"),
    tags: formData.get("tags"),
  });

  if (!validatedForm.success) {
    return {
      success: false,
      status: 400,
      error: formatValidationError(validatedForm.error),
    };
  }

  const values = validatedForm.data;
  const eventData = EventDocumentSchema.safeParse({
    title: values.title,
    description: values.description,
    date: values.date,
    time: values.time,
    venue: values.venue,
    location: values.location,
    imageUrl: "pending",
    type: values.type,
    mode: values.mode,
    audience: values.audience,
    overview: splitList(values.overview),
    agenda: values.agenda.filter(
      (item) => item.time.trim() && item.title.trim(),
    ),
    about: [{ name: values.organizerName, description: values.about }],
    tags: splitList(values.tags),
  });

  if (!eventData.success) {
    return {
      success: false,
      status: 400,
      error: formatValidationError(eventData.error),
    };
  }

  try {
    await connectDB();

    const imageBuffer = Buffer.from(
      await values.image.arrayBuffer(),
    );
    const imageUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "event-images" },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            if (!result?.secure_url) {
              reject(new Error("Image upload did not return a secure URL"));
              return;
            }
            resolve(result.secure_url);
          },
        )
        .end(imageBuffer);
    });

    const event = await Events.create({
      ...eventData.data,
      imageUrl,
    });
    revalidatePath("/");
    revalidatePath("/dashboard");

    return {
      success: true,
      event: {
        _id: event._id.toString(),
      },
    };
  } catch (error) {
    console.error("Create event action error:", error);

    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create event",
    };
  }
}