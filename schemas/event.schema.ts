import { z } from "zod";

const eventTypeSchema = z
  .string()
  .refine(
    (value) => ["In-Person", "Hybrid", "Online"].includes(value),
    "Select a valid event type",
  );

const imageSchema = z
  .custom<File | null>(
    (value) =>
      value === null ||
      (typeof File !== "undefined" && value instanceof File),
    "Upload a valid image file",
  )
  .refine(
    (file): file is File => file !== null && file.size > 0,
    "An event image is required",
  )
  .refine((file) => file !== null && file.size <= 9 * 1024 * 1024, {
    message: "Event images must be 9 MB or smaller",
  })
  .refine((file) => file !== null && file.type.startsWith("image/"), {
    message: "Upload an image file",
  });

export const EventSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000),
  date: z.string().trim().min(1, "Date is required"),
  time: z.string().trim().min(1, "Time is required"),
  venue: z.string().trim().min(1, "Venue is required").max(100),
  location: z.string().trim().min(1, "Location is required"),
  image: imageSchema,
  type: eventTypeSchema,
  mode: z.string().trim().min(1, "Mode is required").max(100),
  audience: z.string().trim().min(1, "Audience is required").max(100),
  overview: z
    .string()
    .trim()
    .min(1, "Overview is required")
    .refine(
      (value) => value.split(/\n|,/).some((item) => item.trim().length > 0),
      "Add at least one overview point",
    ),
  agenda: z.array(
    z.object({
      time: z.string(),
      title: z.string(),
    }),
  ),
  organizerName: z.string().trim().min(1, "Organizer name is required"),
  about: z.string().trim().min(1, "About the organizer is required"),
  tags: z.string(),
});

export const EventDocumentSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(1000),
  date: z.string().trim().min(1),
  time: z.string().trim().min(1),
  venue: z.string().trim().min(1).max(100),
  location: z.string().trim().min(1),
  imageUrl: z.string().trim().min(1),
  type: z.enum(["In-Person", "Hybrid", "Online"]),
  mode: z.string().trim().min(1).max(100),
  audience: z.string().trim().min(1).max(100),
  overview: z.array(z.string().trim().min(1)),
  agenda: z.array(
    z.object({
      time: z.string().trim().min(1),
      title: z.string().trim().min(1),
    }),
  ),
  about: z.array(
    z.object({
      name: z.string().trim().min(1),
      description: z.string().trim().min(1),
    }),
  ),
  tags: z.array(z.string().trim().min(1)),
});

export type EventValues = z.infer<typeof EventSchema>;
export type EventDocument = z.infer<typeof EventDocumentSchema>;
