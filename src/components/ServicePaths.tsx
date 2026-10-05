"use client";

import Image from "next/image";
import { SERVICES } from "@/lib/content";
import { Reveal, RevealText } from "./ui/Reveal";

const SERVICE_META: Record<
  string,
  {
    pathLabel: string;
    modelBadge: string;
    subtitle: string;
    chips: string[];
    isFlagship?: boolean;
    flagshipBanner?: string;
  }
> = {
  rent: {
    pathLabel: "PATH 01",
    modelBadge: "Turnkey",
    subtitle: "3D flagship website on subscription with zero upfront build cost",
    chips: ["48h Deployment", "Hosting & SSL Included", "Full Brand Setup"],
  },
  build: {
    pathLabel: "PATH 02",
    modelBadge: "Bespoke",
    subtitle: "Original 3D digital flagship custom-crafted from the ground up",
    chips: ["100% Original Code", "Tailored 3D Shaders", "Strategy & Art Direction", "Commission Queue"],
    isFlagship: true,
    flagshipBanner: "✦ STUDIO FLAGSHIP",
  },
  transform: {
    pathLabel: "PATH 03",
    modelBadge: "Retrofit",
    subtitle: "Elevate your existing site with immersive 3D and WebGL motion",
    chips: ["Zero Stack Migration", "Interactive 3D Layers", "60 FPS Guaranteed"],
  },
};

function RentVisual() {
  return (
    <div className="sv-rent-wrap">
      <Image
        src="/service_rent_3d.jpg"
        alt="Rent 3D Website Subscription"
        width={600}
        height={450}
        className="sv-rent-img"
        priority
      />
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="sv-build-wrap">
      <Image
        src="/service_build_3d.jpg"
        alt="Build Custom 3D Website"
        width={600}
        height={450}
        className="sv-build-img"
      />
    </div>
  );
}

function TransformVisual() {
  return (
    <div className="sv-transform-wrap">
      <Image
        src="/service_transform_3d.jpg"
        alt="Transform 2D Website into 3D Experience"
        width={600}
        height={450}
        className="sv-transform-img"
      />
    </div>
  );
}

const VISUALS = { rent: RentVisual, build: BuildVisual, transform: TransformVisual } as const;

export function ServicePaths() {
  return (
    <section id="services" className="section service-paths-section" aria-labelledby="services-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="service-paths-header">
          <div className="service-paths-header-left">
            <span className="service-paths-kicker">THREE WAYS TO WORK</span>
            <RevealText
              id="services-title"
              text="Three distinct paths. One extraordinary standard."
              className="h2 service-paths-h2"
            />
          </div>
          <Reveal delay={120} className="service-paths-header-right">
            <p className="lead">
              Whether you need an instant 3D flagship on flexible subscription, a completely custom build from
              scratch, or an immersive upgrade to your existing site.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric Tiered 3-Column Grid */}
        <div className="services-grid services-tiered-grid">
          {SERVICES.map((s, i) => {
            const Visual = VISUALS[s.id];
            const meta = SERVICE_META[s.id];
            const isFlagship = meta?.isFlagship;

            return (
              <Reveal
                as="article"
                key={s.id}
                delay={i * 100}
                className={`service-card ${isFlagship ? "service-card-flagship" : "service-card-standard"}`}
                spot
              >
                <a href={s.href} className="service-card-hit" aria-label={`${s.title}: ${s.cta}`} />

                {/* Flagship Top Banner Ribbon for Card 02 */}
                {isFlagship && (
                  <div className="flagship-top-badge" aria-hidden="true">
                    <span>{meta.flagshipBanner}</span>
                  </div>
                )}

                {/* Card Top Metadata Header */}
                <div className="service-card-topbar">
                  <span className="service-card-path">{meta?.pathLabel}</span>
                  <span className="service-card-pill">{meta?.modelBadge}</span>
                </div>

                {/* Elevated Floating Visual Stage */}
                <div className="service-card-stage">
                  <div className="service-stage-ambient" aria-hidden="true" />
                  <div className="service-stage-inner">
                    <Visual />
                  </div>
                </div>

                {/* Card Content Information */}
                <div className="service-card-content">
                  <div className="service-title-group">
                    <h3 className="service-card-title">{s.title}</h3>
                    <p className="service-card-subtitle">{meta?.subtitle}</p>
                  </div>

                  <p className="service-card-desc">{s.body}</p>

                  {/* Modern Capability Chips */}
                  <div className="service-chips-wrap">
                    {meta?.chips.map((chip, idx) => (
                      <span key={idx} className="service-chip">
                        <i className="service-chip-dot" />
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* High-Craft Action CTA */}
                  <div className="service-card-footer">
                    <span className={`service-card-cta-btn ${isFlagship ? "cta-btn-flagship" : ""}`}>
                      <span>{s.cta}</span>
                      <span className="service-arrow-wrap">
                        <svg viewBox="0 0 16 16" fill="none" className="service-arrow-icon" aria-hidden="true">
                          <path
                            d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
