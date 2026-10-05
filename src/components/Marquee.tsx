"use client";

import { useState } from "react";

const PRIMARY_ITEMS = [
  { text: "WEBSITES SHOULDN'T FEEL FLAT", badge: "01 MANIFESTO", highlight: true },
  { text: "IMMERSIVE 3D EXPERIENCES", badge: "WEBGL 2.0", highlight: false },
  { text: "RENT IT · BUILD IT · TRANSFORM IT", badge: "STUDIO SUITE", highlight: true },
  { text: "CRAFTED FOR PEAK ATTENTION", badge: "60 FPS", highlight: false },
  { text: "SPATIAL WEB ARCHITECTURE", badge: "NEXT-GEN", highlight: true },
  { text: "ZERO-SLOP INTERACTIVE DESIGN", badge: "ORIGINALS", highlight: false },
];

const SECONDARY_ITEMS = [
  "THREE.JS",
  "REACT THREE FIBER",
  "GSAP SCROLLTRIGGER",
  "REAL-TIME SHADERS",
  "DRACO COMPRESSION",
  "MOBILE FLUID VIEWPORTS",
  "HIGH-PERFORMANCE WEBGL",
  "DYNAMIC MICRO-INTERACTIONS",
  "PHYSICS-BASED MOTION",
  "CUSTOM 3D MODELING",
];

export function Marquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`marquee-section ${isHovered ? "is-paused" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Studio Capabilities and Manifesto"
    >
      {/* Top Meta Status Strip */}
      <div className="marquee-meta-bar">
        <div className="marquee-meta-pill">
          <span className="marquee-live-dot" />
          <span>ACTIVE STUDIO REEL</span>
        </div>
        <div className="marquee-meta-center">
          <span>HIGH-CRAFT 3D &amp; INTERACTIVE WEB STUDIO</span>
        </div>
        <div className="marquee-meta-right">
          <span>HOVER TO INSPECT</span>
        </div>
      </div>

      {/* Main Kinetic Ribbon (Fast & Bold) */}
      <div className="marquee-strip primary-strip">
        <div className="marquee-track primary-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="marquee-group" aria-hidden={dup === 1}>
              {PRIMARY_ITEMS.map((item, idx) => (
                <div key={idx} className={`marquee-item ${item.highlight ? "highlight" : ""}`}>
                  <span className="marquee-star">✦</span>
                  <span className="marquee-text">{item.text}</span>
                  <span className="marquee-badge">{item.badge}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Reverse Technical Strip (Subtle & Elegant) */}
      <div className="marquee-strip secondary-strip">
        <div className="marquee-track secondary-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="marquee-group" aria-hidden={dup === 1}>
              {SECONDARY_ITEMS.map((tech, idx) => (
                <div key={idx} className="marquee-tech-item">
                  <span className="marquee-tech-icon">+</span>
                  <span className="marquee-tech-text">{tech}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Gradient Glow Accents */}
      <div className="marquee-gradient-fade left" aria-hidden="true" />
      <div className="marquee-gradient-fade right" aria-hidden="true" />
    </section>
  );
}
