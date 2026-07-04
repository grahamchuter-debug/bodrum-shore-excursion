import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PhotoHeroBand } from "@/components/PhotoHeroBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { excursions } from "@/data/excursions";
import { excursionsHubImage, getExcursionImage } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Bodrum Shore Excursions",
  description:
    "Premium Bodrum shore excursions for cruise passengers — castle and ancient history, gulet sailing, hammam rituals, Turkish food and meze, boutique winery tastings, peninsula villages, and private Turkish Riviera tours.",
  path: "/shore-excursions",
  image: excursionsHubImage.src,
  imageAlt: excursionsHubImage.alt,
  keywords: [
    "Bodrum cruise excursions",
    "Bodrum Castle cruise excursion",
    "Gulet cruise Bodrum",
    "Bodrum food tour",
    "Bodrum boat trip",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Shore Excursions", path: "/shore-excursions" },
];

const AVAILABILITY_BADGES = {
  "coming-soon": { label: "Coming soon", className: "pill bg-coastal-100" },
  "register-interest": { label: "Register interest", className: "pill-accent" },
  available: { label: "Available", className: "pill bg-coastal-800 text-white" },
};

export default function ShoreExcursionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Bodrum Shore Excursions", description: "Premium Bodrum shore excursions for cruise passengers.", path: "/shore-excursions" })]} />
      <PhotoHeroBand
        image={excursionsHubImage}
        eyebrow="Turkish Riviera tours"
        title="Bodrum Shore Excursions"
        subtitle="Premium, passenger-first tours built around your Bodrum port day — castle and ancient history, gulet sailing, hammam, food and wine, peninsula villages and luxury experiences, with reliable return-to-ship timing."
        compact
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mb-10 card-feature max-w-3xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              Direct booking, private tours, shared groups and premium experiences are launching soon. Browse excursion options below and <Link href="/enquire" className="font-semibold text-coastal-700 hover:underline">register your interest</Link> — we will notify you when bookable tours go live, including future Viator, GetYourGuide and Shore Excursions Group partnerships.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {excursions.map((e) => {
              const image = getExcursionImage(e.slug);
              const badge = e.availability ? AVAILABILITY_BADGES[e.availability] : AVAILABILITY_BADGES["register-interest"];
              return (
                <Link key={e.slug} href={`/shore-excursions/${e.slug}`} className="card-editorial group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/55 via-transparent to-transparent" aria-hidden="true" />
                    <span className="absolute left-3 top-3 pill bg-white/90">{e.category}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{e.title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{e.tagline}</p>
                    <p className="mt-3 text-xs font-medium text-coastal-700">{e.duration} · {e.pace}</p>
                    <span className={`mt-2 inline-block ${badge.className}`}>{badge.label}</span>
                    <p className="mt-2 text-xs text-gray-500">Best for: {e.bestFor}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
