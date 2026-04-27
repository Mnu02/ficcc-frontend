import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type PolicyBlock = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const CONTACT_EMAIL = "em.ficcc@gmail.com";
const CONTACT_WEBSITE = "https://em.ficcc.org/";
const CONTACT_ADDRESS = "429 Mitchell Street, Ithaca, NY 14850";
const LAST_UPDATED = "April 23, 2026";

const FAQS: FaqItem[] = [
  {
    id: "language",
    question: "Is everything in Chinese? Is everyone Chinese?",
    answer:
      "No. The English ministry gathers in English, and while many people in the church have Chinese backgrounds, the church includes people from a range of cultures and countries.",
  },
  {
    id: "service",
    question: "What does a Sunday service look like?",
    answer:
      "Sunday starts with the 9:45 AM gathering for singing, Bible teaching, and the Lord's Supper. After that, the church moves into smaller discipleship groups and then shared lunch with the wider congregation.",
  },
  {
    id: "ride",
    question: "Is transportation available?",
    answer:
      "Yes. If you need help getting to church, contact the church and ask about current ride options for campus or the Ithaca area.",
  },
  {
    id: "wear",
    question: "What should I wear?",
    answer:
      "Wear something comfortable and respectful. People usually dress anywhere from casual clothes to more formal Sunday attire.",
  },
];

