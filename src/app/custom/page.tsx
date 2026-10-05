import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CubeVisual } from "@/components/visuals/SceneHosts";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SelectedWork } from "@/components/SelectedWork";
import { FinalCTA } from "@/components/FinalCTA";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Bespoke 3D Website Design & Custom Creative Coding | Website Club",
  description:
    "100% custom-built 3D digital flagships. Tailored GLSL shaders, custom WebGL physics, and high-performance interactive architectures.",
};

const BESPOKE_CAPABILITIES = [
  {
    num: "01",
    tag: "ARCHITECTURE",
    title: "Zero-Template Architecture",
    desc: "100% custom Three.js and WebGL codebase built from scratch. No shared components, no templates from other clients.",
    highlight: "100% Original Code",
  },
  {
    num: "02",
    tag: "SHADER PHYSICS",
    title: "Tailored GLSL Shaders",
    desc: "Bespoke vertex and fragment shaders crafted for your specific visual physics: caustics, refraction, particles, and kinetic typography.",
    highlight: "Custom GLSL Engine",
  },
  {
    num: "03",
    tag: "SPATIAL ASSETS",
    title: "Full-Pipeline 3D Modeling",
    desc: "From industrial CAD file optimization to high-fidelity organic models, texture baking, and cinematic studio lighting choreography.",
    highlight: "92% Draco Compression",
  },
  {
    num: "04",
    tag: "STABILITY & FRAMERATE",
    title: "60 FPS GPU Guaranteed",
    desc: "Rigorous performance profiling ensuring butter-smooth 60 FPS interactions across desktop, tablet, and mobile GPUs.",
    highlight: "Locked 60 FPS",
  },
];

export default function CustomPage() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />

      <main id="main">
        {/* Bespoke Custom 3D Hero Section */}
        <section className="section hero" aria-labelledby="custom-hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="hero-badge">
                <span className="badge-dot" />
                BESPOKE 3D WEB ENGINEERING
              </span>

              <RevealText
                id="custom-hero-title"
                text="Architectural 3D Web Systems. Built from ground zero."
                as="h1"
                className="display hero-title"
              />

              <Reveal delay={120}>
                <p className="lead hero-lead">
                  We engineer completely original 3D digital flagships for visionary brands.
                  From tailored GLSL shaders to interactive hardware explodes and real-time physics — designed to make your product unforgettable.
                </p>
              </Reveal>

              <Reveal delay={200} className="row hero-actions">
                <a href="#contact" className="btn btn-primary">
                  <span>Commission a Custom Build</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#work" className="btn btn-ghost">
                  <span>View Case Studies</span>
                </a>
              </Reveal>

              <Reveal delay={260} className="hero-stats">
                <div className="stat">
                  <span className="stat-n">3-4 Wks</span>
                  <span className="stat-l">Avg. Sprint Time</span>
                </div>
                <div className="stat">
                  <span className="stat-n">60 FPS</span>
                  <span className="stat-l">Mobile Locked</span>
                </div>
                <div className="stat">
                  <span className="stat-n">100%</span>
                  <span className="stat-l">Bespoke IP</span>
                </div>
              </Reveal>
            </div>

            {/* The 3D Interactive Isometric Cube Hero Visual */}
            <div className="hero-stage-col">
              <CubeVisual />
            </div>
          </div>
        </section>

        {/* Bespoke Capabilities Grid */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="service-paths-header" style={{ marginBottom: "40px" }}>
              <div>
                <span className="service-paths-kicker">ENGINEERING SPECIFICATIONS</span>
                <h2 className="h2" style={{ marginTop: "8px" }}>The Custom Studio Standard</h2>
              </div>
              <p className="lead" style={{ maxWidth: "540px" }}>
                Every custom commission goes through rigorous hardware-accelerated profiling to deliver an Awwwards-caliber experience.
              </p>
            </div>

            <div className="perf-bento-grid">
              {BESPOKE_CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.num} delay={i * 80} className="perf-bento-card" style={{ padding: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span className="perf-bento-tag">{cap.tag}</span>
                    <span className="perf-bento-num">{cap.num}</span>
                  </div>
                  <h3 className="perf-bento-title" style={{ fontSize: "1.3rem", marginBottom: "10px" }}>{cap.title}</h3>
                  <p className="perf-bento-desc" style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>{cap.desc}</p>
                  <div className="perf-bento-footer">
                    <span className="perf-bento-pill">
                      <span className="perf-bento-pill-dot" />
                      {cap.highlight}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Work Portfolio Case Studies */}
        <SelectedWork />

        {/* Final CTA & Contact Inquiry Form */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
