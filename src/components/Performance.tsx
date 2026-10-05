"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, RevealText } from "./ui/Reveal";

interface MetricData {
  fcp: string;
  fcpLabel: string;
  fcpStatus: string;
  fps: string;
  fpsLabel: string;
  fpsStatus: string;
  weight: string;
  weightLabel: string;
  weightStatus: string;
  score: string;
  scoreLabel: string;
  scoreStatus: string;
}

interface WaterfallStage {
  label: string;
  duration: string;
  start: string;
  width: string;
  tag: string;
  isPrimary?: boolean;
}

const MODES: Record<"optimized" | "legacy", {
  title: string;
  subtitle: string;
  statusBadge: string;
  metrics: MetricData;
  waterfall: WaterfallStage[];
  summaryNote: string;
}> = {
  optimized: {
    title: "Website Club Dual-Threaded Pipeline",
    subtitle: "Real HTML paints in 0.4s. Heavy WebGL shaders stream asynchronously in Web Workers.",
    statusBadge: "✓ 99.9% Core Web Vitals Pass",
    metrics: {
      fcp: "0.4s",
      fcpLabel: "First Contentful Paint",
      fcpStatus: "⚡ Sub-second paint",
      fps: "60 FPS",
      fpsLabel: "Framerate Stability",
      fpsStatus: "Locked · 0 dropped frames",
      weight: "1.2 MB",
      weightLabel: "Draco Asset Payload",
      weightStatus: "92% geometry reduction",
      score: "99 / 100",
      scoreLabel: "Mobile Lighthouse",
      scoreStatus: "Green · Top 1% Web Vitals",
    },
    waterfall: [
      { label: "HTML & Core Copy", duration: "120ms", start: "0%", width: "18%", tag: "Instant Readable Paint", isPrimary: true },
      { label: "CSS & WebP Imagery", duration: "160ms", start: "14%", width: "24%", tag: "Layout Locked" },
      { label: "Web Worker Draco Decoders", duration: "240ms", start: "34%", width: "32%", tag: "Off-Main-Thread", isPrimary: true },
      { label: "WebGL Shaders & 3D Stage", duration: "280ms", start: "62%", width: "38%", tag: "Silent GPU Hydration" },
    ],
    summaryNote: "Users read headlines and engage with CTAs instantly while 3D geometry hydrates quietly in the background without causing layout shifts.",
  },
  legacy: {
    title: "Traditional Single-Threaded 3D Agency Stack",
    subtitle: "Monolithic bundle blocks the main thread. Visitors wait behind a blank loading spinner.",
    statusBadge: "⚠️ Severe Conversion Penalty",
    metrics: {
      fcp: "4.8s",
      fcpLabel: "First Contentful Paint",
      fcpStatus: "⚠️ 62% bounce risk",
      fps: "18-24 FPS",
      fpsLabel: "Framerate Stability",
      fpsStatus: "Thermal throttling & stutter",
      weight: "28.4 MB",
      weightLabel: "Raw GLTF Bundle Payload",
      weightStatus: "Heavy uncompressed textures",
      score: "31 / 100",
      scoreLabel: "Mobile Lighthouse",
      scoreStatus: "Failing Core Web Vitals",
    },
    waterfall: [
      { label: "Blocking Splash Loader", duration: "2400ms", start: "0%", width: "65%", tag: "User Staring at Spinner" },
      { label: "Uncompressed 3D Asset Download", duration: "1800ms", start: "40%", width: "45%", tag: "Network Bottleneck" },
      { label: "Main Thread JS Parsing", duration: "1200ms", start: "70%", width: "30%", tag: "Browser UI Frozen" },
      { label: "Late Page Content Paint", duration: "600ms", start: "88%", width: "12%", tag: "High Abandonment" },
    ],
    summaryNote: "Uncompressed GLTF meshes and unmanaged shader loops freeze the browser UI thread, leading to dropped frames, battery drain, and lost customers.",
  },
};

interface TechnicalPillar {
  num: string;
  category: "engine" | "network";
  tag: string;
  title: string;
  desc: string;
  pill: string;
  metric: string;
  image: string;
  imageAlt: string;
}

