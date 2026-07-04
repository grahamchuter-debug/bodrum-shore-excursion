import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { VisitorTypeSelector } from "@/components/VisitorTypeSelector";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import { coreSections, getHomepageFaqs } from "@/data/homepage";
import { getFeaturedExcursions } from "@/data/excursions";
import { siteImages, getExcursionImage } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Bodrum Shore Excursions & Turkish Riviera Cruise Planning",
  description:
    "The Bodrum cruise planning authority — shore excursions, castle and ancient history guides, gulet sailing, hammam and meze experiences, peninsula villages, boutique wine tastings, and a personalised cruise planner for Aegean port days.",
  path: "/",
  keywords: [
    "Bodrum shore excursions",
    "Bodrum cruise excursions",
    "Bodrum cruise port guide",
    "Bodrum Castle cruise excursion",
    "Gulet cruise Bodrum",
  ],
});

export default function HomePage() {
  const faqs = getHomepageFaqs();
  const featured = getFeaturedExcursions().slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs),
          travelGuideSchema({
            title: "Bodrum Shore Excursions & Turkish Riviera Cruise Planning",
            description: "The Bodrum cruise planning authority for Aegean port days.",
            path: "/",
          }),
        ]}
      />

      <section className="home-hero">
        <img src={siteImages.hero.src} alt={siteImages.hero.alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-2 text-coastal-100">Turkish Riviera cruise gateway</p>
          <h1 className="home-hero-heading">Bodrum Shore Excursions &amp; Mediterranean Cruise Planning</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Bodrum is one of the Mediterranean&apos;s most beautiful cruise destinations — ancient Halicarnassus, luxury marinas, whitewashed lanes, gulet sailing and authentic Turkish food. Plan your port day with lifestyle-focused guidance and return-to-ship confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shore-excursions" className="btn-accent">Find Shore Excursions</Link>
            <Link href="/cruise-planner" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">Use the Cruise Planner</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Cruise-timed, return-to-ship friendly</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Gulet, food, wine &amp; culture focus</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true">✓</span> Walkable port — castle &amp; marina nearby</span>
          </div>
        </div>
      </section>

      <VisitorTypeSelector />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <p className="section-eyebrow">Your Bodrum port day</p>
          <h2 className="section-title mt-2">The definitive Bodrum cruise planning authority</h2>
          <p className="section-subtitle">Lifestyle-focused guidance for passengers at Bodrum cruise port — from the Castle of St Peter to gulet bays, hammam rituals and peninsula wineries, with realistic timing for every port window.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreSections.map((s) => (
              <Link key={s.slug} href={s.href} className="nav-card group flex h-full flex-col">
                <span className="font-display text-2xl font-bold text-coastal-200">{s.number}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-600">{s.description}</p>
                <span className="mt-3 text-sm font-semibold text-maple-600">{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-coastal-50">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Featured Shore Excursions</h2>
              <p className="section-subtitle">Premium, cruise-passenger-focused experiences — register interest as direct and shared tours launch.</p>
            </div>
            <Link href="/shore-excursions" className="btn-secondary shrink-0">All Excursions</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e) => {
              const image = getExcursionImage(e.slug);
              return (
                <Link key={e.slug} href={`/shore-excursions/${e.slug}`} className="card-editorial group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/55 via-transparent to-transparent" aria-hidden="true" />
                    <span className="absolute left-3 top-3 pill bg-white/90">{e.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">{e.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{e.tagline}</p>
                    <p className="mt-1 text-xs text-coastal-700">Best for: {e.bestFor.split("—")[0].trim()}</p>
                    <p className="mt-3 text-xs font-medium text-coastal-700">{e.duration} · {e.pace}</p>
                    <span className="mt-2 inline-block pill-accent">Register interest</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <div className="card-feature">
            <h3 className="font-display text-xl font-bold text-gray-900">First time in Bodrum?</h3>
            <p className="mt-3 text-gray-700">Start with Bodrum Castle and a stroll through the whitewashed Old Town to the marina — most berths are a 10–15 minute walk. Our port guide explains walking routes and all-aboard timing.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/bodrum-castle-from-cruise-port" className="btn-secondary text-sm">Castle Guide</Link>
              <Link href="/bodrum-old-town-walking-guide" className="btn-secondary text-sm">Old Town Guide</Link>
              <Link href="/cruise-port-guide" className="btn-secondary text-sm">Port Guide</Link>
            </div>
          </div>
          <div className="card-accent">
            <h3 className="font-display text-xl font-bold text-gray-900">Want a lifestyle day on the Aegean?</h3>
            <p className="mt-3 text-gray-700">Gulet sailing, Kara Ada thermal bays, hammam rituals and boutique winery tastings define Bodrum beyond the castle walls. We help you choose realistically for your ship&apos;s hours.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/gulet-sailing-guide-bodrum" className="btn-secondary text-sm">Gulet Sailing</Link>
              <Link href="/bodrum-food-and-meze-guide" className="btn-secondary text-sm">Food &amp; Meze</Link>
              <Link href="/boutique-winery-guide-bodrum" className="btn-secondary text-sm">Wine Tasting</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-coastal-900 text-white">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Build your personalised Bodrum cruise plan</h2>
          <p className="mt-4 text-white/85">Tell us your ship times, interests and mobility — get tailored excursion ideas with return-to-ship confidence for your Turkish Riviera port day.</p>
          <Link href="/cruise-planner" className="btn-accent mt-8 inline-flex">Start the Cruise Planner</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <FAQSection faqs={faqs} title="Bodrum Cruise Planning FAQs" />
        </div>
      </section>
    </>
  );
}
