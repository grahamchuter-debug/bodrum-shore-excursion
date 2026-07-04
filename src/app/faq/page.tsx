import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { siteFaqs } from "@/data/faqs";

const path = "/faq";

export const metadata = buildMetadata({
  title: "Bodrum Cruise FAQ",
  description:
    "Frequently asked questions about Bodrum shore excursions, the cruise port, castle visits, gulet sailing, hammam experiences, food tours and return-to-ship timing for cruise passengers.",
  path,
  keywords: ["Bodrum cruise port FAQ", "Bodrum shore excursions FAQ"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(siteFaqs), webPageSchema({ title: "Bodrum Cruise FAQ", description: metadata.description as string, path })]} />
      <PageHero title="Bodrum Cruise FAQ" subtitle="Practical answers for cruise passengers calling at Bodrum — port logistics, excursions, gulet sailing, food, wine and return-to-ship timing on the Turkish Riviera." compact />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <FAQSection faqs={siteFaqs} title="Common questions" />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
