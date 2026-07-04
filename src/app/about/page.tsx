import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/about";

export const metadata = buildMetadata({
  title: "About Bodrum Shore Excursions",
  description: "About Bodrum Shore Excursions — an independent Turkish Riviera cruise planning authority for passengers calling at Bodrum cruise port.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "About Bodrum Shore Excursions", description: "About Bodrum Shore Excursions.", path })]} />
      <PageHero title="About Bodrum Shore Excursions" subtitle="An independent planning authority for cruise passengers discovering Bodrum and the Turkish Aegean." compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="prose-body">
            <p>
              {SITE.name} is an independent planning resource for cruise passengers calling at Bodrum. Ships berth near the city centre, and our goal is to help you make the most of every hour ashore — from the Castle of St Peter and ancient Halicarnassus to gulet sailing, hammam rituals and peninsula wineries.
            </p>
            <p>
              We aim to be the definitive Bodrum cruise planning authority rather than simply another excursion catalogue. Our content is lifestyle-focused: practical timings, walking distances, return-to-ship confidence, and authentic Turkish culture — food, sailing, boutique wine and luxury experiences — written specifically for port-day passengers, not generic Turkey tourism.
            </p>
            <p>
              Our guides highlight realistic walking routes from the cruise port, when gulet trips fit your all-aboard window, and honest advice on independent vs ship excursions in a walkable Mediterranean port. Direct booking, private tours, shared groups and premium experiences are launching soon — register interest via our excursion pages or enquiry form.
            </p>
            <p>
              We are not affiliated with any cruise line or the Port of Bodrum. Ship schedules and travel times are indicative — always confirm all-aboard times with your cruise line.
            </p>
            <p>
              Have a question we haven&apos;t answered? <a href="/enquire">Get in touch</a> and we&apos;ll help you plan.
            </p>
          </div>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
