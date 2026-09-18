import { Schema, models, model } from "mongoose";
import { Event, AgendaItem, Organizer } from "@/types/events";

const AgendaItemSchema = new Schema<AgendaItem>(
  {
    time: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);
const OrganizerSchema = new Schema<Organizer>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const EventSchema = new Schema<Event>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["In-Person", "Hybrid", "Online"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    overview: {
      type: [String],
      required: [true, "Overview is required"],
      trim: true,
      maxlength: [100, "Overview cannot exceed 100 characters"],
    },
    venue: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    mode: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    audience: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    agenda: {
      type: [AgendaItemSchema],
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    about: {
      type: [OrganizerSchema],
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    tags: {
      type: [String],
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
  },
  {
    timestamps: true,
  },
);

const Events = models.Event || model<Event>("Event", EventSchema);
export default Events;
