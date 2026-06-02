import { useEffect, useState } from "react";
import { Announcement } from "@/types";
import { fetchAnnouncements } from "@/services/announcements";

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();

        if (!isMounted) {
          return;
        }

        setAnnouncements(data);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Failed to load announcements. Make sure the API is running.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  return { announcements, loading, error };
}
