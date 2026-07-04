import type { ScheduleEntry, ShipSchedulePort } from "./types";
import {
  filterEntriesByMonth,
  filterEntriesByYear,
  getMonthsWithEntries,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import bodrumSchedule from "./imported-schedules/bodrum.json";

const SCHEDULE_FAQS = [
  {
    question: "How accurate are the Bodrum cruise ship schedules?",
    answer:
      "Schedules are compiled from published cruise timetables and updated periodically. Times, berths and dates can change — always confirm your arrival and departure with your cruise line before booking shore excursions.",
  },
  {
    question: "Where do ships dock when they call at Bodrum?",
    answer:
      "Most vessels berth at the Bodrum cruise port, a short walk or taxi ride from the castle, marina and Old Town. See our Bodrum Cruise Port Guide for walking routes and timing.",
  },
  {
    question: "When is Bodrum cruise season?",
    answer:
      "Bodrum sees most cruise calls from April through November, with peak traffic in May, June, September and October. Winter calls are less common but do occur on repositioning and niche itineraries.",
  },
];

const SCHEDULE_TIPS = [
  "Check how many ships share your port day before booking popular gulet departures or castle tickets",
  "Confirm your berth — most ships are within 10–15 minutes' walk of the castle and marina",
  "Book gulet sailing and peninsula tours early on multi-ship days when boat availability is limited",
  "Compare your hours ashore before choosing a full-day gulet trip versus an Old Town-focused morning",
];

export const schedulePorts: ShipSchedulePort[] = [
  {
    slug: "bodrum",
    name: "Bodrum",
    country: "Turkey",
    seoTitle: "Bodrum Cruise Ship Schedule 2026 & 2027",
    metaDescription:
      "Bodrum cruise ship schedule hub. See which ships are in port and plan castle tours, gulet sailing, hammam experiences and Turkish Riviera shore excursions around published arrival and departure times.",
    intro:
      "Bodrum is one of the Aegean's favourite cruise calls, with ships berthing close to the castle, marina and whitewashed Old Town. Check which vessels are scheduled before you book shore excursions, gulet trips or peninsula tours.",
    description:
      "Turkey's Turkish Riviera cruise gateway — ships dock near the city centre, with the castle and marina within easy walking distance.",
    scheduleOverview:
      "Bodrum sees seasonal cruise traffic from April through November, with calls from major Mediterranean and Greek-island itineraries.",
    planningTips: SCHEDULE_TIPS,
    faqs: SCHEDULE_FAQS,
  },
];

const scheduleData: Record<string, ScheduleEntry[]> = {
  bodrum: bodrumSchedule as ScheduleEntry[],
};

export function getSchedulePortBySlug(slug: string): ShipSchedulePort | undefined {
  return schedulePorts.find((p) => p.slug === slug);
}

export function getAllSchedulePortSlugs(): string[] {
  return schedulePorts.map((p) => p.slug);
}

export function getScheduleEntries(slug: string): ScheduleEntry[] {
  return scheduleData[slug] ?? [];
}

export function getScheduleEntryCount(slug: string): number {
  return getScheduleEntries(slug).length;
}

export function getScheduleEntriesForYear(slug: string, year: ScheduleYear): ScheduleEntry[] {
  return filterEntriesByYear(getScheduleEntries(slug), year);
}

export function getScheduleEntriesForMonth(slug: string, monthKey: string): ScheduleEntry[] {
  return filterEntriesByMonth(getScheduleEntries(slug), monthKey);
}

export function getVerifiedMonthKeys(slug: string): string[] {
  return getMonthsWithEntries(getScheduleEntries(slug));
}

export function searchSchedulesByShip(query: string): { portSlug: string; entries: ScheduleEntry[] }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: { portSlug: string; entries: ScheduleEntry[] }[] = [];
  for (const port of schedulePorts) {
    const matches = getScheduleEntries(port.slug).filter(
      (e) => e.ship.toLowerCase().includes(q) || e.cruiseLine.toLowerCase().includes(q),
    );
    if (matches.length) results.push({ portSlug: port.slug, entries: matches });
  }
  return results;
}

export function getTodayTomorrowEntries(slug: string): { today: ScheduleEntry[]; tomorrow: ScheduleEntry[] } {
  const entries = getScheduleEntries(slug);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    today: entries.filter((e) => e.date === fmt(today)),
    tomorrow: entries.filter((e) => e.date === fmt(tomorrow)),
  };
}
