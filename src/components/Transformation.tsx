"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { Reveal, RevealText } from "./ui/Reveal";
import { ButterflyVisual } from "./visuals/SceneHosts";

const UPGRADE_FEATURES = [
  {
    num: "01",
    title: "Interactive 3D Hero Worlds",
    desc: "Replace flat banners with real-time 3D canvas viewports that react dynamically to pointer physics and camera angles.",
  },
  {
    num: "02",
    title: "Exploded 3D Product Anatomy",
    desc: "Allow customers to deconstruct products into internal components, inspect materials, and rotate 360° in real-time.",
  },
  {
    num: "03",
    title: "Kinetic GSAP Scroll Choreography",
    desc: "Transform static vertical scrolling into a cinematic timeline with pinned stages, camera pans, and scrubbed animations.",
  },
  {
    num: "04",
    title: "Volumetric Shaders & Caustics",
    desc: "Custom GLSL fragment shaders simulating realistic light refraction, water reflections, glass absorption, and particle fields.",
  },
  {
    num: "05",
    title: "Zero Stack Migration",
    desc: "Keep your current CMS, Shopify store, Next.js or WordPress stack intact. We inject 3D layers via modular edge components.",
  },
  {
    num: "06",
    title: "Lighthouse 95+ Performance",
    desc: "Headless GPU lifecycle management and progressive asset streaming ensure blazing-fast load times with zero SEO penalties.",
  },
];

