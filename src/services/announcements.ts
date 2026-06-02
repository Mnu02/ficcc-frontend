import { Announcement } from "@/types";
import { API_BASE_URL } from "@/services/api";

type AnnouncementResponse = Announcement[] | { data: Announcement[] };

function isAnnouncementArray(value: unknown): value is Announcement[] {
  return Array.isArray(value);
}

function getAnnouncementsFromResponse(payload: AnnouncementResponse): Announcement[] {
  if (isAnnouncementArray(payload)) {
    return payload;
  }

  return payload.data;
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const res = await fetch(`${API_BASE_URL}/announcements`);

  if (!res.ok) {
    throw new Error("Failed to fetch announcements");
  }

  const json: AnnouncementResponse = await res.json();
  return getAnnouncementsFromResponse(json);
}
