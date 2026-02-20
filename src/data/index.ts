import { Announcement, Event, Leader, PrayerRequest, Sermon } from "../types";

export const announcements: Announcement[] = [
  {
    id: 1,
    created_at: "2026-02-01T09:00:00Z",
    title: "Church Building Fund Update",
    body_html:
      "<p>We are excited to announce that we have reached <strong>75%</strong> of our building fund goal. Thank you for your generous contributions!</p>",
    image_url: null,
  },
  {
    id: 2,
    created_at: "2026-02-03T12:00:00Z",
    title: "New Youth Program Launch",
    body_html:
      "<p>Starting this March, we will be launching a new youth mentorship program every Saturday morning. All young people aged 13-18 are welcome.</p>",
    image_url: "https://picsum.photos/seed/youth/800/400",
  },
  {
    id: 3,
    created_at: "2026-02-05T08:30:00Z",
    title: "Volunteer Appreciation Dinner",
    body_html:
      "<p>Join us on <strong>February 20th</strong> at 6pm for a special dinner to honour our dedicated volunteers. RSVP by February 15th.</p>",
    image_url: "https://picsum.photos/seed/dinner/800/400",
  },
];

export const events: Event[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Sunday Worship Service",
    location: "3 Charles St, Ithaca, NY, 14850",
    image_url: "https://picsum.photos/seed/worship/800/400",
    starts_at: "2026-05-08T09:00:00Z",
    ends_at: "2026-02-08T11:30:00Z",
    description: 
      "As typefaces have evolved to suit the web, designers have many usability factors to consider beyond the way fonts can make people feel. When choosing web fonts, qualities like weight variability, how many languages a font comes in, and load time and availability across devices all matter. To choose the best fonts for your website designs, find Framer's best practices, as well as a roundup of the best web fonts, below."
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    name: "Bible Study Fellowship",
    location: "RPCC, 107 Jessup Rd, Ithaca, NY",
    image_url: null,
    starts_at: "2026-07-11T18:30:00Z",
    ends_at: "2026-02-11T20:00:00Z",
    description:
      "Join us for an evening of in-depth Scripture study and fellowship. We explore God's Word together in a welcoming, discussion-based setting. All are welcome—whether you're new to the Bible or have been studying for years. Bring your questions and an open heart.",
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    name: "300 Day Hall, Ithaca, NY",
    location: "City Park",
    image_url: "https://picsum.photos/seed/outreach/800/400",
    starts_at: "2026-02-15T08:00:00Z",
    ends_at: "2026-02-15T14:00:00Z",
    description:
      "A day of service and connection as we take our faith beyond the church walls. We'll share meals, run activities for children, and offer practical support to our neighbours at City Park. Come and be part of showing God's love in action. Volunteers and donations welcome.",
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    name: "Golden Gate Bridge, CA",
    location: "Main Sanctuary",
    image_url: "https://picsum.photos/seed/easter/800/400",
    starts_at: "2026-04-03T17:00:00Z",
    ends_at: "2026-04-05T20:00:00Z",
    description:
      "A three-day conference celebrating the resurrection and renewing our faith. Gather for worship, teaching, and prayer as we prepare our hearts for Easter. Guest speakers and our own ministry team will lead sessions on hope, renewal, and living the resurrection life. All are welcome.",
  },
];

export const leaders: Leader[] = [
  {
    id: 1,
    name: "Pastor James Moyo",
    role: "Senior Pastor",
    bio: "Pastor James has been leading FICCC for over 15 years with a passion for community transformation and biblical teaching.",
    image_url: "https://picsum.photos/seed/pastor1/300/300",
    email: "james.moyo@ficcc.org",
    phone_number: "+263 771 234 567",
    sort_order: 1,
  },
  {
    id: 2,
    name: "Rev. Sarah Ndlovu",
    role: "Associate Pastor",
    bio: "Rev. Sarah oversees the women's ministry and counselling services at FICCC.",
    image_url: "https://picsum.photos/seed/pastor2/300/300",
    email: "sarah.ndlovu@ficcc.org",
    phone_number: null,
    sort_order: 2,
  },
  {
    id: 3,
    name: "Deacon Tawanda Chikore",
    role: "Deacon",
    bio: null,
    image_url: "https://picsum.photos/seed/deacon1/300/300",
    email: null,
    phone_number: null,
    sort_order: 3,
  },
  {
    id: 4,
    name: "Elder Grace Mutasa",
    role: "Elder",
    bio: "Elder Grace leads our prayer ministry and is passionate about intercession and spiritual growth.",
    image_url: "https://picsum.photos/seed/elder1/300/300",
    email: "grace.mutasa@ficcc.org",
    phone_number: "+263 772 345 678",
    sort_order: 4,
  },
];

export const prayerRequests: PrayerRequest[] = [
  {
    id: 1,
    created_at: "2026-02-01T07:30:00Z",
    user_id: "user-uuid-001",
    body: "Please pray for my mother who is undergoing surgery next week.",
    is_anonymous: false,
    status: "active",
  },
  {
    id: 2,
    created_at: "2026-02-02T14:15:00Z",
    user_id: "user-uuid-002",
    body: "Praying for guidance as I start a new job this month.",
    is_anonymous: true,
    status: "active",
  },
  {
    id: 3,
    created_at: "2026-01-28T10:00:00Z",
    user_id: "user-uuid-003",
    body: "Please keep our family in prayer as we go through a difficult season.",
    is_anonymous: false,
    status: "answered",
  },
];

export const sermons: Sermon[] = [
  {
    id: 1,
    title: "Walking in Faith",
    preacher: "Pastor James Moyo",
    scripture_ref: "Hebrews 11:1-6",
    sermon_date: "2026-02-02T09:00:00Z",
    sermon_series: "Faith Foundations",
    youtube_link: "https://youtube.com/watch?v=example1",
  },
  {
    id: 2,
    title: "The Power of Prayer",
    preacher: "Rev. Sarah Ndlovu",
    scripture_ref: "James 5:13-18",
    sermon_date: "2026-01-26T09:00:00Z",
    sermon_series: "Faith Foundations",
    youtube_link: "https://youtube.com/watch?v=example2",
  },
  {
    id: 3,
    title: "Love Your Neighbour",
    preacher: "Pastor James Moyo",
    scripture_ref: "Mark 12:28-34",
    sermon_date: "2026-01-19T09:00:00Z",
    sermon_series: null,
    youtube_link: "https://youtube.com/watch?v=example3",
  },
  {
    id: 4,
    title: "A New Beginning",
    preacher: "Pastor James Moyo",
    scripture_ref: "Isaiah 43:18-19",
    sermon_date: "2026-01-05T09:00:00Z",
    sermon_series: "New Year Series",
    youtube_link: "https://youtube.com/watch?v=example4",
  },
];
