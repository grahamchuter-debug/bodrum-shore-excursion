import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/enquire";

export const metadata = buildMetadata({
  title: "Enquire / Contact",
  description: "Get in touch about Bodrum shore excursions and Turkish Riviera cruise planning — register interest for upcoming tours, private tour requests and cruise-day questions.",
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Enquire", path },
];

export default function EnquirePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Enquire / Contact", description: "Get in touch about Bodrum cruise planning.", path })]} />
      <PageHero title="Enquire / Contact" subtitle="Register interest for upcoming tours, request a private Bodrum excursion, or ask about your Turkish Riviera port day." compact />
      <section className="section-padding">
        <div className="container-wide max-w-xl">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mb-6 card-feature">
            <p className="text-sm text-gray-700">Direct and small-group Bodrum shore excursions are launching soon. Use this form to register interest, request a private tour quote, or ask planning questions. We will also expand to Viator, GetYourGuide and Shore Excursions Group listings as tours go live.</p>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">I&apos;m interested in</label>
              <select id="interest" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
                <option>General cruise planning advice</option>
                <option>Register interest — shore excursion</option>
                <option>Private tour request</option>
                <option>Small-group / shared tour notification</option>
                <option>Food &amp; meze tour</option>
                <option>Wine tasting / boutique winery</option>
                <option>Gulet sailing experience</option>
                <option>Hammam experience</option>
                <option>Peninsula scenic tour</option>
                <option>Luxury Bodrum experience</option>
              </select>
            </div>
            <div>
              <label htmlFor="cruise" className="block text-sm font-medium text-gray-700 mb-1">Cruise date &amp; ship (optional)</label>
              <input id="cruise" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 15 June 2026, Celebrity Silhouette" />
            </div>
            <div>
              <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-1">Party size (optional)</label>
              <input id="party" type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="e.g. 2 adults" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" rows={5} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Tell us about your Bodrum port day and which excursion interests you..." />
            </div>
            <button type="submit" className="btn-primary">Send Enquiry</button>
          </form>
          <p className="mt-6 text-sm text-gray-600">Or email us directly at {SITE.email}</p>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
