"use client";

import { use, useEffect, useState, type FormEvent } from "react";
import { FEATURED_EVENTS } from "@/lib/constants";
import { createBooking, getEvent } from "@/lib/api-client";
import type { Event } from "@/types/events";
import { Container } from "@/components/shared/Container";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CalendarIcon,
  TimeIcon,
  LocationIcon,
  AudienceIcon,
  VenueIcon,
} from "@/components/icons";

interface EventDetailPageProps {
  params: Promise<{ event: string }>;
}

type EventDetailsData =
  | Event
  | ((typeof FEATURED_EVENTS)[number] & { bookingCount?: number });

export default function EventDetailsPage({ params }: EventDetailPageProps) {
  const { event: eventId } = use(params);
  const [eventDetails, setEventDetails] = useState<EventDetailsData | null>(
    () => FEATURED_EVENTS.find((item) => item.id.toString() === eventId) ?? null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getEvent(eventId)
      .then((event) => {
        if (isCurrent && event) {
          setEventDetails(event);
        }
      })
      .catch((loadError: unknown) => {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load event",
          );
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [eventId]);

  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBooking(true);
    setBookingMessage("");
    setBookingError(false);

    try {
      const bookingCount = await createBooking(eventId, email);
      setEventDetails((current) =>
        current ? { ...current, bookingCount } : current,
      );
      setEmail("");
      setBookingMessage("Your spot is booked.");
    } catch (bookingFailure) {
      setBookingError(true);
      setBookingMessage(
        bookingFailure instanceof Error
          ? bookingFailure.message
          : "Could not complete your booking. Please try again.",
      );
    } finally {
      setIsBooking(false);
    }
  }

  if (isLoading && !eventDetails) {
    return (
      <div className="text-accent py-20">
        <Container>
          <p role="status">Loading event...</p>
        </Container>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="text-accent py-20">
        <Container>
          <h1 className="text-3xl font-bold">Event not found</h1>
          <p className="mt-2 text-gray-400">
            {error || "The event you are looking for does not exist."}
          </p>
        </Container>
      </div>
    );
  }

  return (
    <section className="text-accent my-20">
      <Container>
        {error && (
          <p className="mb-4 text-red-400" role="alert">
            Could not refresh event data: {error}
          </p>
        )}
        <div className="w-3xl mb-10">
          <h1 className="text-xl md:text-5xl font-bold">
            {eventDetails.title}
          </h1>
          <p className="text-md mt-2">{eventDetails.description}</p>
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-y-10 justify-between">
          <div>
            <Image
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
              width={600}
              height={400}
              className="rounded-4xl"
            />
          </div>
          <div>
            <form
              onSubmit={handleBooking}
              className="flex flex-col gap-y-4 w-full lg:w-sm bg-[#0D161A] py-10 px-8 rounded-xl"
            >
              <h2 className="font-semibold text-2xl">Book Your Spot</h2>
              <Label htmlFor="booking-email" className="text-lg">
                Email Address
              </Label>
              <Input
                id="booking-email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="py-5 text-xl"
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={isBooking || isLoading}
                className="text-black py-5 text-lg"
              >
                {isBooking ? "Booking..." : "Book a spot"}
              </Button>
              {bookingMessage && (
                <p
                  role={bookingError ? "alert" : "status"}
                  className={bookingError ? "text-red-400" : "text-green-400"}
                >
                  {bookingMessage}
                </p>
              )}
              <p className="text-sm text-gray-400">
                {eventDetails.bookingCount ?? 0}{" "}
                {(eventDetails.bookingCount ?? 0) === 1 ? "person" : "people"}{" "}
                booked
              </p>
            </form>
          </div>
        </div>

        <div className="max-w-3xl text-lg">
          <div>
            <h2 className="text-2xl font-bold my-5">Overview</h2>
            {eventDetails.overview.map((item, index) => (
              <div key={index}>
                <p>{item}</p>
                <br />
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold my-5">Event Details</h2>
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <CalendarIcon />
                <p>Date: {eventDetails.date}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <TimeIcon />
                <p>Time: {eventDetails.time}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <LocationIcon />
                <p>Venue: {eventDetails.venue}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <VenueIcon />
                <p>Mode: {eventDetails.mode}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <AudienceIcon />
                <p>Audience: {eventDetails.audience}</p>
              </div>
            </div>
          </div>

          {eventDetails.agenda.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold my-5">Agenda</h2>
              {eventDetails.agenda.map((item, index) => (
                <ul key={index} className="flex px-10">
                  <li className="list-disc gap-y-3">
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <span>
                        <strong>{item.time}</strong> — {item.title}
                      </span>
                    )}
                  </li>
                </ul>
              ))}
            </div>
          )}

          {eventDetails.about.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold my-5">About the Organizer</h2>
              {eventDetails.about.map((item, index) => (
                <div key={index} className="mb-4">
                  {typeof item === "string" ? (
                    <p>{item}</p>
                  ) : (
                    <div>
                      <h3 className="font-semibold text-xl">{item.name}</h3>
                      <p className="text-gray-300 mt-1">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {eventDetails.tags.length > 0 && (
            <div className="flex flex-wrap gap-y-3 gap-x-3 mt-6">
              {eventDetails.tags.map((item, index) => (
                <div key={index} className="bg-[#0D161A] py-2 px-5 rounded-md">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