const TECHNICAL_PILLARS: TechnicalPillar[] = [
  {
    num: "01",
    category: "engine",
    tag: "THREADING & EXECUTION",
    title: "Off-Main-Thread Web Workers",
    desc: "Decouples 3D parsing into background workers, keeping the UI thread 100% idle for smooth 120Hz scrolling.",
    pill: "Zero Thread Blocking",
    metric: "120Hz UI Thread",
    image: "/perf_worker_3d.jpg",
    imageAlt: "Dual-threaded parallel computing processor render",
  },
  {
    num: "02",
    category: "engine",
    tag: "ALGORITHMIC COMPRESSION",
    title: "Draco Mesh & KTX2 Textures",
    desc: "Shrinks raw 3D geometry payloads by 92%, streaming lightweight textures directly into GPU memory.",
    pill: "92% Bandwidth Saved",
    metric: "92% Mesh Reduction",
    image: "/perf_draco_3d.jpg",
    imageAlt: "Polygonal mesh compression into smooth crystal 3D render",
  },
  {
    num: "03",
    category: "engine",
    tag: "MOBILE INTELLIGENCE",
    title: "Adaptive GPU Tiering",
    desc: "Benchmarks device GPU in real-time, dynamically tuning shader samples for cool, lag-free mobile rendering.",
    pill: "Dynamic LOD Scaling",
    metric: "Locked 60 FPS Mobile",
    image: "/perf_mobile_3d.jpg",
    imageAlt: "Titanium mobile phone displaying 60 FPS WebGL world render",
  },
  {
    num: "04",
    category: "network",
    tag: "INFRASTRUCTURE",
    title: "Global Edge CDN & HTTP/3",
    desc: "Replicates 3D models across 300+ Cloudflare edge POPs with 0-RTT multiplexing for sub-second roundtrips.",
    pill: "300+ Edge POPs",
    metric: "< 18ms Latency",
    image: "/perf_edge_3d.jpg",
    imageAlt: "Global edge CDN infrastructure globe render",
  },
  {
    num: "05",
    category: "network",
    tag: "SEO & ACCESSIBILITY",
    title: "100% Real HTML & Crawlability",
    desc: "All copy, metadata, and buttons live in semantic HTML5 markup. Googlebot indexes all content seamlessly.",
    pill: "100% Googlebot Readable",
    metric: "Zero Canvas Trap",
    image: "/perf_seo_3d.jpg",
    imageAlt: "Layered HTML5 code prism with SEO structured data render",
  },
  {
    num: "06",
    category: "network",
    tag: "STABILITY & MEMORY",
    title: "Automated WebGL Garbage Collection",
    desc: "Rigorous buffer disposal and texture unbinding during scene changes eliminate memory leaks and crashes.",
    pill: "Zero Memory Leaks",
    metric: "Zero Memory Leak",
    image: "/perf_memory_3d.jpg",
    imageAlt: "Automated WebGL memory cleanup and recycling reactor render",
  },
];