export function Transformation() {
  const [pos, setPos] = useState(50);
  const [demoRef, seen] = useInView<HTMLDivElement>({ margin: "0px 0px -25% 0px" });
  const touched = useRef(false);

  // Discoverability sweep on first view
  useEffect(() => {
    if (!seen || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = (t - t0) / 2600;
      if (touched.current || k >= 1) return;
      setPos(50 + Math.sin(k * Math.PI * 2) * 32 * (1 - k * 0.3));
      raf = requestAnimationFrame(tick);
    };
    const start = setTimeout(() => (raf = requestAnimationFrame(tick)), 500);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [seen]);

  return (
    <section id="transform" className="section transform-section" aria-labelledby="transform-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="transform-header">
          <div className="transform-header-left">
            <span className="transform-kicker">✦ 3D WEB RETROFIT</span>
            <RevealText
              id="transform-title"
              text="Already have a website? Elevate it into the 3rd dimension."
              className="h2 transform-h2"
            />
          </div>
          <Reveal delay={120} className="transform-header-right">
            <p className="lead">
              Zero stack migration. Keep your existing backend, CMS, SEO equity, and custom domain. We upgrade your
              current digital footprint with immersive Three.js WebGL scenes, rotatable 3D product models, and spatial
              motion design.
            </p>
            <div className="transform-badge-pills">
              <span className="transform-pill">✓ No Tech Stack Rebuild</span>
              <span className="transform-pill">✓ Preserves SEO Equity</span>
              <span className="transform-pill">✓ Universal GPU Fallbacks</span>
            </div>
          </Reveal>
        </div>

        {/* Interactive Before / After Comparison Showcase */}
        <Reveal>
          <div className="transform-slider-container">
            {/* Ambient Backlight */}
            <div className="transform-ambient-glow" aria-hidden="true" />

            {/* Browser Viewport Frame */}
            <div className="transform-browser-frame">
              {/* Browser Header Bar */}
              <div className="transform-browser-topbar">
                <div className="transform-window-dots" aria-hidden="true">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="transform-url-chip">
                  <svg className="url-lock" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4.5 7V5.5C4.5 3.567 6.067 2 8 2C9.933 2 11.5 3.567 11.5 5.5V7M3 7H13V14H3V7Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>aethel.audio · Interactive Upgrade Demo</span>
                </div>
                <div className="transform-fps-indicator">
                  <span className="fps-dot" />
                  <span>Interactive Slider</span>
                </div>
              </div>

              {/* Split Interactive Viewport */}
              <div
                ref={demoRef}
                className="ba-viewport"
                style={{ "--pos": `${pos}%` } as CSSProperties}
              >
                {/* Before Layer (Underneath / Left Reveal) */}
                <div className="ba-layer ba-layer-before" aria-hidden="true">
                  <Image
                    src="/transform_before.jpg"
                    alt="Standard flat 2D website interface"
                    fill
                    className="ba-img"
                    priority
                  />
                  <div className="ba-layer-watermark watermark-before">
                    <span>STANDARD 2D WEB</span>
                  </div>
                </div>

                {/* After Layer (Clipped / Right Reveal) */}
                <div className="ba-layer ba-layer-after" aria-hidden="true">
                  <Image
                    src="/transform_after.jpg"
                    alt="Upgraded 3D WebGL spatial website experience"
                    fill
                    className="ba-img"
                    priority
                  />
                  <div className="ba-layer-watermark watermark-after">
                    <span className="watermark-sparkle">✦</span>
                    <span>3D SPATIAL WEBGL · 60 FPS</span>
                  </div>
                </div>

                {/* Draggable Divider Handle Line */}
                <div className="ba-divider-line" aria-hidden="true">
                  <div className="ba-handle-grip">
                    <svg viewBox="0 0 20 20" fill="none" className="grip-arrows" aria-hidden="true">
                      <path
                        d="M6.5 6L2.5 10L6.5 14M13.5 6L17.5 10L13.5 14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Accessible Range Input */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.5}
                  value={pos}
                  onChange={(e) => {
                    touched.current = true;
                    setPos(Number(e.target.value));
                  }}
                  className="ba-slider-input"
                  aria-label="Compare flat 2D website with upgraded 3D spatial experience"
                  aria-valuetext={`${Math.round(pos)}% standard 2D, ${100 - Math.round(pos)}% 3D spatial WebGL`}
                />
              </div>

              {/* Slider Bottom Hint Bar */}
              <div className="ba-bottom-hint">
                <span className="hint-pill">◄ Drag slider to compare flat 2D vs. 3D WebGL ►</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Live 3D Metamorphosis Specimen Showcase: 3D Butterfly */}
        <Reveal delay={120} className="transform-butterfly-showcase">
          <div className="butterfly-showcase-card">
            <div className="butterfly-card-glow" aria-hidden="true" />
            <div className="butterfly-showcase-grid">
              <div className="butterfly-info-pane">
                <div className="butterfly-badge">
                  <span className="badge-pulse" />
                  <span>3D METAMORPHOSIS ENGINE</span>
                </div>
                <h3 className="butterfly-title">
                  From Flat Canvas to Living Spatial Biology
                </h3>
                <p className="butterfly-desc">
                  Every 3D upgrade is custom-engineered with real-time procedural physics. Interact with this living butterfly specimen — rendered with organic dual-pivot wing flutter, iridescent procedural lighting, and live cursor guidance.
                </p>
                <div className="butterfly-specs-row">
                  <div className="bf-spec">
                    <span className="bf-spec-val">60 FPS</span>
                    <span className="bf-spec-lbl">Fluid Flight</span>
                  </div>
                  <div className="bf-spec">
                    <span className="bf-spec-val">Dual Pivot</span>
                    <span className="bf-spec-lbl">Wing Kinetics</span>
                  </div>
                  <div className="bf-spec">
                    <span className="bf-spec-val">WebGL</span>
                    <span className="bf-spec-lbl">Real-time Shaders</span>
                  </div>
                </div>
                <div className="butterfly-interactive-hint">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  <span>Move your mouse across the viewport to guide flight angle</span>
                </div>
              </div>
              <div className="butterfly-viewport-pane">
                <ButterflyVisual />
              </div>
            </div>
          </div>
        </Reveal>

        {/* 6-Item Upgrade Capabilities Grid */}
        <div className="transform-features-grid">
          {UPGRADE_FEATURES.map((feat, fIdx) => (
            <Reveal key={feat.num} delay={100 + fIdx * 50} className="transform-feature-card" spot>
              <div className="feat-top">
                <span className="feat-num">{feat.num}</span>
                <span className="feat-indicator" />
              </div>
              <h4 className="feat-title">{feat.title}</h4>
              <p className="feat-desc">{feat.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Bottom Complimentary Concept Callout */}
        <Reveal delay={250} className="transform-callout-banner">
          <div className="callout-left">
            <div className="callout-sparkle-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="sparkle-icon">
                <path
                  d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="callout-copy">
              <h4 className="callout-title">Curious what your website looks like in 3D?</h4>
              <p className="callout-sub">
                Send us your live URL. Our creative team will audit your brand and send you a complimentary 3D spatial
                concept preview within 48 hours.
              </p>
            </div>
          </div>
          <div className="callout-actions">
            <a href="#contact" className="callout-cta-primary">
              <span>Request Free 3D Concept</span>
              <svg viewBox="0 0 16 16" fill="none" className="cta-arrow" aria-hidden="true">
                <path
                  d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
