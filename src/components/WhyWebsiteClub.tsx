"use client";

import { useState } from "react";
import { Reveal, RevealText } from "./ui/Reveal";

interface ComparisonRow {
  dimension: string;
  traditional: string;
  diy: string;
  websiteClub: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    dimension: "Production Timeline",
    traditional: "4 to 6 months of agency meetings",
    diy: "1-2 days (Flat generic template)",
    websiteClub: "48 Hours (Rental) or 3 Weeks (Bespoke)",
  },
  {
    dimension: "Visual Craft & Distinction",
    traditional: "High, but costs $50,000–$100,000+",
    diy: "Zero distinction (Looks like everyone else)",
    websiteClub: "Awwwards-grade 3D WebGL architecture",
  },
  {
    dimension: "Visitor Dwell Time & Recall",
    traditional: "Standard static browsing (15s dropoff)",
    diy: "High bounce rate (Flat 2D text fatigue)",
    websiteClub: "+340% average session duration & exploration",
  },
  {
    dimension: "3D GPU & Shader Maintenance",
    traditional: "Billed at $200/hr or completely abandoned",
    diy: "Impossible (No WebGL shader pipeline)",
    websiteClub: "All-inclusive continuous GPU & browser tuning",
  },
  {
    dimension: "SEO & Semantic Crawlability",
    traditional: "Often trapped in unindexed canvas",
    diy: "Basic HTML (Poor brand impression)",
    websiteClub: "100% Real semantic HTML + Server-side metadata",
  },
];

