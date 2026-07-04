export interface SiteImage {
  src: string;
  alt: string;
}

const B = "/images";

export const siteImages = {
  hero: {
    src: `${B}/hero-home.jpg`,
    alt: "Bodrum Castle, whitewashed houses and turquoise Aegean coastline",
  },
  ogDefault: {
    src: `${B}/og-default.jpg`,
    alt: "Bodrum cruise planning — castle, marina and Aegean sailing",
  },
  logo: {
    src: `${B}/logo-mark.svg`,
    alt: "Bodrum Shore Excursions",
  },
  port: {
    src: `${B}/cruise-port.jpg`,
    alt: "Cruise ships berthed at Bodrum cruise port on the Turkish Riviera",
  },
} as const;

export const subjectImages: Record<string, SiteImage> = {
  castle: { src: `${B}/castle.jpg`, alt: "Bodrum Castle of St Peter overlooking the harbour" },
  mausoleum: { src: `${B}/mausoleum.jpg`, alt: "Ancient Mausoleum at Halicarnassus ruins in Bodrum" },
  museum: { src: `${B}/museum.jpg`, alt: "Bodrum Museum of Underwater Archaeology inside the castle" },
  "old-town": { src: `${B}/old-town.jpg`, alt: "Whitewashed Bodrum Old Town lanes and bougainvillea" },
  marina: { src: `${B}/marina.jpg`, alt: "Luxury yachts at Bodrum Marina" },
  gulet: { src: `${B}/gulet.jpg`, alt: "Traditional Turkish gulet sailing on the Aegean" },
  "kara-ada": { src: `${B}/kara-ada.jpg`, alt: "Turquoise bay at Kara Ada Black Island near Bodrum" },
  beaches: { src: `${B}/beaches.jpg`, alt: "Aegean beach cove near Bodrum peninsula" },
  food: { src: `${B}/food.jpg`, alt: "Turkish meze and seafood by the Bodrum waterfront" },
  hammam: { src: `${B}/hammam.jpg`, alt: "Traditional Turkish hammam experience" },
  wine: { src: `${B}/wine.jpg`, alt: "Boutique winery tasting on the Bodrum peninsula" },
  peninsula: { src: `${B}/peninsula.jpg`, alt: "Scenic Bodrum peninsula villages and coastline" },
  highlights: { src: `${B}/highlights.jpg`, alt: "Bodrum highlights — castle, marina and Old Town" },
  luxury: { src: `${B}/luxury.jpg`, alt: "Luxury Bodrum experience on the Turkish Riviera" },
  "private-tour": { src: `${B}/private-tour.jpg`, alt: "Private guided tour exploring Bodrum" },
  family: { src: `${B}/family.jpg`, alt: "Family-friendly Bodrum sights and beaches" },
  planner: { src: `${B}/highlights.jpg`, alt: "Planning a Bodrum cruise day on the Aegean" },
};

function pick(key: string): SiteImage {
  return subjectImages[key] ?? siteImages.ogDefault;
}

const excursionImageKeys: Record<string, string> = {
  "bodrum-highlights-tour": "highlights",
  "bodrum-castle-and-ancient-history": "castle",
  "bodrum-walking-tour": "old-town",
  "gulet-sailing-experience": "gulet",
  "boutique-winery-and-wine-tasting": "wine",
  "turkish-food-experience": "food",
  "turkish-hammam-experience": "hammam",
  "bodrum-peninsula-scenic-tour": "peninsula",
  "private-bodrum-shore-excursion": "private-tour",
  "small-group-bodrum-highlights": "highlights",
  "luxury-bodrum-experience": "luxury",
};

export function getExcursionImage(slug: string): SiteImage {
  return pick(excursionImageKeys[slug] ?? "highlights");
}

export const excursionsHubImage = pick("castle");

const attractionImageKeys: Record<string, string> = {
  "bodrum-castle-from-cruise-port": "castle",
  "mausoleum-at-halicarnassus-from-cruise-port": "mausoleum",
  "bodrum-museum-of-underwater-archaeology-from-cruise-port": "museum",
  "gulet-sailing-from-bodrum-cruise-port": "gulet",
  "kara-ada-from-bodrum-cruise-port": "kara-ada",
};

export function getAttractionImage(slug: string): SiteImage {
  return pick(attractionImageKeys[slug] ?? "highlights");
}

const guideImageKeys: Record<string, string> = {
  "bodrum-old-town-walking-guide": "old-town",
  "bodrum-marina-guide": "marina",
  "best-things-to-do-in-bodrum-from-a-cruise-ship": "highlights",
  "one-day-in-bodrum-from-a-cruise-ship": "highlights",
  "turkish-hammam-guide-for-cruise-passengers": "hammam",
  "gulet-sailing-guide-bodrum": "gulet",
  "kara-ada-guide-from-bodrum-cruise-port": "kara-ada",
  "bodrum-beaches-guide-for-cruise-passengers": "beaches",
  "bodrum-food-and-meze-guide": "food",
  "turkish-cooking-guide-bodrum": "food",
  "boutique-winery-guide-bodrum": "wine",
  "bodrum-peninsula-villages-guide": "peninsula",
  "independent-vs-cruise-line-excursions": "private-tour",
  "best-bodrum-excursions-for-couples": "luxury",
  "best-bodrum-excursions-for-families": "family",
  "best-bodrum-excursions-for-history-lovers": "castle",
  "best-bodrum-excursions-for-food-and-wine-lovers": "food",
};

export function getGuideImage(slug: string): SiteImage {
  return pick(guideImageKeys[slug] ?? "highlights");
}
