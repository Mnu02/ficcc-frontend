import { Event } from "@/types";
import { API_BASE_URL } from "@/services/api";

type EventResponse = Event[] | { data: Event[] };

function isEventArray(value: unknown): value is Event[] {
  return Array.isArray(value);
}

function getEventsFromResponse(payload: EventResponse): Event[] {
  if (isEventArray(payload)) {
    return payload;
  }

  return payload.data;
}

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const json: EventResponse = await res.json();
  return getEventsFromResponse(json);
}
