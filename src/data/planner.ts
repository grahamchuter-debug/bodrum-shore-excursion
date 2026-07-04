import { excursions } from "./excursions";

export interface PlannerInput {
  arrivalTime: string;
  departureTime: string;
  adults: number;
  children: number;
  interests: string[];
  mobility: "full" | "some" | "limited";
  budget: "budget" | "mid" | "premium";
  style: "guided" | "mix" | "diy";
}

export interface PlannerLink {
  label: string;
  href: string;
  why: string;
}

export interface PlannerResult {
  headline: string;
  summary: string;
  excursions: PlannerLink[];
  guides: PlannerLink[];
  logistics: PlannerLink[];
  dayPlan: { time: string; text: string }[];
  returnConfidence: "high" | "medium" | "low";
}

export const INTEREST_OPTIONS = [
  { id: "history", label: "Ancient history & castle" },
  { id: "beaches", label: "Beaches & swimming" },
  { id: "sailing", label: "Gulet sailing" },
  { id: "food", label: "Turkish food & meze" },
  { id: "wine", label: "Wine & boutique wineries" },
  { id: "shopping", label: "Marina & Old Town shopping" },
  { id: "culture", label: "Culture & hammam" },
  { id: "relaxation", label: "Relaxation & slow pace" },
];

const INTEREST_TO_EXCURSION: Record<string, string[]> = {
  history: ["bodrum-castle-and-ancient-history", "bodrum-highlights-tour"],
  beaches: ["gulet-sailing-experience", "bodrum-peninsula-scenic-tour"],
  sailing: ["gulet-sailing-experience", "luxury-bodrum-experience"],
  food: ["turkish-food-experience", "turkish-hammam-experience"],
  wine: ["boutique-winery-and-wine-tasting", "turkish-food-experience"],
  shopping: ["bodrum-walking-tour", "bodrum-highlights-tour"],
  culture: ["turkish-hammam-experience", "bodrum-castle-and-ancient-history"],
  relaxation: ["turkish-hammam-experience", "gulet-sailing-experience"],
};

const ITINERARY_NAMES: Record<string, string> = {
  "bodrum-castle-and-ancient-history": "Ancient Bodrum",
  "bodrum-highlights-tour": "Bodrum Old Town & Marina",
  "bodrum-walking-tour": "Walking Day",
  "gulet-sailing-experience": "Gulet Sailing Day",
  "boutique-winery-and-wine-tasting": "Food & Wine Experience",
  "turkish-food-experience": "Food & Wine Experience",
  "luxury-bodrum-experience": "Luxury Bodrum",
  "small-group-bodrum-highlights": "Family Day",
  "turkish-hammam-experience": "Relaxation Day",
  "bodrum-peninsula-scenic-tour": "Beach Escape",
  "private-bodrum-shore-excursion": "Custom Bodrum Day",
};

