import { useEffect, useState } from "react";
import { Video } from "@/types";
import { fetchVideos } from "@/services/media";

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      try {
        const data = await fetchVideos();

        if (!isMounted) {
          return;
        }

        setVideos(data);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Failed to load videos. Make sure the API is running.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { videos, loading, error };
}