const TERMS_BLOCKS: PolicyBlock[] = [
  {
    title: "Agreement to Terms",
    paragraphs: [
      "By accessing or using the FICCC app, you agree to these Terms of Service and to use the app in a lawful and respectful way.",
      "If you do not agree with these terms, you should stop using the app.",
    ],
  },
  {
    title: "Description of Service",
    paragraphs: [
      "The app provides church information, event listings, Bible reading tools, and links to church-related resources for the First Ithaca Chinese Christian Church community.",
      "Some features may rely on church-managed APIs or third-party services such as maps, calendar apps, and website links.",
    ],
  },
  {
    title: "Acceptable Use",
    paragraphs: ["You agree not to misuse the app."],
    bullets: [
      "Use the app only for lawful purposes.",
      "Do not interfere with the app, its APIs, or connected services.",
      "Do not attempt unauthorized access to systems or data.",
      "Do not copy, scrape, or redistribute church content in ways that violate applicable rights.",
    ],
  },
  {
    title: "Content and Availability",
    paragraphs: [
      "We try to keep schedules, event details, and Bible content accurate, but details may change. Please confirm time-sensitive ministry information with the church when needed.",
      "The app is provided on an as-is and as-available basis, without a guarantee that every feature will always be uninterrupted or error-free.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "When you open directions, add an event to your calendar, share content, or visit external links, you may leave the app and use services controlled by third parties.",
      "Those services have their own terms, privacy practices, and availability, and FICCC is not responsible for how they operate.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Church branding, app content, graphics, and ministry materials made available through the app remain the property of FICCC or their respective owners unless otherwise noted.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time. Continued use of the app after updates are posted means you accept the revised terms.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
];

const PRIVACY_BLOCKS: PolicyBlock[] = [
  {
    title: "Overview",
    paragraphs: [
      "This Privacy Policy explains how information is handled when you use the FICCC app.",
      "As of April 23, 2026, the app does not require user account creation or in-app profile setup.",
    ],
  },
  {
    title: "Information We Receive",
    paragraphs: [
      "The app retrieves church content such as events and Bible data from connected services so it can display that information on your device.",
      "Basic technical information may also be processed by the platform, your device, or hosting providers as part of normal app and network operation.",
    ],
  },
  {
    title: "Location, Maps, and Directions",
    paragraphs: [
      "When you open an event page, the app may convert the event address into map coordinates so it can display the event location.",
      "The app does not track or store your live location for this feature. If you open a maps app for directions, that app's privacy policy will apply.",
    ],
  },
  {
    title: "Sharing and Calendar Actions",
    paragraphs: [
      "If you choose to share an event or open a calendar app, the selected content is passed to your device's share sheet or calendar provider at your request.",
      "Those actions are user-initiated and are governed in part by the apps and services you choose to use.",
    ],
  },
  {
    title: "Contact and External Links",
    paragraphs: [
      "If you email the church, open the church website, or use other external links, your information will be handled by those outside services according to their own policies.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "We aim to use reasonable safeguards for connected services, but no internet-based system can be guaranteed completely secure.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You can stop using the app at any time. You can also choose not to use optional features such as email, maps, sharing, or calendar links.",
    ],
  },
  {
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. When we do, we will update the last updated date shown in the app.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      `Questions about this Privacy Policy can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
];

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={18} color={Colors.primary} />
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function AccordionItem({
  title,
  body,
  expanded,
  onPress,
}: {
  title: string;
  body: React.ReactNode;
  expanded: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.accordionItem}>
      <Pressable style={styles.accordionHeader} onPress={onPress}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={18}
          color={Colors.textSecondary}
        />
      </Pressable>
      {expanded ? <View style={styles.accordionBody}>{body}</View> : null}
    </View>
  );
}

function PolicyContent({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <View style={styles.policyStack}>
      {blocks.map((block) => (
        <View key={block.title} style={styles.policyBlock}>
          <Text style={styles.policyTitle}>{block.title}</Text>
          {block.paragraphs.map((paragraph) => (
            <Text key={paragraph} style={styles.bodyText}>
              {paragraph}
            </Text>
          ))}
          {block.bullets?.map((bullet) => (
            <Text key={bullet} style={styles.bulletText}>
              {"\u2022"} {bullet}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function InfoScreen() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    faq_language: true,
    terms: false,
    privacy: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const openExternal = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert("Unable to open link", "This device cannot open that link.");
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Unable to open link",
        "This device could not open the requested page. If you're on a simulator, try testing on a physical device."
      );
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>FICCC</Text>
        <Text style={styles.heroTitle}>Info</Text>
        <Text style={styles.heroText}>
          Find church contact details, common questions, and the app policies in one place.
        </Text>
      </View>

      <SectionCard
        title="Contact Us"
        subtitle="English ministry contact and visit information"
      >
        <View style={styles.contactBlock}>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={18} color={Colors.primary} />
            <Text style={styles.detailText}>{CONTACT_EMAIL}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color={Colors.primary} />
            <Text style={styles.detailText}>{CONTACT_ADDRESS}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={18} color={Colors.primary} />
            <Text style={styles.detailText}>Sunday gathering at 9:45 AM</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <ActionButton
            icon="mail-open-outline"
            label="Email"
            onPress={() => openExternal(`mailto:${CONTACT_EMAIL}`)}
          />
          <ActionButton
            icon="globe-outline"
            label="Website"
            onPress={() => openExternal(CONTACT_WEBSITE)}
          />
          <ActionButton
            icon="navigate-outline"
            label="Directions"
            onPress={() =>
              openExternal(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  CONTACT_ADDRESS
                )}`
              )
            }
          />
        </View>
      </SectionCard>

      <SectionCard
        title="FAQs"
        subtitle="Common questions from first-time visitors and attendees"
      >
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.id}
            title={faq.question}
            expanded={!!expandedSections[`faq_${faq.id}`]}
            onPress={() => toggleSection(`faq_${faq.id}`)}
            body={<Text style={styles.bodyText}>{faq.answer}</Text>}
          />
        ))}
      </SectionCard>

      <SectionCard
        title="Terms of Service"
        subtitle={`Last updated ${LAST_UPDATED}`}
      >
        <AccordionItem
          title="Read Terms of Service"
          expanded={!!expandedSections.terms}
          onPress={() => toggleSection("terms")}
          body={<PolicyContent blocks={TERMS_BLOCKS} />}
        />
      </SectionCard>

      <SectionCard
        title="Privacy Policy"
        subtitle={`Last updated ${LAST_UPDATED}`}
      >
        <AccordionItem
          title="Read Privacy Policy"
          expanded={!!expandedSections.privacy}
          onPress={() => toggleSection("privacy")}
          body={<PolicyContent blocks={PRIVACY_BLOCKS} />}
        />
      </SectionCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  hero: {
    backgroundColor: "#f5ead8",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#caa77c",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#8b5e34",
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },
  heroText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbc8",
    gap: 14,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  contactBlock: {
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  detailText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
  },
  actionsRow: {
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#f8f3ec",
    borderWidth: 1,
    borderColor: "#eadbc8",
  },
  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  accordionItem: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    paddingTop: 14,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  accordionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  accordionBody: {
    paddingTop: 12,
    gap: 10,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  policyStack: {
    gap: 14,
  },
  policyBlock: {
    gap: 8,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
});
