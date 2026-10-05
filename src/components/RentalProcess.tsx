"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, RevealText } from "./ui/Reveal";

interface StepData {
  num: string;
  phase: string;
  title: string;
  shortDesc: string;
  timeline: string;
  deliverable: string;
  badge: string;
  image: string;
  imageAlt: string;
  overlayTitle: string;
  overlayBadge: string;
  telemetry: string;
  metrics: { label: string; val: string }[];
}

const STEPS_DATA: StepData[] = [
  {
    num: "01",
    phase: "PHASE 01: SELECTION",
    title: "Select Your Flagship",
    shortDesc: "Choose an award-winning 3D website from our collection tailored to your industry and aesthetic.",
    timeline: "Hour 0 · Immediate",
    deliverable: "Locked 3D Architecture & Model Selection",
    badge: "Curated 3D Models",
    image: "/process_step1_selection.jpg",
    imageAlt: "Interactive 3D Website Architecture & Selection Showroom",
    overlayTitle: "Flagship 3D Architecture Showroom",
    overlayBadge: "Live 3D Viewport",
    telemetry: "60 FPS Locked · Curated Architecture Vault",
    metrics: [
      { label: "Turnaround", val: "Instant" },
      { label: "3D Vault", val: "Curated" },
      { label: "Frame Rate", val: "60 FPS" },
    ],
  },
  {
    num: "02",
    phase: "PHASE 02: TAILORING",
    title: "Brand Customisation",
    shortDesc: "Our creative engineers inject your brand palette, fonts, copy, product assets, and shader lighting.",
    timeline: "Hours 2–24 · Full Adaptation",
    deliverable: "100% Brand Palette, Fonts & Custom Shaders",
    badge: "Shader Adaptation",
    image: "/process_step2_customization.jpg",
    imageAlt: "Bespoke WebGL Shaders, Color Systems & Material Tuning",
    overlayTitle: "Custom Shaders & Dynamic Brand Materials",
    overlayBadge: "GLSL Material Studio",
    telemetry: "Exact Palette Injection · Real-time Caustics",
    metrics: [
      { label: "Color Adaptation", val: "Exact Match" },
      { label: "Shader Physics", val: "Custom GLSL" },
      { label: "Delivery", val: "< 24 Hours" },
    ],
  },
  {
    num: "03",
    phase: "PHASE 03: DEPLOYMENT",
    title: "Domain & Go Live",
    shortDesc: "We configure your custom DNS, provision global SSL certificates, and launch on our global edge CDN.",
    timeline: "Hour 48 · Production Launch",
    deliverable: "Custom Domain DNS, Global SSL & 60 FPS Audit",
    badge: "Edge Production",
    image: "/process_step3_deployment.jpg",
    imageAlt: "Global Edge DNS, SSL Certification & CDN Delivery",
    overlayTitle: "Global Edge Network & Production SSL",
    overlayBadge: "Edge CDN Live",
    telemetry: "< 18ms Worldwide Latency · Production SSL",
    metrics: [
      { label: "Edge Latency", val: "< 18ms Global" },
      { label: "Encryption", val: "Automated SSL" },
      { label: "Go-Live Target", val: "Hour 48" },
    ],
  },
  {
    num: "04",
    phase: "PHASE 04: EVOLUTION",
    title: "24/7 Hosting & Care",
    shortDesc: "Zero server headaches. Continuous GPU browser compatibility, monthly content updates, and priority support.",
    timeline: "Ongoing · Zero Dev Overhead",
    deliverable: "Fully Managed Hosting & Browser GPU Updates",
    badge: "Managed Shaders",
    image: "/process_step4_hosting.jpg",
    imageAlt: "Continuous GPU Browser Optimization & Managed Hosting",
    overlayTitle: "Continuous GPU Optimization & 99.99% Care",
    overlayBadge: "Perpetual Engine",
    telemetry: "99.99% Uptime SLA · Zero Dev Overhead",
    metrics: [
      { label: "Uptime SLA", val: "99.99% Guaranteed" },
      { label: "GPU Patching", val: "Continuous" },
      { label: "Dev Overhead", val: "0 Hours / Mo" },
    ],
  },
];

