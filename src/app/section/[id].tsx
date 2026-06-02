import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Colors from "@/constants/colors";
import { getSection } from "@components/home/sections";

export default function SectionDetailScreen() {
  const { id } = useLocalSearchParams();
  const sectionId = Array.isArray(id) ? id[0] : id;
  const section = getSection(sectionId);

  if (!section) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.errorText}>Section not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Stack.Screen options={{ title: section.title }} />

      {section.image ? (
        <View style={styles.imageFrame}>
          <Image source={section.image} style={styles.backgroundImage} blurRadius={20} />
          <Image source={section.image} style={styles.image} resizeMode="contain" />
        </View>
      ) : null}

      <Text style={styles.title}>{section.title}</Text>
      <Text style={styles.subtitle}>{section.subtitle}</Text>

      <View style={styles.detail}>
        {typeof section.detail === "string" ? (
          <Text style={styles.detailText}>{section.detail}</Text>
        ) : (
          section.detail
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  imageFrame: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
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
  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  detail: {
    marginTop: 20,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 23,
    color: Colors.text,
  },
  errorText: {
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
