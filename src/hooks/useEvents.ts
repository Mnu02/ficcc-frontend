import { useEffect, useState } from "react";
import { Event } from "@/types";
import { fetchEvents } from "@/services/events";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const data = await fetchEvents();

        if (!isMounted) {
          return;
        }

        setEvents(data);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Failed to load events. Make sure the API is running.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return { events, loading, error };
}
