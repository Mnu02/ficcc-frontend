import { BibleVersion, BibleBook, BibleChapter, BibleVerse } from "@/types";

const BASE_URL = "http://localhost:8080";

export async function fetchBibleVersions(): Promise<BibleVersion[]> {
  const res = await fetch(`${BASE_URL}/bible/versions`);
  if (!res.ok) throw new Error("Failed to fetch versions");
  const json = await res.json();
  return json.data;
}

export async function fetchBooks(versionId: string): Promise<BibleBook[]> {
  const res = await fetch(`${BASE_URL}/bible/books?versionId=${versionId}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  const json = await res.json();
  return json.data;
}

export async function fetchChapters(versionId: string, bookId: string): Promise<BibleChapter[]> {
  const res = await fetch(`${BASE_URL}/bible/chapters?versionId=${versionId}&bookId=${bookId}`);
  if (!res.ok) throw new Error("Failed to fetch chapters");
  const json = await res.json();
  return json.data;
}

export async function fetchVerses(versionId: string, chapterId: string): Promise<BibleVerse> {
  const res = await fetch(`${BASE_URL}/bible/verses?versionId=${versionId}&chapterId=${chapterId}`);
  if (!res.ok) throw new Error("Failed to fetch verses");
  const json = await res.json();
  return json.data;
}
