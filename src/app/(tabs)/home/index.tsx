import { announcements } from "@/data";
import React, { memo,  useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import SectionModal from "../../../components/home/modal";

type HomeCardProps = {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

type Section = {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  modalTitle?: string;
  modalContent?: React.ReactNode;
};

const IMAGES = {
  discipleship: require("../../../assets/discipleship.png"),
  give: require("../../../assets/Give.png"),
  sermon: require("../../../assets/sermons.png"),
  leaders: require("../../../assets/leaders.png"),
  newsletter: require("../../../assets/newsletters.png"),
  announcements: require("../../../assets/Announcements.png"),
};

const SECTIONS = [
  { title: "Upcoming Sermon", subtitle: "Coming soon", image: IMAGES.sermon, modalTitle: "Upcoming Sermon", modalContent: "Coming soon" },
  { title: "Discipleship Group", subtitle: "Sundays at 11:30am", image: IMAGES.discipleship, modalTitle: "Discipleship Group", modalContent: "Coming soon" },
  { title: "Give to FICCC", subtitle: "Coming soon", image: IMAGES.give, modalTitle: "Give to FICCC", modalContent: "Donations are accepted through PayPal using the link below. We encourage all Christians to give to their local church, but we do not require nor encourage non-Christians to donate to the church." },
  { title: "Weekly Newsletter", subtitle: "Coming soon", image: IMAGES.newsletter, modalTitle: "Weekly Newsletter", modalContent: "Coming soon" },
  { title: "Church Leaders", subtitle: "Coming soon",image: IMAGES.leaders, modalTitle: "Church Leaders",
     modalContent: (
      <>
        <Text style={{ fontSize: 16, lineHeight: 22, marginBottom: 12 }}>
          Zhida is, first and foremost, a servant (δοῦλος) of Christ. However, that wasn't always the case. He grew up in an immigrant church in Houston, Texas. But after his parents divorced at a young age, leaving him with a single mom, he felt there was simply too much suffering in the world for religion to be true. 
          In his view, either God was real and didn't do anything about suffering, or God wasn't real at all. So he declared himself an atheist in high school and stopped going to church. All throughout college, he lived for his own pleasures - food, drinking, drugs, and League of Legends. But after graduating, God powerfully changed his heart through 3 key individuals. And he gave his life to Christ as a young adult. He continued working as a mechanical engineer for 6 years, before answering the call to serve God in full-time ministry. 
        </Text>


        <Text style={{ fontSize: 16, lineHeight: 22 }}>
          Zhida is married to his better half, Ngun. They met as classmates at Dallas Theological Seminary. She also grew up in an immigrant church with the Chin people, a minority group in Burma. Amidst government persecution, her family moved to Indiana when she was in elementary school. Unlike Zhida, Ngun is not from Texas and actually likes cold weather! These days, they enjoy taking long walks, listening to good podcasts, eating spicy food, and hanging out with church family.
        </Text>
      </> )},
  { title: "Announcements", subtitle: "Coming soon", image: IMAGES.announcements, modalTitle: "Announcements", modalContent: "Coming soon" },
];



const HomeCard = memo(function HomeCard({ title, subtitle, image, onPress }: HomeCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
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
    </Pressable>
  );
});

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