export function RentalProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = STEPS_DATA[activeStep];

  return (
    <section id="process" className="section process-section" aria-labelledby="process-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="process-header">
          <div className="process-header-left">
            <span className="process-kicker">✦ TURNKEY TIMELINE</span>
            <RevealText
              id="process-title"
              text="From selection to live production in 48 hours."
              className="h2 process-h2"
            />
          </div>
          <Reveal delay={120} className="process-header-right">
            <p className="lead">
              A streamlined 4-step deployment cycle designed for rapid brand execution, zero technical friction, and
              production-grade 3D performance.
            </p>
          </Reveal>
        </div>

        {/* Interactive Timeline & 3D Stage Showcase */}
        <div className="timeline-showcase-grid">
          {/* Left Column: 4 Interactive Step Selectors */}
          <div className="timeline-selector-col" role="tablist" aria-label="Rental Process Stages">
            {STEPS_DATA.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  className={`timeline-step-card ${isActive ? "is-active" : ""}`}
                >
                  <div className="step-card-meta">
                    <span className="step-index-badge">{step.num}</span>
                    <span className="step-phase-text">{step.phase}</span>
                    <span className="step-timeline-pill">{step.timeline}</span>
                  </div>

                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.shortDesc}</p>

                  {/* Active indicator rail */}
                  <div className="step-active-rail" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic 3D Studio Preview Stage */}
          <div
            id={`stage-panel-${activeStep}`}
            role="tabpanel"
            aria-label={`${current.title} preview stage`}
            className="timeline-stage-col"
          >
            <div className="stage-canvas-card">
              {/* Top Viewport Chrome */}
              <div className="stage-topbar">
                <div className="stage-phase-tag">
                  <span className="live-status-dot" />
                  <span>{current.phase}</span>
                </div>
                <div className="stage-topbar-right">
                  <span className="stage-step-counter">STEP {activeStep + 1} OF 4</span>
                  <div className="stage-badge-pill">
                    <span>{current.badge}</span>
                  </div>
                </div>
              </div>

              {/* High-Resolution 3D Studio Visual Stage */}
              <div className="stage-image-viewport">
                <Image
                  key={current.image}
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(max-width: 960px) 100vw, 55vw"
                  className="stage-visual-img"
                  priority={activeStep === 0}
                />

                {/* Ambient Depth Scrim */}
                <div className="stage-image-gradient" aria-hidden="true" />

                {/* Floating Top Telemetry Badge */}
                <div className="stage-floating-header">
                  <span className="stage-overlay-title">{current.overlayTitle}</span>
                  <span className="stage-overlay-badge">{current.overlayBadge}</span>
                </div>

                {/* Floating Bottom Telemetry Pill */}
                <div className="stage-floating-footer">
                  <div className="stage-telemetry-tag">
                    <span className="telemetry-radar-dot" />
                    <span>{current.telemetry}</span>
                  </div>
                </div>
              </div>

              {/* Stage Sub-Metrics Grid */}
              <div className="stage-metrics-row">
                {current.metrics.map((m) => (
                  <div key={m.label} className="stage-metric-box">
                    <span className="metric-label">{m.label}</span>
                    <span className="metric-value">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Stage Footer with Key Deliverable & Step Dots */}
              <div className="stage-footer">
                <div className="stage-deliverable">
                  <svg className="check-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="deliverable-text">{current.deliverable}</span>
                </div>

                {/* Step indicator pagination dots */}
                <div className="stage-dots" aria-hidden="true">
                  {STEPS_DATA.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveStep(dotIdx)}
                      aria-label={`Jump to stage ${dotIdx + 1}`}
                      className={`stage-dot ${dotIdx === activeStep ? "dot-active" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance Banner */}
        <Reveal delay={200} className="process-reassurance-banner">
          <div className="reassurance-left">
            <div className="reassurance-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="shield-spark-icon">
                <path
                  d="M12 2L4 5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="reassurance-text">
              <h4 className="reassurance-title">Need a custom bespoke build instead?</h4>
              <p className="reassurance-sub">
                We also craft completely unique 3D websites from scratch, tailored shaders, and interactive WebGL worlds.
              </p>
            </div>
          </div>
          <a href="#contact" className="reassurance-cta-btn">
            <span>Commission a Custom Build</span>
            <svg viewBox="0 0 16 16" fill="none" className="btn-arrow" aria-hidden="true">
              <path
                d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
