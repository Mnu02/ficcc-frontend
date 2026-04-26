import { View, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import EventListItem from "@/components/events/EventListItem";
import Colors from "@/constants/colors";
import { useEvents } from "@/hooks/useEvents";

export default function EventsScreen() {
  const { events, loading, error } = useEvents();

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={events.filter((e) => new Date(e.starts_at) >= new Date())}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventListItem event={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
