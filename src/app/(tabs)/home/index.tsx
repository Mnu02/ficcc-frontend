import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "@/constants/colors";
import HomeCard from "@components/home/HomeCard";
import { SECTIONS } from "@components/home/sections";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.subheader}>We're glad you're here</Text>

        {/* Mission */}
        <View style={styles.mission}>
          <Text style={styles.missionText}>
            Our mission is to develop humble servants who will love the Lord, the lost and the
            local church for the rest of their lives.
          </Text>
        </View>

        {/* Sections */}
        <Text style={styles.sectionLabel}>Explore</Text>
        <View style={styles.grid}>
          {SECTIONS.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <HomeCard
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                href={item.href}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  header: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text,
  },
  subheader: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 20,
  },

  mission: {
    flexDirection: "row",
    backgroundColor: Colors.accentSoft,
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
  },
  missionBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
    marginRight: 14,
  },
  missionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "600",
    color: Colors.accentText,
  },

  sectionLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 24,
  },
});
