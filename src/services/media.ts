import { Video } from '@/types';
import { API_BASE_URL } from "@/services/api";

type VideoResponse = Video[] | { data: Video[] };

function isVideoArray(value: unknown): value is Video[] {
  return Array.isArray(value);
}

function getVideosFromResponse(payload: VideoResponse): Video[] {
  if (isVideoArray(payload)) {
    return payload;
  }

  return payload.data;
}

export async function fetchVideos(): Promise<Video[]> {
  const res = await fetch(`${API_BASE_URL}/videos`);

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  const json: VideoResponse = await res.json();
  return getVideosFromResponse(json);
}
