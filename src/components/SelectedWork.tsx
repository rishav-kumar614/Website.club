"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, RevealText } from "./ui/Reveal";

interface ProjectDetail {
  id: string;
  name: string;
  category: "hardware" | "spatial" | "data";
  industry: string;
  type: string;
  label: string;
  tagline: string;
  body: string;
  image: string;
  specs: string[];
  metrics: {
    dwellTime: string;
    fps: string;
    payload: string;
  };
  challenge: string;
  solution: string;
}

const PROJECTS: ProjectDetail[] = [
  {
    id: "halo",
    name: "Halo",
    category: "hardware",
    industry: "Audio Hardware",
    type: "Custom Build",
    label: "Concept Flagship",
    tagline: "Disassemble the headphones. Hear each driver.",
    body: "A luxury product launch site where the physical headphones are the interface itself. Visitors scroll to explode the ear cups into floating acoustic drivers, hover to isolate individual beryllium diaphragm frequencies, and configure custom anodized finishes in real-time WebGL.",
    image: "/portfolio_halo_3d.jpg",
    specs: ["Scroll Disassembly", "Web Audio API", "Draco Mesh Optimization", "PBR Anodized Shaders"],
    metrics: {
      dwellTime: "+410%",
      fps: "60 FPS Locked",
      payload: "1.1 MB",
    },
    challenge: "High-end audiophiles want to see the internal driver engineering and acoustic chamber physics before pre-ordering a $900 hardware product.",
    solution: "We engineered an exploded scroll choreography with real-time soundwave shader rings, letting users inspect every millimeter of internal hardware without leaving the page.",
  },
  {
    id: "meridian",
    name: "Meridian",
    category: "spatial",
    industry: "Architecture & Real Estate",
    type: "3D Transformation",
    label: "Spatial Experience",
    tagline: "Walkable scale models from flat floor plans.",
    body: "A flat architectural portfolio transformed into an interactive architectural diorama. 2D blueprint schematics lift off the ground plane into volumetric concrete and glass slabs as the visitor travels through room perspectives with dynamic sunlight simulation.",
    image: "/portfolio_meridian_3d.jpg",
    specs: ["BIM to WebGL Pipeline", "Volumetric Glass Slabs", "Dynamic Solar Angle", "Sub-second Paint"],
    metrics: {
      dwellTime: "+290%",
      fps: "60 FPS Locked",
      payload: "1.4 MB",
    },
    challenge: "Traditional 2D architectural PDFs and flat photography fail to communicate the spatial volume, daylighting, and proportion of luxury development projects.",
    solution: "Transformed flat CAD blueprints into a lightweight, navigable 3D pavilion model with layered elevation slices and real-time natural light transitions.",
  },
  {
    id: "strata",
    name: "Strata",
    category: "data",
    industry: "Geospatial & Climate Data",
    type: "Website Club Original",
    label: "Studio Original",
    tagline: "Topographical terrain rendered in depth contours.",
    body: "An exploratory climate GIS visualizer where planetary elevation data is sliced into luminous neon topographic contours. Users can scrub depth levels, hover over elevation peaks, and inspect environmental metrics mapped directly onto spatial geometry.",
    image: "/portfolio_strata_3d.jpg",
    specs: ["GLSL Topo Shaders", "Point Cloud Elevation", "Interactive Depth Slicing", "Zero Main-Thread Lag"],
    metrics: {
      dwellTime: "+360%",
      fps: "60 FPS Locked",
      payload: "1.2 MB",
    },
    challenge: "Complex geospatial datasets overwhelm users when presented as dense numbers and 2D heatmaps.",
    solution: "Created an interactive 3D holographic command-table interface where topography is rendered through WebGL shader contour slices that reveal data intuitively by altitude.",
  },
  {
    id: "assembly",
    name: "Assembly",
    category: "hardware",
    industry: "Luxury Furniture / Retail",
    type: "Custom Build",
    label: "Configurator Concept",
    tagline: "Part-by-part self-assembling modern lounge chair.",
    body: "An ultra-tactile luxury furniture configurator where a mid-century bentwood armchair self-assembles part-by-part in mid-air. Prospective buyers can rotate every brass fastener, swap textured wool upholstery, and inspect real-world ergonomics at 60 FPS.",
    image: "/portfolio_assembly_3d.jpg",
    specs: ["Exploded Parts Engine", "Photoreal Fabric PBR", "Bentwood Grain Shaders", "Mobile Touch Controls"],
    metrics: {
      dwellTime: "+320%",
      fps: "60 FPS Locked",
      payload: "1.3 MB",
    },
    challenge: "Flat e-commerce product photos deliver low buyer confidence for high-ticket designer furniture, leading to high cart abandonment.",
    solution: "A zero-latency 3D assembly configurator that showcases craftsmanship joinery, genuine material textures, and hardware fittings under studio lighting.",
  },
];

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<"all" | "hardware" | "spatial" | "data">("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetail | null>(null);

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="section sw-section" aria-labelledby="work-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="sw-header">
          <div className="sw-header-left">
            <span className="sw-eyebrow">
              <span className="sw-eyebrow-dot" />
              STUDIO PORTFOLIO & PROOF
            </span>
            <RevealText id="work-title" text="Selected 3D Experiences" className="h2 sw-h2" />
          </div>

          <div className="sw-header-right">
            <Reveal delay={120}>
              <p className="sw-lead">
                Original 3D spatial flagships, custom WebGL hardware launches, and interactive concept experiences
                engineered to push the boundaries of modern digital craft.
              </p>
            </Reveal>

            {/* Filter Pills */}
            <div className="sw-filter-tabs" role="tablist" aria-label="Portfolio category filter">
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
                className={`sw-filter-btn ${activeFilter === "all" ? "is-active" : ""}`}
              >
                All Works ({PROJECTS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === "hardware"}
                onClick={() => setActiveFilter("hardware")}
                className={`sw-filter-btn ${activeFilter === "hardware" ? "is-active" : ""}`}
              >
                Hardware & Retail
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === "spatial"}
                onClick={() => setActiveFilter("spatial")}
                className={`sw-filter-btn ${activeFilter === "spatial" ? "is-active" : ""}`}
              >
                Spatial & Architecture
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === "data"}
                onClick={() => setActiveFilter("data")}
                className={`sw-filter-btn ${activeFilter === "data" ? "is-active" : ""}`}
              >
                Data & Shaders
              </button>
            </div>
          </div>
        </div>

        {/* Project Grid / Showcase List */}
        <div className="sw-grid">
          {filteredProjects.map((project, index) => (
            <Reveal
              as="article"
              key={project.id}
              delay={index * 100}
              className="sw-card"
            >
              {/* Visual Showcase Stage */}
              <div
                className="sw-media-stage"
                onClick={() => setActiveModalProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveModalProject(project)}
                aria-label={`Inspect ${project.name} experience`}
              >
                <div className="sw-image-container">
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.industry} 3D Experience`}
                    width={960}
                    height={540}
                    className="sw-image"
                    priority={index < 2}
                  />
                  <div className="sw-media-overlay" />
                </div>

                {/* Top Badges */}
                <div className="sw-stage-badges">
                  <span className="sw-badge-label">{project.label}</span>
                  <span className="sw-badge-industry">{project.industry}</span>
                </div>

                {/* Hover Action Badge */}
                <div className="sw-stage-action">
                  <span className="sw-action-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Inspect Case Details
                  </span>
                </div>

                {/* Bottom Quick Telemetry */}
                <div className="sw-stage-telemetry">
                  <span className="sw-telemetry-item">
                    <strong>{project.metrics.dwellTime}</strong> Dwell Time
                  </span>
                  <span className="sw-telemetry-separator">/</span>
                  <span className="sw-telemetry-item">
                    <strong>{project.metrics.fps}</strong>
                  </span>
                  <span className="sw-telemetry-separator">/</span>
                  <span className="sw-telemetry-item">
                    <strong>{project.metrics.payload}</strong> Draco
                  </span>
                </div>
              </div>

              {/* Text & Specs Content */}
              <div className="sw-card-body">
                <div className="sw-card-header-row">
                  <div>
                    <span className="sw-index">0{index + 1}</span>
                    <h3 className="sw-project-name">{project.name}</h3>
                  </div>
                  <span className="sw-type-pill">{project.type}</span>
                </div>

                <p className="sw-tagline">&ldquo;{project.tagline}&rdquo;</p>
                <p className="sw-description">{project.body}</p>

                {/* Specs Tags */}
                <div className="sw-specs-list" aria-label="Technical disciplines">
                  {project.specs.map((spec) => (
                    <span key={spec} className="sw-spec-tag">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="sw-card-foot">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="sw-inspect-btn"
                  >
                    <span>View Case Study</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <a href="#contact" className="sw-request-similar">
                    Request similar build →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Studio Banner */}
        <Reveal delay={200} className="sw-banner">
          <div className="sw-banner-left">
            <span className="sw-banner-badge">PROPRIETARY 3D PIPELINE</span>
            <h4 className="sw-banner-title">Have a product or architectural concept in mind?</h4>
            <p className="sw-banner-subtitle">
              We design custom 3D web flagships from CAD files, 3D scans, Blender assets, or raw creative sketches.
            </p>
          </div>
          <div className="sw-banner-right">
            <a href="#contact" className="btn btn-primary btn-sm">
              <span>Commission a Custom Build</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Interactive Case Study Modal */}
      {activeModalProject && (
        <div
          className="sw-modal-backdrop"
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="sw-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="sw-modal-close"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close project modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Modal Media Preview */}
            <div className="sw-modal-media">
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.name}
                width={1200}
                height={675}
                className="sw-modal-image"
              />
              <div className="sw-modal-media-badge">
                <span>{activeModalProject.type}</span>
                <strong>{activeModalProject.industry}</strong>
              </div>
            </div>

            {/* Modal Body */}
            <div className="sw-modal-body">
              <div className="sw-modal-head">
                <div>
                  <span className="sw-modal-eyebrow">{activeModalProject.label}</span>
                  <h3 id="modal-title" className="sw-modal-title">{activeModalProject.name}</h3>
                </div>
                <div className="sw-modal-stats">
                  <div className="sw-stat-box">
                    <span className="sw-stat-val">{activeModalProject.metrics.dwellTime}</span>
                    <span className="sw-stat-lbl">Dwell Time</span>
                  </div>
                  <div className="sw-stat-box">
                    <span className="sw-stat-val">{activeModalProject.metrics.fps}</span>
                    <span className="sw-stat-lbl">Framerate</span>
                  </div>
                  <div className="sw-stat-box">
                    <span className="sw-stat-val">{activeModalProject.metrics.payload}</span>
                    <span className="sw-stat-lbl">Transfer Weight</span>
                  </div>
                </div>
              </div>

              <p className="sw-modal-lead">{activeModalProject.body}</p>

              {/* Challenge vs Solution */}
              <div className="sw-modal-breakdown">
                <div className="sw-breakdown-card">
                  <span className="sw-breakdown-tag is-challenge">The Creative Challenge</span>
                  <p>{activeModalProject.challenge}</p>
                </div>
                <div className="sw-breakdown-card">
                  <span className="sw-breakdown-tag is-solution">The Spatial 3D Solution</span>
                  <p>{activeModalProject.solution}</p>
                </div>
              </div>

              {/* Technical Architecture Specs */}
              <div className="sw-modal-specs">
                <span className="sw-specs-heading">Architectural & Shader Stack:</span>
                <div className="sw-modal-spec-tags">
                  {activeModalProject.specs.map((s) => (
                    <span key={s} className="sw-modal-tag">{s}</span>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="sw-modal-footer">
                <a
                  href="#contact"
                  onClick={() => setActiveModalProject(null)}
                  className="btn btn-primary btn-sm"
                >
                  <span>Discuss a Project Like {activeModalProject.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
