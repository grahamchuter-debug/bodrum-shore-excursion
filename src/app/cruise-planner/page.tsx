import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BodrumCruisePlanner } from "@/components/BodrumCruisePlanner";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { siteImages } from "@/lib/images";

const path = "/cruise-planner";

export const metadata = buildMetadata({
  title: "Bodrum Cruise Planner",
  description:
    "Build a personalised Bodrum cruise plan. Enter your ship arrival and departure times, interests and mobility — get tailored Turkish Riviera excursion ideas with return-to-ship confidence.",
  path,
  keywords: ["Bodrum cruise planner", "Bodrum cruise day plan"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Cruise Planner", path },
];

export default function CruisePlannerPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Bodrum Cruise Planner", description: "Build a personalised Bodrum cruise plan.", path })]} />
      <PageHero
        title="Bodrum Cruise Planner"
        subtitle="Enter your ship times, party size and interests — get tailored shore excursion ideas for your Turkish Riviera port day, with realistic timing and return-to-ship confidence."
        imageSrc={siteImages.hero.src}
        imageAlt={siteImages.hero.alt}
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <BodrumCruisePlanner />
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
