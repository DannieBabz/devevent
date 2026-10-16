"use client";

import type { Event } from "@/types/events";

type ApiResponse<T> = {
  message?: string;
  event?: T;
  error?: string;
  bookingCount?: number;
};

const EVENTS_ENDPOINT = "/api/event";

async function apiRequest<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const response = await fetch(endpoint, {
    ...init,
    cache: "no-store",
  });

  let data: ApiResponse<T>;
  try {
    data = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new Error(`The events API returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data.error || data.message || `Request failed with status ${response.status}`,
    );
  }

  return data;
}

export async function getEvents(): Promise<Event[]> {
  const response = await apiRequest<Event[]>(EVENTS_ENDPOINT);
  if (!Array.isArray(response.event)) {
    throw new Error("The events API did not return an event list");
  }
  return response.event;
}

export async function getEvent(id: string): Promise<Event | null> {
  const response = await apiRequest<Event>(
    `${EVENTS_ENDPOINT}/${encodeURIComponent(id)}`,
  );
  return response.event ?? null;
}

export async function createEvent(formData: FormData): Promise<string> {
  const response = await apiRequest<{ _id: string }>(EVENTS_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.event?._id) {
    throw new Error("The events API did not return the created event");
  }

  return response.event._id;
}

export async function createBooking(
  eventId: string,
  email: string,
): Promise<number> {
  const response = await apiRequest<{ bookingCount: number }>(
    `${EVENTS_ENDPOINT}/${encodeURIComponent(eventId)}/bookings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    },
  );

  if (typeof response.bookingCount !== "number") {
    throw new Error("The booking API did not return an updated booking count");
  }

  return response.bookingCount;
}
