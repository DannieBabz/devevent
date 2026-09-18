import React from "react";
import { FEATURED_EVENTS } from "@/lib/constants";
import { Container } from "@/components/shared/Container";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Event } from "@/types/events";
import { CalendarIcon, TimeIcon, LocationIcon, AudienceIcon, VenueIcon } from "@/components/icons";

interface EventDetailPageProps {
  params: Promise<{ event: string }>;
}

const EventDetails = async ({ params }: EventDetailPageProps) => {
  
  const { event } = await params;

  let events: Event[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/event`);

    if (response.ok) {
      const data = await response.json();
      events = data?.event || [];
    }
  } catch (error) {
    console.error("Failed to fetch featured events:", error);
  }

  const eventDetails =
    events.find(
      (e) => e._id === event || (e as any).id?.toString() === event,
    ) || FEATURED_EVENTS.find((e) => e.id.toString() === event);

  if (!eventDetails) {
    return (
      <div className="text-accent py-20">
        <Container>
          <h1 className="text-3xl font-bold">Event not found</h1>
          <p className="mt-2 text-gray-400">
            The event you are looking for does not exist.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <section className="text-accent my-20">
      <Container>
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
            <div className="flex flex-col gap-y-4 w-full lg:w-sm bg-[#0D161A] py-10 px-8 rounded-xl">
              <h2 className="font-semibold text-2xl">Book Your Spot</h2>
              <Label className="text-lg">Email Address</Label>
              <Input placeholder="Enter your email" className="py-5 text-xl" />
              <Button variant="secondary" className="text-black py-5 text-lg">
                Submit
              </Button>
            </div>
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
          

          {eventDetails.agenda && eventDetails.agenda.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold my-5">Agenda</h2>
              {eventDetails.agenda.map((item: any, index: number) => (
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

          {eventDetails.about && eventDetails.about.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold my-5">About the Organizer</h2>
              {eventDetails.about.map((item: any, index: number) => (
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

          {eventDetails.tags && eventDetails.tags.length > 0 && (
            <div className="flex flex-wrap gap-y-3 gap-x-3 mt-6">
              {eventDetails.tags.map((item: string, index: number) => (
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
};

export default EventDetails;
