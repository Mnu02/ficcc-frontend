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
export const LAST_UPDATED = "June 2, 2026";

export const INFO_COPY = {
  heroEyebrow: "FICCC",
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
      "These Terms of Service govern your use of the FICCC mobile app, published for the First Ithaca Chinese Christian Church (FICCC) community.",
      "By downloading, accessing, or using the app, you agree to these terms and to use the app in a lawful and respectful way. If you do not agree, please stop using the app.",
    ],
  },
  {
    title: "Who We Are",
    paragraphs: [
      `The app is provided by First Ithaca Chinese Christian Church, located at ${CONTACT_ADDRESS}. You can reach us at ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: "What the App Does",
    paragraphs: [
      "The app is an informational tool for the church community. It displays church announcements, event listings, and ministry videos, and provides convenient shortcuts to church-related resources.",
      "Content shown in the app is retrieved from church-operated servers and is provided for general information. The app does not require you to create an account or sign in.",
    ],
  },
  {
    title: "No Account Required",
    paragraphs: [
      "You can use the app without registering, creating a profile, or providing personal information. Because there is no account, there is nothing to log in to and no account for you to delete.",
    ],
  },
  {
    title: "Acceptable Use",
    paragraphs: ["You agree to use the app responsibly."],
    bullets: [
      "Use the app only for lawful, personal, non-commercial purposes.",
      "Do not interfere with, disrupt, or place an unreasonable load on the app or its connected services.",
      "Do not attempt to gain unauthorized access to any systems, servers, or data.",
      "Do not copy, scrape, or redistribute church content in ways that violate applicable rights.",
    ],
  },
  {
    title: "Donations and Giving",
    paragraphs: [
      "If you choose to give, the app may direct you to third-party payment providers (such as PayPal, Cash App, or Zelle) to complete your donation.",
      "Any payment is handled entirely by that provider under its own terms and privacy practices. FICCC does not process or store your payment details through the app, and we are not responsible for those external platforms.",
    ],
  },
  {
    title: "Third-Party Services and Links",
    paragraphs: [
      "Some features rely on services controlled by others. Watching a video opens a YouTube player, getting directions opens a maps app, adding an event opens your calendar, and emailing or visiting our website opens those external apps.",
      "When you use these features you may leave the app. Those services have their own terms, privacy practices, and availability, and FICCC is not responsible for how they operate.",
    ],
  },
  {
    title: "Content Accuracy and Availability",
    paragraphs: [
      "We try to keep announcements, schedules, and event details accurate, but information may change. Please confirm time-sensitive ministry details with the church when needed.",
      "The app is provided on an as-is and as-available basis. We do not guarantee that every feature will always be uninterrupted, timely, secure, or error-free, and we may add, change, or remove features at any time.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Church branding, app content, graphics, and ministry materials made available through the app remain the property of FICCC or their respective owners unless otherwise noted, and may not be used without permission.",
    ],
  },
  {
    title: "Disclaimers and Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, FICCC and its volunteers are not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the app or any third-party service reached through it.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time. When we do, we will update the date shown in the app. Continued use of the app after updates are posted means you accept the revised terms.",
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
      "This Privacy Policy explains how information is handled when you use the FICCC app, provided by First Ithaca Chinese Christian Church.",
      "We designed the app to need as little information as possible. It does not require an account, a profile, or any sign-in, and we do not ask you to provide personal information to use it.",
    ],
  },
  {
    title: "Information We Do Not Collect",
    paragraphs: [
      "We do not collect, store, sell, or share personal information about you. In particular:",
    ],
    bullets: [
      "No names, email addresses, phone numbers, or passwords are collected by the app.",
      "There are no user accounts, so we hold no profile or login data.",
      "We do not use advertising, third-party analytics, or tracking technologies to profile you.",
      "We do not access your contacts, photos, or microphone.",
    ],
  },
  {
    title: "Information Used to Operate the App",
    paragraphs: [
      "To show announcements, events, and videos, the app requests this content from church-operated servers. These requests are read-only — the app downloads content to display, and does not send personal information about you with them.",
      "As with any app, your device and network providers may process basic technical information (such as your device type, app version, or IP address) to deliver these requests. This is standard internet operation and is not used by us to identify you.",
    ],
  },
  {
    title: "Addresses, Maps, and Directions",
    paragraphs: [
      "When you open an event, the app converts that event's street address into map coordinates so it can show the location on a map. This uses the event address only — it does not read, track, or store your device's GPS or live location.",
      "If you tap to get directions, the app opens your device's maps app with the event location. From that point, the maps app operates under its own privacy policy.",
    ],
  },
  {
    title: "Sharing, Calendar, and Donations",
    paragraphs: [
      "If you share an event, the content is passed to your device's standard share sheet at your request. If you add an event to your calendar, the app opens your calendar app with the event details prefilled.",
      "If you choose to give, the app opens a third-party payment provider (such as PayPal, Cash App, or Zelle). These actions are user-initiated, and any information you enter is handled by those apps and services under their own policies — not by us.",
    ],
  },
  {
    title: "Videos and External Links",
    paragraphs: [
      "Videos play through an embedded YouTube player, and links such as the church website or email open in their respective apps. These third-party services may collect information under their own privacy policies when you use them.",
    ],
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "The app is intended for the general church community and is not directed at children for the purpose of collecting data. Because the app collects no personal information from anyone, it collects none from children.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "We aim to use reasonable safeguards for the church content the app retrieves. However, because the app stores no personal data about you, there is no personal account information for us to lose. No internet-based system can be guaranteed completely secure.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You can stop using the app at any time. You can also choose not to use optional features such as maps, directions, sharing, calendar, email, or giving links. Your device settings let you manage permissions for the apps these features open.",
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
