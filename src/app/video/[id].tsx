import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YouTubePlayer from "@/components/media/YouTubePlayer";
import Colors from "@/constants/colors";
import { useVideos } from "@/hooks/useVideos";

function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function VideoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const videoId = Array.isArray(id) ? id[0] : id;
  const { videos, loading, error } = useVideos();
  const video = videos.find((item) => item.id === videoId);

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

  if (!video) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Video not found.</Text>
      </View>
    );
  }

  const openInYouTube = () => {
    Linking.openURL(video.watch_url);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Video" }} />
      <View style={styles.player}>
        <YouTubePlayer watchUrl={video.watch_url} />
      </View>
      <View style={styles.content}>
        <Text style={styles.date}>{formatPublishedDate(video.published_at)}</Text>
        <Text style={styles.description}>{video.description}</Text>
        <Pressable style={styles.youtubeButton} onPress={openInYouTube}>
          <Ionicons name="logo-youtube" size={18} color={Colors.card} />
          <Text style={styles.youtubeText}>Open in YouTube</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.card,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.card,
  },
  player: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: Colors.text,
  },
  content: {
    padding: 16,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    color: Colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  youtubeButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ff0000",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  youtubeText: {
    color: Colors.card,
    fontSize: 14,
    fontWeight: "600",
  },
  message: {
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
