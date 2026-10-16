"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EventTable from "@/components/dashboard/event-table";
import { getEvents } from "@/lib/api-client";
import type { Event } from "@/types/events";

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    getEvents()
      .then((data) => {
        if (isCurrent) {
          setEvents(data);
        }
      })
      .catch((loadError: unknown) => {
        if (isCurrent) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load events",
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
  }, []);

  return (
    <section className="my-10 text-accent">
      <Container>
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2>Event Management</h2>
              {!isLoading && !error && (
                <p className="text-sm text-gray-400">
                  {events.length} {events.length === 1 ? "event" : "events"}
                </p>
              )}
            </div>
            <Link
              href="/create-event"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Add Event
            </Link>
          </div>
          {error ? (
            <p className="my-8 text-center text-red-400" role="alert">
              Could not load events: {error}
            </p>
          ) : isLoading ? (
            <p className="my-8 text-center text-gray-400" role="status">
              Loading events...
            </p>
          ) : (
            <EventTable events={events} />
          )}
        </div>
      </Container>
    </section>
  );
}
