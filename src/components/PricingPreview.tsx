"use client";

import { useState } from "react";
import { Reveal, RevealText } from "./ui/Reveal";

interface PlanItem {
  id: string;
  name: string;
  model: string;
  priceMonthly: string;
  priceAnnual: string;
  unitMonthly: string;
  unitAnnual: string;
  lead: string;
  badge?: string;
  featured?: boolean;
  ctaText: string;
  ctaHref: string;
  timeline: string;
  deliverables: string[];
  ownership: string;
  support: string;
}

const PLANS: PlanItem[] = [
  {
    id: "rent",
    name: "3D Flagship Rental",
    model: "Turnkey Subscription",
    priceMonthly: "$490",
    priceAnnual: "$390",
    unitMonthly: "/ month",
    unitAnnual: "/ month (billed annually)",
    lead: "Launch an award-winning 3D web experience on your own domain with zero upfront capital outlay.",
    timeline: "Launch in 48 Hours",
    ownership: "Licensed flagship · 100% your domain & content",
    support: "24/7 Hosting, GPU maintenance & edge updates included",
    ctaText: "Explore Rental Flagships",
    ctaHref: "#websites",
    deliverables: [
      "Select from curated production 3D architectures",
      "100% Brand adaptation: colors, type, 3D lighting & copy",
      "Custom domain DNS configuration & global SSL setup",
      "Global Edge CDN with 60 FPS guaranteed WebGL",
      "Zero server headaches: continuous browser & GPU maintenance",
      "Monthly copy & asset swap support included",
    ],
  },
  {
    id: "custom",
    name: "Custom Bespoke Studio",
    model: "Project-Based Commission",
    priceMonthly: "$8,500",
    priceAnnual: "$8,500",
    unitMonthly: "starting anchor",
    unitAnnual: "starting anchor",
    lead: "A 100% original spatial 3D website engineered from scratch around your brand's unique narrative.",
    badge: "Most Popular · Full IP Ownership",
    featured: true,
    timeline: "3 to 4 Weeks Delivery",
    ownership: "100% Full IP & code ownership transferred to you",
    support: "30-day post-launch warranty + ongoing SLA options",
    ctaText: "Commission a Bespoke Project",
    ctaHref: "#contact",
    deliverables: [
      "Original 3D creative direction, concepting & storyboarding",
      "Bespoke 3D asset modeling & GLSL shader architecture",
      "Custom scroll choreography & physics-based interactions",
      "Dual-threaded performance tuning (0.4s FCP & 60 FPS)",
      "Full CMS, e-commerce, or Next.js backend integration",
      "Complete source code repository & Figma file transfer",
    ],
  },
  {
    id: "transform",
    name: "3D Website Transformation",
    model: "Scope-Based Upgrade",
    priceMonthly: "$3,800",
    priceAnnual: "$3,800",
    unitMonthly: "starting anchor",
    unitAnnual: "starting anchor",
    lead: "Upgrade your existing Webflow, Shopify, or Next.js website with high-converting spatial 3D touchpoints.",
    timeline: "7 to 14 Days Delivery",
    ownership: "Seamless injection into your current codebase",
    support: "Cross-browser regression testing & launch audit",
    ctaText: "Transform My Current Website",
    ctaHref: "#transform",
    deliverables: [
      "Full performance & conversion audit of current site",
      "Spatial 3D hero or interactive product configurator section",
      "Scroll-driven WebGL shader injection into your existing stack",
      "Works with Webflow, Shopify, WordPress, or Next.js",
      "Draco compression: zero page speed degradation",
      "Zero downtime: seamless staged deployment",
    ],
  },
];

const COMMERCIAL_TERMS = [
  { label: "Minimum Rental Term", val: "3 Months", note: "Flexible rollover thereafter" },
  { label: "Cancellation Notice", val: "30 Days", note: "Zero lock-in penalties" },
  { label: "Domain & IP Rights", val: "100% Yours", note: "Full transferability guaranteed" },
  { label: "Performance Audit", val: "60 FPS Verified", note: "Mobile & desktop certified" },
];

