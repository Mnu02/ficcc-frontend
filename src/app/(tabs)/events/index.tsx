import { View, FlatList } from "react-native";
import { events } from '@/data'
import EventListItem from '@/components/events/EventListItem'

export default function EventsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}