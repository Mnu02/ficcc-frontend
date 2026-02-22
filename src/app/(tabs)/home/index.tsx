import { announcements } from "@/data";
import React, { memo,  useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import SectionModal from "./modal";

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
  discipleship: require("src/assets/discipleship.png"),
  give: require("src/assets/Give.png"),
  sermon: require("src/assets/sermons.png"),
  leaders: require("src/assets/leaders.png"),
  newsletter: require("src/assets/newsletters.png"),
  announcements: require("src/assets/Announcements.png"),
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
  const [openSection, setOpenSection] = useState<Section | null>(null);
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
              onPress={() => setOpenSection(item)}
            />
          ))}
        </View>
      </ScrollView>
     <SectionModal
  visible={!!openSection}
  title={openSection?.modalTitle ?? openSection?.title ?? ""}
  onClose={() => setOpenSection(null)}
>
  {openSection?.modalContent}
</SectionModal>
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