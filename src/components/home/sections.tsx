import React from "react";
import { Text } from "react-native";
import type { ImageSourcePropType } from "react-native";

export type Section = {
  id: string;
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  detail?: React.ReactNode;
};

const IMAGES = {
  discipleship: require("@/assets/discipleship.png"),
  give: require("@/assets/Give.png"),
  sermon: require("@/assets/sermons.png"),
  leaders: require("@/assets/leaders.png"),
  newsletter: require("@/assets/newsletters.png"),
  announcements: require("@/assets/Announcements.png"),
};

const bioStyle = { fontSize: 16, lineHeight: 22 } as const;

const LeaderBio = (
  <>
    <Text style={[bioStyle, { marginBottom: 12 }]}>
      Zhida is, first and foremost, a servant (δοῦλος) of Christ. However, that
      wasn't always the case. He grew up in an immigrant church in Houston,
      Texas. But after his parents divorced at a young age, leaving him with a
      single mom, he felt there was simply too much suffering in the world for
      religion to be true. In his view, either God was real and didn't do
      anything about suffering, or God wasn't real at all. So he declared
      himself an atheist in high school and stopped going to church. All
      throughout college, he lived for his own pleasures - food, drinking,
      drugs, and League of Legends. But after graduating, God powerfully changed
      his heart through 3 key individuals. And he gave his life to Christ as a
      young adult. He continued working as a mechanical engineer for 6 years,
      before answering the call to serve God in full-time ministry.
    </Text>

    <Text style={bioStyle}>
      Zhida is married to his better half, Ngun. They met as classmates at
      Dallas Theological Seminary. She also grew up in an immigrant church with
      the Chin people, a minority group in Burma. Amidst government persecution,
      her family moved to Indiana when she was in elementary school. Unlike
      Zhida, Ngun is not from Texas and actually likes cold weather! These days,
      they enjoy taking long walks, listening to good podcasts, eating spicy
      food, and hanging out with church family.
    </Text>
  </>
);

export const SECTIONS: Section[] = [
  {
    id: "worship",
    title: "Worship Services",
    subtitle: "Come join us for worship every Sunday",
    image: IMAGES.sermon,
    detail: "Coming soon",
  },
  {
    id: "discipleship",
    title: "Discipleship Group",
    subtitle: "Sundays at 11:00am",
    image: IMAGES.discipleship,
    detail: "Coming soon",
  },
  {
    id: "give",
    title: "Give to FICCC",
    subtitle: "Coming soon",
    image: IMAGES.give,
    detail:
      "Donations are accepted through PayPal using the link below. We encourage all Christians to give to their local church, but we do not require nor encourage non-Christians to donate to the church.",
  },
  {
    id: "newsletter",
    title: "Weekly Newsletter",
    subtitle: "Coming soon",
    image: IMAGES.newsletter,
    detail: "Coming soon",
  },
  {
    id: "leaders",
    title: "Church Leaders",
    subtitle: "Coming soon",
    image: IMAGES.leaders,
    detail: LeaderBio,
  },
  {
    id: "announcements",
    title: "Announcements",
    subtitle: "Coming soon",
    image: IMAGES.announcements,
    detail: "Coming soon",
  },
];

export const getSection = (id?: string) =>
  SECTIONS.find((s) => s.id === id);
