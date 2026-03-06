import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BibleVersion, BibleBook, BibleChapter, BibleVerse } from "@/types";
import { fetchBibleVersions, fetchBooks, fetchChapters, fetchVerses } from "@/services/bible";
import Colors from "@/constants/colors";

const DEFAULT_VERSION_ID = "de4e12af7f28f599-02"; // KJV
const DEFAULT_BOOK_ID = "GEN";
const ALLOWED_VERSIONS = new Set(["KJV", "NIV", "AMP", "NLT"]);

// api.bible abbreviations include a language prefix (e.g. "engKJV" → "KJV")
function cleanAbbreviation(abbr: string): string {
  return abbr.replace(/^[a-z]+/, "");
}

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

  // Book/chapter picker state
  const [bookPickerVisible, setBookPickerVisible] = useState(false);
  const [pickerBook, setPickerBook] = useState<BibleBook | null>(null);
  const [pickerChapters, setPickerChapters] = useState<BibleChapter[]>([]);
  const [pickerChaptersLoading, setPickerChaptersLoading] = useState(false);

  // Version picker state
  const [versionPickerVisible, setVersionPickerVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const allVersions = await fetchBibleVersions();
        const seen = new Set<string>();
        const filteredVersions = allVersions.filter((v) => {
          const abbr = cleanAbbreviation(v.abbreviation);
          if (!ALLOWED_VERSIONS.has(abbr) || seen.has(abbr)) return false;
          seen.add(abbr);
          return true;
        });
        setVersions(filteredVersions);

        const version = allVersions.find((v) => v.id === DEFAULT_VERSION_ID) ?? allVersions[0];
        setSelectedVersion(version);

        const allBooks = await fetchBooks(version.id);
        setBooks(allBooks);

        const book = allBooks.find((b) => b.id === DEFAULT_BOOK_ID) ?? allBooks[0];
        setSelectedBook(book);

        const allChapters = await fetchChapters(version.id, book.id);
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

  const openBookPicker = () => {
    setPickerBook(null);
    setPickerChapters([]);
    setBookPickerVisible(true);
  };

  const handlePickerBookSelect = async (book: BibleBook) => {
    if (!selectedVersion) return;
    setPickerBook(book);
    setPickerChaptersLoading(true);
    try {
      const allChapters = await fetchChapters(selectedVersion.id, book.id);
      setPickerChapters(allChapters.filter((c) => c.number !== "intro"));
    } finally {
      setPickerChaptersLoading(false);
    }
  };

  const handlePickerChapterSelect = async (chapter: BibleChapter) => {
    if (!pickerBook || !selectedVersion) return;
    setBookPickerVisible(false);
    setSelectedBook(pickerBook);
    setChapters(pickerChapters);
    setPickerBook(null);
    setPickerChapters([]);
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

  const handleVersionSelect = async (version: BibleVersion) => {
    setVersionPickerVisible(false);
    setSelectedVersion(version);
    setLoading(true);
    try {
      const allBooks = await fetchBooks(version.id);
      setBooks(allBooks);
      const book = allBooks.find((b) => b.id === selectedBook?.id) ?? allBooks[0];
      setSelectedBook(book);
      const allChapters = await fetchChapters(version.id, book.id);
      const filtered = allChapters.filter((c) => c.number !== "intro");
      setChapters(filtered);
      const targetChapter =
        filtered.find((c) => c.number === chapterData?.number) ?? filtered[0];
      const data = await fetchVerses(version.id, targetChapter.id);
      setChapterData(data);
    } catch {
      setError("Failed to load Bible version.");
    } finally {
      setLoading(false);
    }
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

        <View style={styles.pickerGroup}>
          <TouchableOpacity style={styles.chapterPickerBtn} onPress={openBookPicker}>
            <Text style={styles.chapterRef}>{chapterData?.reference}</Text>
            <Ionicons name="chevron-down" size={14} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.pickerDivider} />
          <TouchableOpacity style={styles.versionPickerBtn} onPress={() => setVersionPickerVisible(true)}>
            <Text style={styles.versionPickerText}>{selectedVersion ? cleanAbbreviation(selectedVersion.abbreviation) : ""}</Text>
            <Ionicons name="chevron-down" size={14} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={goToNext} disabled={!chapterData?.next}>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={chapterData?.next ? Colors.text : Colors.border}
          />
        </TouchableOpacity>
      </View>

      {/* Book / Chapter Picker Modal */}
      <Modal
        visible={bookPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setBookPickerVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setBookPickerVisible(false)} />
        <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 16 }]}>
          {/* Modal header */}
          <View style={styles.modalHeader}>
            {pickerBook ? (
              <TouchableOpacity onPress={() => { setPickerBook(null); setPickerChapters([]); }}>
                <Ionicons name="chevron-back" size={20} color={Colors.text} />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 20 }} />
            )}
            <Text style={styles.modalTitle}>
              {pickerBook ? pickerBook.name : "Choose a Book"}
            </Text>
            <TouchableOpacity onPress={() => setBookPickerVisible(false)}>
              <Ionicons name="close" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Book list */}
          {!pickerBook && (
            <FlatList
              data={books}
              keyExtractor={(b) => b.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.bookRow,
                    item.id === selectedBook?.id && styles.bookRowActive,
                  ]}
                  onPress={() => handlePickerBookSelect(item)}
                >
                  <Text
                    style={[
                      styles.bookRowText,
                      item.id === selectedBook?.id && styles.bookRowTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.border} />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}

          {/* Chapter grid */}
          {pickerBook && (
            pickerChaptersLoading ? (
              <View style={styles.centered}>
                <ActivityIndicator color={Colors.primary} />
              </View>
            ) : (
              <FlatList
                data={pickerChapters}
                keyExtractor={(c) => c.id}
                numColumns={5}
                contentContainerStyle={styles.chapterGrid}
                renderItem={({ item }) => {
                  const isCurrent =
                    item.number === chapterData?.number && pickerBook.id === selectedBook?.id;
                  return (
                    <TouchableOpacity
                      style={[styles.chapterCell, isCurrent && styles.chapterCellActive]}
                      onPress={() => handlePickerChapterSelect(item)}
                    >
                      <Text style={[styles.chapterCellText, isCurrent && styles.chapterCellTextActive]}>
                        {item.number}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )
          )}
        </View>
      </Modal>

      {/* Version Picker Modal */}
      <Modal
        visible={versionPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setVersionPickerVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setVersionPickerVisible(false)} />
        <View style={[styles.modalSheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.modalHeader}>
            <View style={{ width: 20 }} />
            <Text style={styles.modalTitle}>Bible Version</Text>
            <TouchableOpacity onPress={() => setVersionPickerVisible(false)}>
              <Ionicons name="close" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <FlatLis
            data={versions
            keyExtractor={(v) => v.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.versionRow,
                  item.id === selectedVersion?.id && styles.versionRowActive,
                ]}
                onPress={() => handleVersionSelect(item)}
              >
                <Text style={[styles.versionAbbr, item.id === selectedVersion?.id && styles.versionAbbrActive]}>
                  {cleanAbbreviation(item.abbreviation)}
                </Text>
                <Text style={styles.versionName} numberOfLines={1}>{item.name}</Text>
                {item.id === selectedVersion?.id && (
                  <Ionicons name="checkmark" size={18} color={Colors.primary} />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: "center",
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
  pickerGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pickerDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.border,
  },
  versionPickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  versionPickerText: {
    fontSize: 14,
    fontWeight: "700",
  },
  chapterPickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chapterRef: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalSheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingTop: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  // Book list
  bookRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  bookRowActive: {
    backgroundColor: `${Colors.primary}10`,
  },
  bookRowText: {
    fontSize: 15,
    color: Colors.text,
  },
  bookRowTextActive: {
    fontWeight: "700",
    color: Colors.primary,
  },
  // Chapter grid
  chapterGrid: {
    padding: 16,
    gap: 10,
  },
  chapterCell: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  chapterCellActive: {
    backgroundColor: Colors.primary,
  },
  chapterCellText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  chapterCellTextActive: {
    color: "#fff",
  },
  // Version list
  versionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
  },
  versionRowActive: {
    backgroundColor: `${Colors.primary}10`,
  },
  versionAbbr: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    width: 48,
  },
  versionAbbrActive: {
    color: Colors.primary,
  },
  versionName: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
});
