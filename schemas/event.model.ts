import { model, models, Schema, type Model } from "mongoose";
import type { EventDocument } from "@/schemas/event.schema";
import type { AgendaItem, Organizer } from "@/types/events";

export type PersistedEvent = EventDocument & {
  createdAt: Date;
  updatedAt: Date;
};

const AgendaItemSchema = new Schema<AgendaItem>(
  {
    time: { type: String, required: true },
    title: { type: String, required: true },
  },
  { _id: false },
);

const OrganizerSchema = new Schema<Organizer>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const EventModelSchema = new Schema<PersistedEvent>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["In-Person", "Hybrid", "Online"],
    },
    mode: { type: String, required: true, trim: true, maxlength: 100 },
    audience: { type: String, required: true, trim: true, maxlength: 100 },
    overview: { type: [String], required: true },
    agenda: { type: [AgendaItemSchema], required: true },
    about: { type: [OrganizerSchema], required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true },
);

const Events =
  (models.Event as Model<PersistedEvent> | undefined) ??
  model<PersistedEvent>("Event", EventModelSchema);

export default Events;
