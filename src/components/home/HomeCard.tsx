import React, { memo } from "react";
import type { ImageSourcePropType } from "react-native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/colors";

type HomeCardProps = {
  id: string;
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  href?: string;
};

const HomeCard = memo(function HomeCard({
  id,
  title,
  subtitle,
  image,
  href,
}: HomeCardProps) {
  return (
    <Link href={href ?? `/section/${id}`} asChild>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
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

        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>{subtitle}</Text>
      </Pressable>
    </Link>
  );
});

export default HomeCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  imageFrame: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: Colors.card,
    // soft elevation in place of a hard border
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  cardImagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
