import type { FAQ, VisitorType } from "./types";

export const visitorTypes: VisitorType[] = [
  {
    id: "first-time",
    label: "First time in Bodrum on a cruise",
    shortLabel: "First visit",
    description:
      "You want the castle, marina and Old Town in a realistic plan that gets you back to the ship with confidence.",
    href: "/best-things-to-do-in-bodrum-from-a-cruise-ship",
    cta: "See first-timer picks",
  },
  {
    id: "sailing",
    label: "Here for gulet sailing and the Aegean",
    shortLabel: "Gulet & sea",
    description:
      "Traditional wooden boats, turquoise bays and swimming stops — the classic Bodrum shore experience from the cruise port.",
    href: "/gulet-sailing-guide-bodrum",
    cta: "Explore gulet trips",
  },
  {
    id: "food-wine",
    label: "Here for Turkish food, meze and wine",
    shortLabel: "Food & wine",
    description:
      "Meze spreads, seafood by the marina, hammam rituals and boutique winery tastings on the Bodrum peninsula.",
    href: "/best-bodrum-excursions-for-food-and-wine-lovers",
    cta: "Explore food tours",
  },
  {
    id: "history",
    label: "I want ancient history and the castle",
    shortLabel: "History",
    description:
      "Halicarnassus, the Mausoleum ruins, Bodrum Castle and the Museum of Underwater Archaeology — all within walking distance.",
    href: "/best-bodrum-excursions-for-history-lovers",
    cta: "Plan a history day",
  },
];

export interface HomeSection {
  slug: string;
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export const coreSections: HomeSection[] = [
  {
    slug: "shore-excursions",
    number: "01",
    title: "Shore Excursions",
    description:
      "Premium, cruise-timed tours of Bodrum Castle, gulet sailing, hammam rituals, peninsula villages, food experiences and beyond.",
    href: "/shore-excursions",
    cta: "Browse excursions",
  },
  {
    slug: "cruise-port-guide",
    number: "02",
    title: "Bodrum Cruise Port Guide",
    description:
      "Where ships dock near the city centre, walking routes to the castle and marina, dolmuş and taxi options, and return-to-ship timing.",
    href: "/cruise-port-guide",
    cta: "Read the guide",
  },
  {
    slug: "one-day",
    number: "03",
    title: "One Day in Bodrum",
    description:
      "Realistic port-day itineraries from a short call to a full gulet sailing or peninsula adventure.",
    href: "/one-day-in-bodrum-from-a-cruise-ship",
    cta: "See day plans",
  },
  {
    slug: "castle",
    number: "04",
    title: "Bodrum Castle from the Port",
    description:
      "How to reach the Castle of St Peter from your ship — tickets, timing and what to expect inside the underwater archaeology museum.",
    href: "/bodrum-castle-from-cruise-port",
    cta: "Castle guide",
  },
  {
    slug: "gulet",
    number: "05",
    title: "Gulet Sailing & Kara Ada",
    description:
      "Traditional boat trips, swimming bays and the black-island thermal cove — Bodrum's signature sea day for cruise passengers.",
    href: "/gulet-sailing-guide-bodrum",
    cta: "Gulet guide",
  },
  {
    slug: "ship-schedules",
    number: "06",
    title: "Cruise Ship Schedules",
    description:
      "See which ships are scheduled at Bodrum before you book excursions or gulet departures.",
    href: "/ship-schedules",
    cta: "Check schedules",
  },
  {
    slug: "cruise-planner",
    number: "07",
    title: "Bodrum Cruise Planner",
    description:
      "Answer a few questions and get tailored excursion ideas matched to your port window and interests.",
    href: "/cruise-planner",
    cta: "Start planning",
  },
  {
    slug: "compare",
    number: "08",
    title: "Independent vs Ship Excursions",
    description:
      "Compare cruise-line tours with independent options — flexibility, value and return-to-ship confidence in Bodrum.",
    href: "/independent-vs-cruise-line-excursions",
    cta: "Compare options",
  },
];

export function getHomepageFaqs(): FAQ[] {
  return [
    {
      question: "Where do cruise ships dock in Bodrum?",
      answer:
        "Most ships berth at the Bodrum cruise port, within a 10–15 minute walk of the castle, marina and Old Town. Unlike many European ports, you do not need a long transfer to reach the main sights. See our Bodrum Cruise Port Guide for walking routes and timing.",
    },
    {
      question: "What is the best shore excursion from Bodrum for first-time visitors?",
      answer:
        "Most first-timers combine Bodrum Castle with a stroll through the whitewashed Old Town and marina — either independently or on a highlights tour. Gulet sailing is the other classic choice if your ship stays long enough. Our planner tailors recommendations to your exact time in port.",
    },
    {
      question: "Can I walk to Bodrum Castle from the cruise port?",
      answer:
        "Yes — for most berths, the Castle of St Peter is roughly 10–15 minutes on foot along the waterfront or through the Old Town. Allow extra time in midday heat and build a return buffer before all-aboard.",
    },
    {
      question: "Is gulet sailing worth it on a cruise day?",
      answer:
        "For many passengers, yes — it is Bodrum's defining experience. Half-day gulet trips suit standard port calls; full-day sails with lunch and multiple swimming stops need a longer window. See our Gulet Sailing guide for timing advice.",
    },
    {
      question: "Should I book a cruise-line excursion or go independent in Bodrum?",
      answer:
        "Ship excursions guarantee the vessel waits if you are delayed. Independent tours often offer smaller groups, better food focus and more flexible gulet routes — but you must respect all-aboard times. Because Bodrum's centre is walkable, DIY works well for castle and Old Town visits. See our Independent vs Cruise Line Excursions guide.",
    },
  ];
}
