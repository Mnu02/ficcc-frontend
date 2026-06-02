import { View, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import AnnouncementListItem from "@/components/announcements/AnnouncementListItem";
import Colors from "@/constants/colors";
import { useAnnouncements } from "@/hooks/useAnnouncements";

export default function AnnouncementsScreen() {
  const { announcements, loading, error } = useAnnouncements();

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
        <Text style={styles.message}>{error}</Text>
      </View>
    );
  }

  const now = new Date();
  const visible = announcements.filter(
    (a) => !a.stop_displaying_at || new Date(a.stop_displaying_at) >= now
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={visible}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <AnnouncementListItem announcement={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.message}>No announcements right now.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
    padding: 16,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
