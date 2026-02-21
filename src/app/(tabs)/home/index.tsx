import { announcements } from "@/data";
import React, { memo } from "react";
import type { ImageSourcePropType } from "react-native";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

type HomeCardProps = {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
};

const IMAGES = {
  discipleship: require("src/assets/discipleship.png"),
  give: require("src/assets/Give.png"),
  sermon: require("src/assets/sermons.png"),
  leaders: require("src/assets/leaders.png"),
  newsletter: require("src/assets/newsletters.png"),
  announcements: require("src/assets/Announcements.png"),
};

const SECTIONS = [
  { title: "Upcoming Sermon", subtitle: "Coming soon", image: IMAGES.sermon },
  { title: "Discipleship Group", subtitle: "Sundays at 11:30am", image: IMAGES.discipleship },
  { title: "Give to FICCC", subtitle: "Coming soon", image: IMAGES.give },
  { title: "Weekly Newsletter", subtitle: "Coming soon", image: IMAGES.newsletter },
  { title: "Church Leaders", subtitle: "Coming soon",image: IMAGES.leaders },
  { title: "Announcements", subtitle: "Coming soon", image: IMAGES.announcements },
];

const HomeCard = memo(function HomeCard({ title, subtitle, image }: HomeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageFrame}>
        {image ? (
          <>
            <Image source={image} style={styles.backgroundImage} blurRadius={20} />
            <Image source={image} style={styles.cardImage} resizeMode="contain" />
          </>
        ) : (
          <View style={styles.cardImagePlaceholder} />
        )}
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  );
});

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {/* Header */}
        <Text style={styles.header}>Welcome</Text>

        {/* Main Tab */}
        <View style={styles.mainTab}>
          <Text style={styles.mainTabText}>
            To develop humble servants who will love the Lord, the lost and the
            local church for the rest of their lives.
          </Text>
        </View>

        {/* Sections */}
        <View style={styles.grid}>
          {SECTIONS.map((item) => (
            <HomeCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  scroll: { flex: 1 },
  scrollContent: { padding: 14, paddingBottom: 40 },

  header: { fontSize: 28, fontWeight: "700", marginBottom: 7 },

  mainTab: {
    padding: 60,
    borderColor: "tan",
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 60,
  },
  mainTabText: { fontSize: 18, fontWeight: "600", color: "saddlebrown" },

  grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

imageFrame: {
  height: 200,
  width: "100%",
  borderRadius: 12,
  borderColor: "tan",
  borderWidth: 2,
  overflow: "hidden",
  position: "relative",
},

cardImage: {
  height: "100%",
  width: "100%",
},

backgroundImage: {
  ...StyleSheet.absoluteFillObject,
  resizeMode: "cover",
},
card: {
  flexBasis: "48%",
  marginBottom: 30,
},
  cardImagePlaceholder: {
    height: 200,
    borderRadius: 12,
    borderColor: "tan",
    borderWidth: 2,
  },
  cardTitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: { textAlign: "center", marginTop: 6, opacity: 0.8 },
});