export function Performance() {
  const [activeMode, setActiveMode] = useState<"optimized" | "legacy">("optimized");
  const [filterCategory, setFilterCategory] = useState<"all" | "engine" | "network">("all");
  const modeData = MODES[activeMode];

  const filteredPillars = TECHNICAL_PILLARS.filter(
    (p) => filterCategory === "all" || p.category === filterCategory
  );

  return (
    <section id="performance" className="section perf-section" aria-labelledby="perf-title">
      <div className="wrap">
        {/* Header */}
        <div className="perf-header">
          <div className="perf-header-main">
            <span className="perf-eyebrow">
              <span className="perf-eyebrow-dot" />
              ENGINEERING &amp; PERFORMANCE ARCHITECTURE
            </span>
            <RevealText
              id="perf-title"
              text="3D and speed aren't a trade-off."
              className="h2 perf-headline"
            />
          </div>
          <Reveal delay={120}>
            <p className="perf-lead">
              Heavy 3D traditionally kills conversion. We engineered a dual-threaded rendering architecture
              that paints real HTML in 0.4s while WebGL shaders stream seamlessly in the background.
            </p>
          </Reveal>
        </div>

        {/* Interactive Architecture Console */}
        <Reveal delay={180} className="perf-console">
          {/* Console Top Toolbar */}
          <div className="perf-console-toolbar">
            <div className="perf-toolbar-left">
              <span className="perf-console-status">
                <span className={`perf-status-pulse ${activeMode === "optimized" ? "is-green" : "is-amber"}`} />
                {modeData.statusBadge}
              </span>
              <span className="perf-console-modelabel">Interactive Benchmark Inspector</span>
            </div>

            {/* Architecture Mode Switcher */}
            <div className="perf-mode-switcher" role="tablist" aria-label="Architecture Comparison Mode">
              <button
                type="button"
                role="tab"
                aria-selected={activeMode === "optimized"}
                onClick={() => setActiveMode("optimized")}
                className={`perf-mode-btn ${activeMode === "optimized" ? "is-active" : ""}`}
              >
                <span className="perf-mode-icon">⚡</span>
                Website Club Engine
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeMode === "legacy"}
                onClick={() => setActiveMode("legacy")}
                className={`perf-mode-btn ${activeMode === "legacy" ? "is-active" : ""}`}
              >
                <span className="perf-mode-icon">⚠️</span>
                Legacy 3D Stack
              </button>
            </div>
          </div>

          {/* Console Body Grid */}
          <div className="perf-console-body">
            {/* Left Column: Key Diagnostics Cards */}
            <div className="perf-metrics-col">
              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">{modeData.metrics.fcpLabel}</span>
                  <span className="perf-metric-status">{modeData.metrics.fcpStatus}</span>
                </div>
                <div className="perf-metric-value">{modeData.metrics.fcp}</div>
                <div className="perf-metric-bar-bg">
                  <div
                    className={`perf-metric-bar-fill ${activeMode === "optimized" ? "is-green-fill" : "is-red-fill"}`}
                    style={{ width: activeMode === "optimized" ? "20%" : "95%" }}
                  />
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">{modeData.metrics.fpsLabel}</span>
                  <span className="perf-metric-status">{modeData.metrics.fpsStatus}</span>
                </div>
                <div className="perf-metric-value">{modeData.metrics.fps}</div>
                <div className="perf-metric-bar-bg">
                  <div
                    className={`perf-metric-bar-fill ${activeMode === "optimized" ? "is-blue-fill" : "is-amber-fill"}`}
                    style={{ width: activeMode === "optimized" ? "100%" : "35%" }}
                  />
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">{modeData.metrics.weightLabel}</span>
                  <span className="perf-metric-status">{modeData.metrics.weightStatus}</span>
                </div>
                <div className="perf-metric-value">{modeData.metrics.weight}</div>
                <div className="perf-metric-bar-bg">
                  <div
                    className={`perf-metric-bar-fill ${activeMode === "optimized" ? "is-green-fill" : "is-red-fill"}`}
                    style={{ width: activeMode === "optimized" ? "15%" : "90%" }}
                  />
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">{modeData.metrics.scoreLabel}</span>
                  <span className="perf-metric-status">{modeData.metrics.scoreStatus}</span>
                </div>
                <div className="perf-metric-value">{modeData.metrics.score}</div>
                <div className="perf-metric-bar-bg">
                  <div
                    className={`perf-metric-bar-fill ${activeMode === "optimized" ? "is-green-fill" : "is-red-fill"}`}
                    style={{ width: activeMode === "optimized" ? "99%" : "31%" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Execution Timeline Waterfall */}
            <div className="perf-waterfall-col">
              <div className="perf-waterfall-header">
                <div>
                  <h4 className="perf-waterfall-title">{modeData.title}</h4>
                  <p className="perf-waterfall-sub">{modeData.subtitle}</p>
                </div>
                <span className="perf-waterfall-badge">Timeline Telemetry</span>
              </div>

              {/* Waterfall Tracks */}
              <div className="perf-waterfall-tracks">
                <div className="perf-waterfall-scale">
                  <span>0ms</span>
                  <span>500ms</span>
                  <span>1000ms</span>
                  <span>1500ms</span>
                  <span>2000ms+</span>
                </div>

                <div className="perf-tracks-list">
                  {modeData.waterfall.map((stage, idx) => (
                    <div key={idx} className="perf-track-row">
                      <div className="perf-track-info">
                        <span className="perf-track-dot" />
                        <div className="perf-track-meta">
                          <span className="perf-track-name">{stage.label}</span>
                          <span className="perf-track-duration">{stage.duration}</span>
                        </div>
                      </div>
                      <div className="perf-track-bar-container">
                        <div
                          className={`perf-track-bar ${stage.isPrimary ? "is-accent" : ""} ${activeMode === "legacy" ? "is-legacy-bar" : ""}`}
                          style={{
                            marginLeft: stage.start,
                            width: stage.width,
                          }}
                        >
                          <span className="perf-track-tag">{stage.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Bottom Bar */}
              <div className="perf-waterfall-footer">
                <div className="perf-footer-note">
                  <span className="perf-note-icon">💡</span>
                  <span>{modeData.summaryNote}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 6 Technical Pillars Bento Grid with High-Res 3D Visuals & Transitions */}
        <div className="perf-pillars-container">
          <div className="perf-pillars-header">
            <div>
              <span className="perf-pillars-eyebrow">PRECISION ENGINEERING</span>
              <h3 className="perf-pillars-title">The Six Pillars of High-Velocity 3D</h3>
              <p className="perf-pillars-desc">
                Minimal overhead, maximum visual impact. Every layer is profiled to run effortlessly on any browser.
              </p>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="perf-filter-nav" role="tablist" aria-label="Filter Technical Pillars">
              <button
                type="button"
                role="tab"
                aria-selected={filterCategory === "all"}
                onClick={() => setFilterCategory("all")}
                className={`perf-filter-btn ${filterCategory === "all" ? "is-active" : ""}`}
              >
                All Innovations ({TECHNICAL_PILLARS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterCategory === "engine"}
                onClick={() => setFilterCategory("engine")}
                className={`perf-filter-btn ${filterCategory === "engine" ? "is-active" : ""}`}
              >
                Core Engine (3)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterCategory === "network"}
                onClick={() => setFilterCategory("network")}
                className={`perf-filter-btn ${filterCategory === "network" ? "is-active" : ""}`}
              >
                Network &amp; Stability (3)
              </button>
            </div>
          </div>

          <div className="perf-bento-grid">
            {filteredPillars.map((pillar, i) => (
              <div
                key={pillar.num}
                className="perf-bento-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Visual 3D Showcase Banner */}
                <div className="perf-card-visual">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="perf-card-img"
                  />
                  <div className="perf-card-visual-scrim" aria-hidden="true" />
                  
                  {/* Floating Number & Metric Badges */}
                  <div className="perf-card-visual-top">
                    <span className="perf-bento-num">{pillar.num}</span>
                    <span className="perf-card-metric-badge">{pillar.metric}</span>
                  </div>
                </div>

                {/* Card Content Body - Minimal & Punchy */}
                <div className="perf-card-body">
                  <span className="perf-bento-tag">{pillar.tag}</span>
                  <h4 className="perf-bento-title">{pillar.title}</h4>
                  <p className="perf-bento-desc">{pillar.desc}</p>

                  <div className="perf-bento-footer">
                    <span className="perf-bento-pill">
                      <span className="perf-bento-pill-dot" />
                      {pillar.pill}
                    </span>
                    <span className="perf-card-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance & Guarantee Strip */}
        <Reveal delay={200} className="perf-guarantee-strip">
          <div className="perf-guarantee-left">
            <div className="perf-guarantee-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <h4 className="perf-guarantee-title">Guaranteed 60 FPS Performance on All Modern Devices</h4>
              <p className="perf-guarantee-subtitle">
                Every release is profiled against Chrome DevTools CPU throttling, WebPageTest 4G profiles, and real iPhone/Android hardware before going live.
              </p>
            </div>
          </div>
          <div className="perf-guarantee-right">
            <a href="#contact" className="btn btn-primary btn-sm">
              <span>Audit Your Current Site</span>
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
