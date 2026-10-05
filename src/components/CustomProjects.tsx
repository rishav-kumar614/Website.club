"use client";

import Image from "next/image";
import { CAPABILITIES } from "@/lib/content";
import { Reveal, RevealText } from "./ui/Reveal";

const CUSTOM_PILLARS = [
  {
    num: "01",
    title: "Zero-Template Architecture",
    desc: "100% custom Three.js and WebGL architecture built from scratch. No shared components, no design systems from other clients.",
  },
  {
    num: "02",
    title: "Tailored GLSL Shaders",
    desc: "Bespoke vertex and fragment shaders crafted for your specific visual physics: caustics, refraction, particles, and kinetic typography.",
  },
  {
    num: "03",
    title: "Full-Pipeline 3D Modeling",
    desc: "From CAD file optimization to high-fidelity organic models, texture baking, and cinematic studio lighting choreography.",
  },
  {
    num: "04",
    title: "60 FPS GPU Guaranteed",
    desc: "Rigorous performance profiling ensuring butter-smooth 60 FPS interactions across desktop, tablet, and mobile GPUs.",
  },
];

export function CustomProjects() {
  return (
    <section id="custom" className="section custom-section" aria-labelledby="custom-title">
      <div className="wrap">
        <div className="custom-grid">
          {/* Left Visual Column */}
          <Reveal className="custom-visual-col">
            <div className="custom-visual-stage">
              {/* Dynamic Ambient Glow */}
              <div className="custom-stage-ambient" aria-hidden="true" />

              {/* Spatial Viewport Card */}
              <div className="custom-viewport-card">
                {/* Top Telemetry Chip */}
                <div className="custom-telemetry-badge top-badge">
                  <span className="telemetry-dot" />
                  <span>100% Original Codebase · WebGL</span>
                </div>

                {/* High-Resolution Bespoke 3D Art */}
                <div className="custom-image-wrapper">
                  <Image
                    src="/custom_bespoke_3d.jpg"
                    alt="Custom 3D Creative Coding & Bespoke Web Development"
                    width={800}
                    height={600}
                    className="custom-3d-img"
                    priority
                  />
                  <div className="custom-image-gradient" aria-hidden="true" />
                </div>

                {/* Bottom Spec Badge */}
                <div className="custom-telemetry-badge bottom-badge">
                  <span className="spec-label">SHADER PIPELINE</span>
                  <span className="spec-val">Custom GLSL · 60 FPS</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Editorial Content Column */}
          <div className="custom-text-col">
            <div className="custom-header-group">
              <span className="custom-kicker">✦ BESPOKE 3D COMMISSION</span>
              <RevealText
                id="custom-title"
                text="Your digital flagship shouldn't fit into someone else's box."
                className="h2 custom-h2"
              />
            </div>

            <Reveal delay={120}>
              <p className="lead custom-lead">
                We design and engineer completely original 3D interactive web experiences from the ground up — tailored
                to your unique product mechanics, brand philosophy, and spatial narrative.
              </p>
            </Reveal>

            {/* 4 Architecture Pillars */}
            <div className="custom-pillars-grid">
              {CUSTOM_PILLARS.map((p, idx) => (
                <Reveal key={p.num} delay={160 + idx * 60} className="custom-pillar-card">
                  <div className="pillar-num">{p.num}</div>
                  <div className="pillar-content">
                    <h4 className="pillar-title">{p.title}</h4>
                    <p className="pillar-desc">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Capabilities Matrix Chips */}
            <Reveal delay={340} className="custom-caps-wrap">
              <span className="caps-label">STUDIO DISCIPLINES</span>
              <div className="custom-chips-list" aria-label="Capabilities">
                {CAPABILITIES.map((c, i) => (
                  <span key={c} className="custom-chip">
                    <span className="chip-idx">{String(i + 1).padStart(2, "0")}</span>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Commercial Queue Status & CTAs */}
            <Reveal delay={400} className="custom-footer-actions">
              <div className="queue-status-bar">
                <span className="queue-live-dot" />
                <span className="queue-text">
                  Commission Queue: <strong>2 Spots Remaining for Q4</strong>
                </span>
              </div>

              <div className="custom-btn-row">
                <a href="#contact" className="custom-cta-primary">
                  <span>Start a Custom Project</span>
                  <svg viewBox="0 0 16 16" fill="none" className="custom-arrow" aria-hidden="true">
                    <path
                      d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a href="#work" className="custom-cta-secondary">
                  <span>Explore Selected Work</span>
                  <svg viewBox="0 0 16 16" fill="none" className="custom-down-arrow" aria-hidden="true">
                    <path
                      d="M8 3V13M13 8L8 13L3 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
