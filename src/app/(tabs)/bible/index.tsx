import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BibleVersion, BibleBook, BibleChapter, BibleVerse } from "@/types";
import { fetchBibleVersions, fetchBooks, fetchChapters, fetchVerses } from "@/services/bible";
import Colors from "@/constants/colors";

const DEFAULT_VERSION_ID = "de4e12af7f28f599-02"; // KJV
const DEFAULT_BOOK_ID = "GEN";

// Strip HTML tags and extract individual verses from api.bible chapter content
function parseVerses(html: string): { number: number; text: string }[] {
  const verseRegex = /<span[^>]*data-number="(\d+)"[^>]*>\d+<\/span>([\s\S]*?)(?=<span[^>]*data-number="\d+"|$)/g;
  const verses: { number: number; text: string }[] = [];
  let match;
  while ((match = verseRegex.exec(html)) !== null) {
    const number = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (text) verses.push({ number, text });
  }
  return verses;
}

export default function BibleScreen() {
  const insets = useSafeAreaInsets();

  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion | null>(null);
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [chapters, setChapters] = useState<BibleChapter[]>([]);
  const [chapterData, setChapterData] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const allVersions = await fetchBibleVersions();
        setVersions(allVersions);

        const version = allVersions.find((v) => v.id === DEFAULT_VERSION_ID) ?? allVersions[0];
        setSelectedVersion(version);

        const allBooks = await fetchBooks(version.id);
        setBooks(allBooks);

        const book = allBooks.find((b) => b.id === DEFAULT_BOOK_ID) ?? allBooks[0];
        setSelectedBook(book);

        const allChapters = await fetchChapters(version.id, book.id);
        // Filter out intro chapters
        const filtered = allChapters.filter((c) => c.number !== "intro");
        setChapters(filtered);

        const data = await fetchVerses(version.id, filtered[0].id);
        setChapterData(data);
      } catch {
        setError("Failed to load Bible. Make sure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const loadChapter = async (chapter: BibleChapter) => {
    if (!selectedVersion) return;
    setLoading(true);
    try {
      const data = await fetchVerses(selectedVersion.id, chapter.id);
      setChapterData(data);
    } catch {
      setError("Failed to load chapter.");
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    if (!chapterData?.previous) return;
    const prev = chapters.find((c) => c.id === chapterData.previous?.id);
    if (prev) loadChapter(prev);
  };

  const goToNext = () => {
    if (!chapterData?.next) return;
    const next = chapters.find((c) => c.id === chapterData.next?.id);
    if (next) loadChapter(next);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const verses = chapterData ? parseVerses(chapterData.content) : [];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.chapterTitle}>{chapterData?.reference}</Text>
        </View>

        {/* Verses */}
        <View style={styles.versesContainer}>
          {verses.map((verse) => (
            <Text key={verse.number} style={styles.verseText}>
              <Text style={styles.verseNumber}>{verse.number} </Text>
              {verse.text}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { bottom: insets.bottom + 8 }]}>
        <TouchableOpacity onPress={goToPrevious} disabled={!chapterData?.previous}>
          <Ionicons
            name="chevron-back"
            size={22}
            color={chapterData?.previous ? Colors.text : Colors.border}
          />
        </TouchableOpacity>

        <Text style={styles.chapterRef}>{chapterData?.reference}</Text>

        <TouchableOpacity onPress={goToNext} disabled={!chapterData?.next}>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={chapterData?.next ? Colors.text : Colors.border}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    color: Colors.textSecondary,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  chapterTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
    flex: 1,
  },
  versesContainer: {
    paddingHorizontal: 16,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 28,
    color: Colors.text,
    marginBottom: 4,
  },
  verseNumber: {
    fontWeight: "700",
    color: Colors.textSecondary,
    fontSize: 13,
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.card,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chapterRef: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
});
