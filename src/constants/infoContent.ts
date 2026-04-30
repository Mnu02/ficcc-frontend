export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type PolicyBlock = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const CONTACT_EMAIL = "em.ficcc@gmail.com";
export const CONTACT_WEBSITE = "https://em.ficcc.org/";
export const CONTACT_ADDRESS = "429 Mitchell Street, Ithaca, NY 14850";
export const LAST_UPDATED = "April 23, 2026";

export const INFO_COPY = {
  heroEyebrow: "FICCC",
  heroTitle: "Info",
  heroText:
    "Find church contact details, common questions, and the app policies in one place.",
  contactTitle: "Contact Us",
  contactSubtitle: "English ministry contact and visit information",
  sundayGathering: "Sunday gathering at 9:45 AM",
  emailAction: "Email",
  websiteAction: "Website",
  directionsAction: "Directions",
  faqsTitle: "FAQs",
  faqsSubtitle: "Common questions from first-time visitors and attendees",
  termsTitle: "Terms of Service",
  termsAccordionTitle: "Read Terms of Service",
  privacyTitle: "Privacy Policy",
  privacyAccordionTitle: "Read Privacy Policy",
  lastUpdatedPrefix: "Last updated",
  unableToOpenLinkTitle: "Unable to open link",
  unsupportedLinkMessage: "This device cannot open that link.",
  openLinkErrorMessage:
    "This device could not open the requested page. If you're on a simulator, try testing on a physical device.",
};

export const FAQS: FaqItem[] = [
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

export const TERMS_BLOCKS: PolicyBlock[] = [
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
    paragraphs: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
  },
];

export const PRIVACY_BLOCKS: PolicyBlock[] = [
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
