import { memo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Announcement } from "@/types";
import Colors from "@/constants/colors";

type AnnouncementListItemProps = {
  announcement: Announcement;
};

const AnnouncementListItem = memo(({ announcement }: AnnouncementListItemProps) => {
  const hasFlyer = Boolean(announcement.flyer_url);

  return (
    <View style={styles.container}>
      {/* Cover zone: the flyer when present, otherwise a branded accent band
          so image-less announcements still read as complete cards. */}
      {hasFlyer ? (
        <View style={styles.imageFrame}>
          <Image
            source={{ uri: announcement.flyer_url! }}
            style={styles.backgroundImage}
            blurRadius={20}
          />
          <Image
            source={{ uri: announcement.flyer_url! }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.coverBand}>
          <View style={styles.coverIcon}>
            <Ionicons name="megaphone" size={22} color={Colors.card} />
          </View>
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.eyebrow}>
          <Ionicons name="megaphone-outline" size={13} color={Colors.accentText} />
          <Text style={styles.eyebrowText}>ANNOUNCEMENT</Text>
        </View>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.description}>{announcement.description}</Text>
      </View>
    </View>
  );
});

AnnouncementListItem.displayName = "AnnouncementListItem";

export default AnnouncementListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  imageFrame: {
    width: "100%",
    aspectRatio: 25 / 9,
    backgroundColor: Colors.card,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  coverBand: {
    width: "100%",
    aspectRatio: 25 / 9,
    backgroundColor: Colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  coverIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 16,
  },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },
  eyebrowText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: Colors.accentText,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