export function WhyWebsiteClub() {
  const [activeTab, setActiveTab] = useState<"matrix" | "cards">("cards");

  return (
    <section id="about" className="section why-section" aria-labelledby="why-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="why-header">
          <div className="why-header-top">
            <span className="why-eyebrow">
              <span className="why-eyebrow-pulse" />
              THE WEBSITE CLUB ADVANTAGE
            </span>
            <div className="why-view-switch" role="tablist" aria-label="Why Choose Us View">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "cards"}
                onClick={() => setActiveTab("cards")}
                className={`why-switch-btn ${activeTab === "cards" ? "is-active" : ""}`}
              >
                Core Pillars
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "matrix"}
                onClick={() => setActiveTab("matrix")}
                className={`why-switch-btn ${activeTab === "matrix" ? "is-active" : ""}`}
              >
                Competitive Matrix
              </button>
            </div>
          </div>

          <div className="why-title-group">
            <RevealText
              id="why-title"
              text="Built to be remembered. Engineered to convert."
              className="h2 why-headline"
            />
            <Reveal delay={100}>
              <p className="why-lead">
                98% of modern websites look identical: flat typography, stock photography, and cookie-cutter grids that
                visitors forget in 10 seconds. We craft tactile, spatial 3D web flagships that capture instant attention
                and stay permanently lodged in your customer&apos;s memory.
              </p>
            </Reveal>
          </div>
        </div>

        {/* View 1: Asymmetric Bento Architecture */}
        {activeTab === "cards" && (
          <div className="why-bento-layout">
            {/* Card 1 (Hero Bento): Retention Machine */}
            <Reveal delay={80} className="why-bento-hero">
              <div className="why-hero-content">
                <div className="why-card-meta">
                  <span className="why-meta-tag">PILLAR 01 · VISUAL RETENTION</span>
                  <span className="why-meta-badge">+340% Dwell Time</span>
                </div>
                <h3 className="why-hero-title">Designed for unignorable attention.</h3>
                <p className="why-hero-desc">
                  Flat websites are skimmed. Spatial 3D websites are explored. By turning passive visitors into active
                  participants who rotate products and explore reactive WebGL shaders, your brand commands memorable
                  mindshare that competitors cannot replicate.
                </p>

                {/* Micro Visual Telemetry Graphic */}
                <div className="why-retention-graphic" aria-hidden="true">
                  <div className="why-retention-col">
                    <span className="why-retention-label">Industry Average</span>
                    <div className="why-retention-bar is-dim">
                      <span>14s avg</span>
                    </div>
                  </div>
                  <div className="why-retention-col is-hero-col">
                    <span className="why-retention-label">Website Club 3D</span>
                    <div className="why-retention-bar is-active">
                      <span>58s avg · 3.4x Longer Engagement</span>
                    </div>
                  </div>
                </div>

                <div className="why-hero-foot">
                  <div className="why-pill-check">
                    <span className="why-check-dot" />
                    Zero passive bounce: Visitors interact within 1.8 seconds of landing
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2: 3D Without The Headaches */}
            <Reveal delay={140} className="why-bento-card why-card-overhead">
              <div className="why-card-top">
                <div className="why-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <span className="why-num-tag">02</span>
              </div>
              <span className="why-meta-tag">PILLAR 02 · ZERO OVERHEAD</span>
              <h3 className="why-card-title">3D without the technical headache.</h3>
              <p className="why-card-desc">
                High-end WebGL typically requires 3D modelers, graphics programmers, and specialized DevOps. We handle
                the entire pipeline: Draco compression, shader lighting, responsive tuning, and hosting.
              </p>
              <div className="why-checklist">
                <span className="why-check-item">✓ Sculpting & Draco compression</span>
                <span className="why-check-item">✓ Cross-browser WebGL2 tuning</span>
                <span className="why-check-item">✓ Automatic GPU context GC</span>
              </div>
            </Reveal>

            {/* Card 3: 3 Flexible Commercial Paths */}
            <Reveal delay={200} className="why-bento-card why-card-paths">
              <div className="why-card-top">
                <div className="why-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8"/>
                    <path d="M12 8l4 4-4 4"/>
                  </svg>
                </div>
                <span className="why-num-tag">03</span>
              </div>
              <span className="why-meta-tag">PILLAR 03 · COMMERCIAL FREEDOM</span>
              <h3 className="why-card-title">Three ways to launch. Zero lock-in.</h3>
              <p className="why-card-desc">
                You don&apos;t need an enterprise budget or a 6-month contract. Rent a flagship in 48 hours, commission a
                bespoke build, or transform your current website with spatial 3D touchpoints.
              </p>
              <div className="why-paths-pills">
                <span className="why-path-pill">
                  <strong>Rent 3D</strong> · 48h Launch
                </span>
                <span className="why-path-pill">
                  <strong>Custom</strong> · Bespoke World
                </span>
                <span className="why-path-pill">
                  <strong>Transform</strong> · Upgrade Existing
                </span>
              </div>
            </Reveal>

            {/* Card 4: Performance Still Matters */}
            <Reveal delay={260} className="why-bento-card why-card-speed">
              <div className="why-card-top">
                <div className="why-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <span className="why-num-tag">04</span>
              </div>
              <span className="why-meta-tag">PILLAR 04 · VELOCITY & SEO</span>
              <h3 className="why-card-title">Performance & conversion first.</h3>
              <p className="why-card-desc">
                Visual spectacle should never break conversion. Our dual-threaded engine paints real HTML in 0.4s while
                maintaining locked 60 FPS on real mobile hardware.
              </p>
              <div className="why-speed-badges">
                <span className="why-speed-badge">⚡ 0.4s FCP</span>
                <span className="why-speed-badge">🎯 60 FPS Locked</span>
                <span className="why-speed-badge">🔍 100% SEO Indexed</span>
              </div>
            </Reveal>
          </div>
        )}

        {/* View 2: Competitive Comparison Matrix */}
        {activeTab === "matrix" && (
          <Reveal delay={80} className="why-matrix-wrapper">
            <div className="why-matrix-table-container">
              <table className="why-matrix-table">
                <thead>
                  <tr>
                    <th scope="col" className="col-dim">Evaluation Factor</th>
                    <th scope="col" className="col-trad">Traditional 3D Agency</th>
                    <th scope="col" className="col-diy">DIY Templates & Builders</th>
                    <th scope="col" className="col-club">
                      <span className="why-club-header-tag">Website Club Studio</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISONS.map((row, idx) => (
                    <tr key={row.dimension} className={idx % 2 === 0 ? "row-alt" : ""}>
                      <td className="cell-dim">
                        <strong>{row.dimension}</strong>
                      </td>
                      <td className="cell-trad">
                        <span className="cell-indicator is-bad">✕</span>
                        {row.traditional}
                      </td>
                      <td className="cell-diy">
                        <span className="cell-indicator is-mid">~</span>
                        {row.diy}
                      </td>
                      <td className="cell-club">
                        <span className="cell-indicator is-good">✓</span>
                        <strong>{row.websiteClub}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="why-matrix-footer">
              <div className="why-footer-highlight">
                <span className="why-footer-badge">The Bottom Line</span>
                <span>
                  Website Club bridges the gap between unaffordable agency builds and forgettable flat website templates.
                  You get boutique agency-grade 3D craft with immediate, frictionless speed to market.
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Bottom Manifesto Credo Strip */}
        <Reveal delay={200} className="why-credo-strip">
          <div className="why-credo-content">
            <span className="why-credo-kicker">OUR STUDIO CONVICTION</span>
            <p className="why-credo-text">
              &ldquo;Your website is the single most valuable digital real estate your brand will ever own. In a world
              overwhelmed by forgettable noise, we make sure yours is the one they talk about.&rdquo;
            </p>
          </div>
          <div className="why-credo-action">
            <a href="#featured" className="btn btn-primary btn-sm">
              <span>Explore Flagship Models</span>
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