export function PricingPreview() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <section id="pricing" className="section pricing-section" aria-labelledby="pricing-title">
      <div className="wrap">
        {/* Header */}
        <div className="pricing-header">
          <div className="pricing-header-main">
            <span className="pricing-eyebrow">
              <span className="pricing-eyebrow-dot" />
              TRANSPARENT INVESTMENT
            </span>
            <RevealText
              id="pricing-title"
              text="Three clear paths. Zero hidden fees."
              className="h2 pricing-headline"
            />
          </div>

          <div className="pricing-header-sub">
            <Reveal delay={120}>
              <p className="pricing-lead">
                Whether you want to launch a turnkey 3D flagship in 48 hours, commission a custom bespoke world, or
                upgrade your current site, we provide predictable pricing with zero development friction.
              </p>
            </Reveal>

            {/* Billing Cycle Switcher */}
            <div className="pricing-toggle-wrap">
              <span className="pricing-toggle-label">Billing Option:</span>
              <div className="pricing-switcher" role="tablist" aria-label="Billing cycle selector">
                <button
                  type="button"
                  role="tab"
                  aria-selected={billingCycle === "monthly"}
                  onClick={() => setBillingCycle("monthly")}
                  className={`pricing-switcher-btn ${billingCycle === "monthly" ? "is-active" : ""}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={billingCycle === "annual"}
                  onClick={() => setBillingCycle("annual")}
                  className={`pricing-switcher-btn ${billingCycle === "annual" ? "is-active" : ""}`}
                >
                  Annual Commitment
                  <span className="pricing-discount-pill">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {PLANS.map((plan, index) => {
            const isFeatured = plan.featured;
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
            const unit = billingCycle === "annual" ? plan.unitAnnual : plan.unitMonthly;

            return (
              <Reveal
                as="article"
                key={plan.id}
                delay={index * 100}
                className={`pricing-card ${isFeatured ? "is-featured" : ""}`}
              >
                {/* Featured Badge */}
                {plan.badge && (
                  <div className="pricing-badge-strip">
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="pricing-card-top">
                  <div className="pricing-card-model-row">
                    <span className="pricing-model-tag">{plan.model}</span>
                    <span className="pricing-timeline-tag">{plan.timeline}</span>
                  </div>

                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <p className="pricing-plan-lead">{plan.lead}</p>
                </div>

                {/* Price Display */}
                <div className="pricing-price-box">
                  <div className="pricing-price-row">
                    <span className="pricing-price-val">{price}</span>
                    <span className="pricing-price-unit">{unit}</span>
                  </div>
                  {plan.id === "rent" && billingCycle === "annual" && (
                    <span className="pricing-savings-note">Includes 2 months free + priority GPU edge tier</span>
                  )}
                </div>

                {/* Key Deliverables Checklist */}
                <div className="pricing-features-wrap">
                  <span className="pricing-features-heading">What&apos;s Included:</span>
                  <ul className="pricing-features-list">
                    {plan.deliverables.map((item) => (
                      <li key={item} className="pricing-feature-item">
                        <svg className="pricing-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SLA / Ownership Meta */}
                <div className="pricing-meta-strip">
                  <div className="pricing-meta-row">
                    <span className="pricing-meta-k">Ownership:</span>
                    <span className="pricing-meta-v">{plan.ownership}</span>
                  </div>
                  <div className="pricing-meta-row">
                    <span className="pricing-meta-k">Maintenance:</span>
                    <span className="pricing-meta-v">{plan.support}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pricing-card-footer">
                  <a
                    href={plan.ctaHref}
                    className={`btn ${isFeatured ? "btn-primary" : "btn-secondary"} btn-block`}
                  >
                    <span>{plan.ctaText}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Commercial Terms Strip */}
        <Reveal delay={150} className="pricing-terms-bar">
          <div className="pricing-terms-header">
            <span className="pricing-terms-kicker">COMMERCIAL STANDARDS</span>
            <h4 className="pricing-terms-title">Studio Terms at a Glance</h4>
          </div>

          <div className="pricing-terms-grid">
            {COMMERCIAL_TERMS.map((t) => (
              <div key={t.label} className="pricing-term-cell">
                <span className="pricing-term-label">{t.label}</span>
                <span className="pricing-term-val">{t.val}</span>
                <span className="pricing-term-note">{t.note}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Enterprise Callout Strip */}
        <Reveal delay={200} className="pricing-enterprise-strip">
          <div className="pricing-enterprise-content">
            <span className="pricing-enterprise-badge">ENTERPRISE & ACCELERATORS</span>
            <h4 className="pricing-enterprise-title">Need a multi-brand spatial library or custom WebGL configurator?</h4>
            <p className="pricing-enterprise-desc">
              We partner with luxury conglomerates, venture-backed tech startups, and industrial manufacturers on
              dedicated spatial engineering contracts with custom SLAs and private GPU edge clusters.
            </p>
          </div>
          <div className="pricing-enterprise-action">
            <a href="#contact" className="btn btn-outline btn-sm">
              <span>Request Enterprise Scoping</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
