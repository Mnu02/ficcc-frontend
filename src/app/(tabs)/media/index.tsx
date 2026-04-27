import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/colors";
import { Video } from "@/types";
import { useVideos } from "@/hooks/useVideos";

function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type VideoListItemProps = {
  video: Video;
};

function VideoListItem({ video }: VideoListItemProps) {
  return (
    <Link href={`/video/${video.id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.thumbnailWrap}>
          <Image
            source={{ uri: video.thumbnail_url }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.playBadge}>
            <Ionicons name="play" size={18} color={Colors.card} />
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.date}>{formatPublishedDate(video.published_at)}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {video.description}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default function MediaScreen() {
  const { videos, loading, error } = useVideos();

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
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoListItem video={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.message}>No videos are available yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.background,
  },
  listContent: {
    gap: 12,
    padding: 10,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnailWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: Colors.border,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playBadge: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 46,
    height: 46,
    marginLeft: -23,
    marginTop: -23,
    borderRadius: 23,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 3,
  },
  info: {
    padding: 12,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  description: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  empty: {
    paddingTop: 48,
  },
  message: {
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