function parseTime(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

function hoursAshore(arrival: string, departure: string): number {
  const diff = parseTime(departure) - parseTime(arrival);
  return Math.max(0, diff / 60);
}

function excursionLink(slug: string, why: string): PlannerLink | null {
  const e = excursions.find((x) => x.slug === slug);
  if (!e) return null;
  return { label: e.title, href: `/shore-excursions/${slug}`, why };
}

export function generateBodrumPlan(input: PlannerInput): PlannerResult {
  const { arrivalTime, departureTime, adults, children, interests, mobility, budget, style } = input;
  const party = adults + children;
  const hasKids = children > 0;
  const hours = hoursAshore(arrivalTime, departureTime);
  const shortDay = hours < 5;
  const standardDay = hours >= 5 && hours < 8;
  const longDay = hours >= 8;

  const excSlugs: string[] = [];
  const pushSlug = (s: string) => {
    if (s && !excSlugs.includes(s)) excSlugs.push(s);
  };

  const activeInterests = interests.length ? interests : ["history", "sailing"];
  for (const interest of activeInterests) {
    for (const s of INTEREST_TO_EXCURSION[interest] ?? []) pushSlug(s);
  }

  if (hasKids) pushSlug("small-group-bodrum-highlights");
  if (mobility === "limited") pushSlug("private-bodrum-shore-excursion");
  if (style === "diy") pushSlug("bodrum-walking-tour");

  if (shortDay) {
    pushSlug("bodrum-highlights-tour");
    pushSlug("bodrum-walking-tour");
    const ambitious = ["gulet-sailing-experience", "bodrum-peninsula-scenic-tour", "luxury-bodrum-experience"];
    ambitious.forEach((s) => {
      const idx = excSlugs.indexOf(s);
      if (idx >= 0) excSlugs.splice(idx, 1);
    });
  } else if (standardDay) {
    if (activeInterests.includes("sailing") || activeInterests.includes("beaches")) {
      pushSlug("gulet-sailing-experience");
    }
    if (activeInterests.includes("wine")) pushSlug("boutique-winery-and-wine-tasting");
    if (activeInterests.includes("food")) pushSlug("turkish-food-experience");
  } else if (longDay) {
    if (activeInterests.includes("sailing")) pushSlug("gulet-sailing-experience");
    if (activeInterests.includes("wine")) pushSlug("boutique-winery-and-wine-tasting");
    pushSlug("bodrum-peninsula-scenic-tour");
    if (budget === "premium") pushSlug("luxury-bodrum-experience");
  }

  if (style === "guided" && party >= 2) pushSlug("small-group-bodrum-highlights");
  if (budget === "premium") pushSlug("luxury-bodrum-experience");
  if (mobility === "limited" || style === "guided") pushSlug("private-bodrum-shore-excursion");

  const reasonMap: Record<string, string> = {
    "bodrum-highlights-tour": "The most efficient introduction to Bodrum — castle, marina and Old Town within walking distance.",
    "bodrum-castle-and-ancient-history": "Ancient Halicarnassus — castle, Mausoleum ruins and underwater archaeology museum.",
    "bodrum-walking-tour": "Explore the whitewashed lanes and marina on foot — ideal when the port is close to town.",
    "gulet-sailing-experience": "Bodrum's signature experience — turquoise bays and swimming stops on a traditional wooden boat.",
    "boutique-winery-and-wine-tasting": "Peninsula vineyards and Turkish wine tastings — relaxed and scenic.",
    "turkish-food-experience": "Meze, seafood and local flavours — the tastiest way to spend a port day.",
    "turkish-hammam-experience": "Traditional hammam ritual — culture and deep relaxation in one session.",
    "bodrum-peninsula-scenic-tour": "Coastal villages, viewpoints and quieter coves beyond the town centre.",
    "private-bodrum-shore-excursion": mobility === "limited" ? "Private vehicle and flexible pacing for your group." : "Maximum flexibility and return-to-ship confidence.",
    "small-group-bodrum-highlights": "Family-friendly pacing with manageable walking and clear return timing.",
    "luxury-bodrum-experience": "Premium gulet, private guide or upscale dining — for passengers who want the best of Bodrum.",
  };

  const excursionLinks = excSlugs
    .slice(0, 5)
    .map((s) => excursionLink(s, reasonMap[s] ?? "A strong match for your interests."))
    .filter((x): x is PlannerLink => x !== null);

  const topItinerary = excSlugs[0] ? ITINERARY_NAMES[excSlugs[0]] ?? "Your Bodrum Day" : "Your Bodrum Day";

  const guides: PlannerLink[] = [
    { label: "Bodrum Cruise Port Guide", href: "/cruise-port-guide", why: "Understand berths and walking routes to the castle and marina." },
    { label: "One Day in Bodrum", href: "/one-day-in-bodrum-from-a-cruise-ship", why: "Itineraries matched to your hours ashore." },
    { label: "Old Town Walking Guide", href: "/bodrum-old-town-walking-guide", why: "Navigate whitewashed lanes and the marina like a local." },
  ];
  if (activeInterests.includes("food") || activeInterests.includes("wine")) {
    guides.push({ label: "Food & Meze Guide", href: "/bodrum-food-and-meze-guide", why: "Where to eat and what to order on a port day." });
  }
  if (activeInterests.includes("sailing") || activeInterests.includes("beaches")) {
    guides.push({ label: "Gulet Sailing Guide", href: "/gulet-sailing-guide-bodrum", why: "Half-day vs full-day sails and return timing." });
  }
  if (activeInterests.includes("history")) {
    guides.push({ label: "Best for History Lovers", href: "/best-bodrum-excursions-for-history-lovers", why: "Castle, Mausoleum and ancient Halicarnassus explained." });
  }
  if (hasKids) {
    guides.push({ label: "Best Excursions for Families", href: "/best-bodrum-excursions-for-families", why: "Family-paced options with manageable walking." });
  }

  const logistics: PlannerLink[] = [
    { label: "Ship Schedules", href: "/ship-schedules", why: "See if other ships share your port day." },
    { label: "Independent vs Ship Excursions", href: "/independent-vs-cruise-line-excursions", why: "Compare flexibility and return-to-ship guarantees." },
    { label: "FAQ", href: "/faq", why: "Common Bodrum cruise passenger questions answered." },
  ];

  const dayPlan: { time: string; text: string }[] = [];
  const topExc = excursionLinks[0]?.label ?? "your chosen excursion";

  dayPlan.push({
    time: "On arrival",
    text: `Disembark at Bodrum cruise port — the castle and marina are typically 10–15 minutes on foot. Allow time for passport control and terminal exit.`,
  });
  if (shortDay) {
    dayPlan.push({ time: "Morning", text: `Focus on ${topItinerary}: ${topExc}. The town centre is walkable — no long transfer needed.` });
    dayPlan.push({
      time: "Midday",
      text: activeInterests.includes("food") ? "Quick meze or gözleme near the marina if time allows." : "Light lunch in the Old Town with a view of the castle.",
    });
    dayPlan.push({ time: "Return", text: "Head back 30–45 minutes before all-aboard. Short port days leave little margin for gulet trips." });
  } else if (standardDay) {
    dayPlan.push({ time: "Morning", text: `Start with ${topItinerary}: ${topExc}. Castle tickets are available at the gate but pre-booking saves queue time.` });
    dayPlan.push({
      time: "Midday",
      text: activeInterests.includes("food") ? "Meze lunch at a marina restaurant — fresh fish and Turkish salads." : "Explore the Old Town lanes and marina boutiques.",
    });
    dayPlan.push({
      time: "Afternoon",
      text: activeInterests.includes("sailing") ? "Half-day gulet departure from the marina if pre-booked with return timing confirmed." : "Hammam session or Mausoleum ruins visit before walking back.",
    });
    dayPlan.push({ time: "Return buffer", text: "Leave the marina 45–60 minutes before all-aboard. Gulet passengers should confirm boat return time with the operator." });
  } else {
    dayPlan.push({ time: "Early start", text: `Maximise your long day with ${topItinerary} — you have time for gulet sailing or a peninsula village tour.` });
    dayPlan.push({
      time: "Midday",
      text: activeInterests.includes("sailing") ? "Full or half-day gulet with lunch on board and swimming in a sheltered bay." : "Winery visit or Turkish cooking experience on the peninsula.",
    });
    dayPlan.push({ time: "Afternoon", text: "Second experience or relaxed return via the Old Town — sunset light on the whitewashed walls is worth the stroll." });
    dayPlan.push({ time: "Return buffer", text: "Even on long days, keep 45–60 minutes margin. Confirm your tour tracks ship departure." });
  }

  let returnConfidence: PlannerResult["returnConfidence"] = "high";
  if (excSlugs.includes("gulet-sailing-experience") && shortDay) returnConfidence = "low";
  else if (excSlugs.includes("bodrum-peninsula-scenic-tour") && shortDay) returnConfidence = "medium";
  else if (excSlugs.includes("gulet-sailing-experience") && standardDay) returnConfidence = "medium";
  else if (shortDay) returnConfidence = "high";

  const interestLabels = activeInterests.map((i) => INTEREST_OPTIONS.find((o) => o.id === i)?.label ?? i).join(", ");

  return {
    headline: `Your Bodrum Port-Day Plan — ${topItinerary} (${hours.toFixed(1)} hours ashore)`,
    summary: `A ${shortDay ? "short" : standardDay ? "standard" : "long"} port day for ${party} guest${party === 1 ? "" : "s"} focused on ${interestLabels.toLowerCase()}. ${style === "guided" ? "Guided tours recommended for gulet and peninsula trips." : style === "diy" ? "DIY works well for castle and Old Town — Bodrum's port is close to town." : "A mix of guided and independent works well in Bodrum."}`,
    excursions: excursionLinks,
    guides,
    logistics,
    dayPlan,
    returnConfidence,
  };
}
