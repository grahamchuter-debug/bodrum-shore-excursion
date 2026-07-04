import type { FAQ } from "./types";

export interface Terminal {
  name: string;
  quay: string;
  usedBy: string;
  cityAccess: string;
}

export const terminals: Terminal[] = [
  {
    name: "Bodrum Cruise Port (main berth)",
    quay: "Bodrum harbour, east of the castle",
    usedBy: "Most medium and large cruise ships calling at Bodrum",
    cityAccess: "10–15 min walk to castle and marina; taxis at the terminal gate",
  },
  {
    name: "Bodrum International Cruise Port",
    quay: "Dedicated cruise facility near the city centre",
    usedBy: "Seasonal calls on Mediterranean and Greek-island itineraries",
    cityAccess: "Flat waterfront walk to Old Town; dolmuş and taxi ranks on site",
  },
  {
    name: "Bodrum Marina area berths",
    quay: "Inner harbour near the yacht marina",
    usedBy: "Smaller ships and occasional overflow berthing",
    cityAccess: "Immediate access to restaurants, shops and gulet jetties",
  },
];

export interface PortGuideSection {
  heading: string;
  paragraphs: string[];
}

export const portGuideSections: PortGuideSection[] = [
  {
    heading: "Where cruise ships dock in Bodrum",
    paragraphs: [
      "Bodrum is one of the Mediterranean's most walkable cruise ports. Most ships berth at the Bodrum cruise port or the international cruise facility, both within a short walk of the Castle of St Peter, the yacht marina and the whitewashed lanes of the Old Town. This is a major advantage over ports like Bilbao or Rome, where reaching the city centre requires a lengthy transfer.",
      "The cruise terminal area has basic services — toilets, shade, taxi ranks and sometimes local information desks. From the gangway, you can usually see the castle walls and marina masts, which makes independent exploring straightforward for confident walkers.",
    ],
  },
  {
    heading: "Getting from the port to the main sights",
    paragraphs: [
      "Bodrum Castle and the Museum of Underwater Archaeology are roughly 10–15 minutes on foot from most berths, either along the waterfront promenade or through the Old Town's pedestrian lanes. The marina — lined with restaurants, cafés and gulet departure points — is equally close.",
      "The Mausoleum of Halicarnassus ruins sit about 15–20 minutes' walk inland from the castle, near the centre of modern Bodrum. Taxis are inexpensive for short hops if midday heat or mobility is a concern. Dolmuş minibuses run along the coast for peninsula trips but are less useful for the immediate city sights.",
      "For gulet sailing, Kara Ada or peninsula village tours, you will meet at a marina jetty — typically a 5–10 minute walk from the cruise terminal. Pre-booked excursions often include a escort from the ship to the boat.",
    ],
  },
  {
    heading: "Facilities and practicalities",
    paragraphs: [
      "The Turkish lira is the local currency, though euros and cards are widely accepted in tourist areas. Turkish and English are spoken in the marina and Old Town; organised tours operate in English. ATMs, pharmacies and supermarkets sit within walking distance of the port.",
      "Bodrum is sunny and hot from May through October — carry water, sun protection and a hat for walking days. Modest dress is appreciated at the castle and mosques; beachwear belongs on gulets and designated beaches only.",
      "Mobile signal is generally good in the city centre. Download offline maps before leaving the ship as a backup for peninsula excursions.",
    ],
  },
  {
    heading: "Return-to-ship timing",
    paragraphs: [
      "Confirm your all-aboard time (usually 30–60 minutes before departure) and work backwards. Castle and Old Town visits need a 30–45 minute return buffer on foot. Gulet trips and peninsula tours need 45–60 minutes margin — boats can run late in busy weather, so choose operators that track ship schedules.",
      "Bodrum traffic is lighter than major city ports, but marina crowds and summer heat can slow your walk back. If you book independently, set a phone alarm well before all-aboard. Ship-run excursions guarantee the vessel waits; independent passengers must manage their own timing.",
    ],
  },
];

export const portGuideFaqs: FAQ[] = [
  {
    question: "How far is Bodrum Castle from the cruise port?",
    answer:
      "About 800 metres to 1 km — roughly 10–15 minutes on foot from most berths, depending on which quay your ship uses and whether you walk via the waterfront or the Old Town.",
  },
  {
    question: "Can I walk from the cruise port to Bodrum Old Town?",
    answer:
      "Yes — the whitewashed Old Town lanes, marina and castle are all within comfortable walking distance. This is one of Bodrum's biggest advantages for cruise passengers.",
  },
  {
    question: "Is there a shuttle from the Bodrum cruise terminal?",
    answer:
      "Some cruise lines offer their own shuttles, but a dedicated free port shuttle is uncommon because the city centre is so close. Walking, taxi and pre-booked tours are the reliable options.",
  },
  {
    question: "How much time do I need to get back to my ship?",
    answer:
      "Allow 30–45 minutes buffer for castle and Old Town visits on foot, and 45–60 minutes for gulet trips or peninsula tours. Build extra margin on hot days or if your berth is at the far end of the harbour.",
  },
  {
    question: "Where do gulet boats depart from?",
    answer:
      "Most day-trip gulets leave from jetties in Bodrum Marina or the adjacent harbour, a 5–10 minute walk from the cruise terminal. Your booking confirmation should specify the exact meeting point.",
  },
];
