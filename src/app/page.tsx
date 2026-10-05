import { FAQ as FAQ_ITEMS, SITE_URL } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicePaths } from "@/components/ServicePaths";
import { FeaturedWebsites } from "@/components/FeaturedWebsites";
import { Transformation } from "@/components/Transformation";
import { SelectedWork } from "@/components/SelectedWork";
import { Performance } from "@/components/Performance";
import { PricingPreview } from "@/components/PricingPreview";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Website Club",
      url: SITE_URL,
      description: "3D & Interactive Web Studio",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Website Club",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "ProfessionalService",
      name: "Website Club",
      url: SITE_URL,
      serviceType: ["3D website rental", "Custom 3D website design", "Website 3D transformation"],
      provider: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <ServicePaths />
        <FeaturedWebsites />
        <Transformation />
        <SelectedWork />
        <Performance />
        <PricingPreview />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
