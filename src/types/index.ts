export interface Announcement {
  id: number;
  created_at: string;
  title: string;
  body_html: string;
  image_url: string | null;
}

export interface Event {
  id: string;
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

export interface BibleVersion {
  id: string;
  abbreviation: string;
  name: string;
  description: string | null;
}

export interface BibleBook {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
}

export interface BibleChapter {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  reference: string;
}

// BibleVerse is really a chapter with its content — that's how api.bible structures it. 
// The content field is the HTML we'll parse on the frontend to extract individual verses.
export interface BibleVerse {
  id: string;           // "GEN.1"
  bookId: string;       // "GEN"
  number: string;       // "1"
  reference: string;    // "Genesis 1"
  verseCount: number;   // 31
  content: string;      // raw HTML from api.bible
  next: { id: string; number: string; bookId: string } | null;
  previous: { id: string; number: string; bookId: string } | null;
}