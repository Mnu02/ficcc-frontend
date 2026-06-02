export interface Announcement {
  id: number;
  title: string;
  description: string;
  flyer_url: string | null;
  stop_displaying_at: string | null;
}

export interface Event {
  id: number;
  name: string;
  location: string;
  image_url: string | null;
  starts_at: string;
  ends_at: string | null;
  description: string;
}

export interface Leader {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  image_url: string;
  email: string | null;
  phone_number: string | null;
  sort_order: number | null;
}

export interface PrayerRequest {
  id: number;
  created_at: string;
  user_id: string;
  body: string;
  is_anonymous: boolean;
  status: string;
}

export interface Sermon {
  id: number;
  title: string;
  preacher: string;
  scripture_ref: string;
  sermon_date: string;
  sermon_series: string | null;
  youtube_link: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  published_at: string;
  thumbnail_url: string;
  watch_url: string;
  embed_url: string;
}
