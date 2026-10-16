import { model, models, type Model } from "mongoose";
import { BookingSchema } from "@/schemas/booking.schema";
import type { Booking } from "@/types/booking";

const Bookings =
  (models.Booking as Model<Booking> | undefined) ??
  model<Booking>("Booking", BookingSchema);

export default Bookings;
