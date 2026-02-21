import React, { memo } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

type HomeCardProps = {
  title: string;
  subtitle: string;
};

const SECTIONS = [
  { title: "Upcoming Sermon", subtitle: "Coming soon" },
  { title: "Discipleship Group", subtitle: "Sundays at 11:30am" },
  { title: "Give to FICCC", subtitle: "Coming soon" },
  { title: "Weekly Newsletter", subtitle: "Coming soon" },
  { title: "Church Leaders", subtitle: "Coming soon" },
  { title: "Announcements", subtitle: "Coming soon" },
];

const HomeCard = memo(function HomeCard({ title, subtitle }: HomeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardImagePlaceholder} />
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
    rowGap: 30,
  },

  card: { width: "48%" },
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