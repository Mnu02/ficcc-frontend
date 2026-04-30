import Colors from "@/constants/colors";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_WEBSITE,
  FAQS,
  INFO_COPY,
  LAST_UPDATED,
  PRIVACY_BLOCKS,
  TERMS_BLOCKS,
} from "@/constants/infoContent";
import type { PolicyBlock } from "@/constants/infoContent";
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
        Alert.alert(INFO_COPY.unableToOpenLinkTitle, INFO_COPY.unsupportedLinkMessage);
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert(
        INFO_COPY.unableToOpenLinkTitle,
        INFO_COPY.openLinkErrorMessage
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
        <Text style={styles.eyebrow}>{INFO_COPY.heroEyebrow}</Text>
        <Text style={styles.heroText}>{INFO_COPY.heroText}</Text>
      </View>

      <SectionCard
        title={INFO_COPY.contactTitle}
        subtitle={INFO_COPY.contactSubtitle}
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
            <Text style={styles.detailText}>{INFO_COPY.sundayGathering}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <ActionButton
            icon="mail-open-outline"
            label={INFO_COPY.emailAction}
            onPress={() => openExternal(`mailto:${CONTACT_EMAIL}`)}
          />
          <ActionButton
            icon="globe-outline"
            label={INFO_COPY.websiteAction}
            onPress={() => openExternal(CONTACT_WEBSITE)}
          />
          <ActionButton
            icon="navigate-outline"
            label={INFO_COPY.directionsAction}
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
        title={INFO_COPY.faqsTitle}
        subtitle={INFO_COPY.faqsSubtitle}
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
        title={INFO_COPY.termsTitle}
        subtitle={`${INFO_COPY.lastUpdatedPrefix} ${LAST_UPDATED}`}
      >
        <AccordionItem
          title={INFO_COPY.termsAccordionTitle}
          expanded={!!expandedSections.terms}
          onPress={() => toggleSection("terms")}
          body={<PolicyContent blocks={TERMS_BLOCKS} />}
        />
      </SectionCard>

      <SectionCard
        title={INFO_COPY.privacyTitle}
        subtitle={`${INFO_COPY.lastUpdatedPrefix} ${LAST_UPDATED}`}
      >
        <AccordionItem
          title={INFO_COPY.privacyAccordionTitle}
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
