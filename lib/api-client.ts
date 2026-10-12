import axios from "axios";
import type { EventFormState } from "@/types/events";

type ApiResponse<T> = {
  message?: string;
  event?: T;
  error?: string;
};

export type CreateEventInput = Omit<EventFormState, "image"> & {
  image?: File | null;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await axios<ApiResponse<T>>(`${API_URL}${endpoint}`, {
      method: options?.method,
      data: options?.body,
      headers: Object.fromEntries(new Headers(options?.headers).entries()),
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiResponse<T> | undefined;
      throw new Error(
        data?.error || data?.message || error.message || "Something went wrong"
      );
    }
    throw error;
  }
}

export async function createEvent(
  formData: FormData
): Promise<EventFormState> {
  const data = await apiRequest<EventFormState>("/api/events", {
    method: "POST",
    body: formData as unknown as BodyInit,
  });

  if (!data.event) {
    throw new Error("Event was not returned from the API");
  }

  return data.event;
}