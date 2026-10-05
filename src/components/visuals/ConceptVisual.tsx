import type { WorkVisual } from "@/lib/content";
import { Dimensional } from "./Dimensional";

/** Rich CSS-3D concept visuals — one unique design per project theme. */
export function ConceptVisual({ kind }: { kind: WorkVisual }) {
  /* ── Halo: Audio hardware — headphone cross-section + sound rings ── */
  if (kind === "ring") return (
    <div className="cv cv-ring" aria-hidden="true">
      <div className="cv-ring-scene">
        {/* Outer ear cup */}
        <div className="cv-ring-cup" />
        {/* Driver rings — 4 concentric halos */}
        <div className="cv-ring-driver">
          <i /><i /><i /><i />
        </div>
        {/* Centre dome */}
        <div className="cv-ring-dome" />
        {/* Sound wave arcs */}
        <div className="cv-ring-waves">
          <span /><span /><span /><span />
        </div>
        {/* Frequency bar graph */}
        <div className="cv-ring-freq">
          {[40, 65, 85, 55, 90, 70, 45, 75, 60, 80, 50, 68].map((h, i) => (
            <b key={i} style={{ "--h": h, "--n": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Meridian: Architecture — exploded floor-plan layers ── */
  if (kind === "shift") return (
    <div className="cv cv-shift" aria-hidden="true">
      <div className="cv-arch-rig">
        {/* Ground plane grid */}
        <div className="cv-arch-ground" />
        {/* Floor slabs stacking up */}
        {[0, 1, 2, 3].map(n => (
          <div key={n} className="cv-arch-floor" style={{ "--n": n } as React.CSSProperties}>
            <div className="cv-arch-walls" />
            <div className="cv-arch-win" />
            <div className="cv-arch-win cv-arch-win2" />
          </div>
        ))}
        {/* Roof accent */}
        <div className="cv-arch-roof" />
        {/* Elevation markers */}
        <div className="cv-arch-markers">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );

  /* ── Strata: Geospatial — layered terrain contours ── */
  if (kind === "contour") return (
    <div className="cv cv-contour" aria-hidden="true">
      <div className="cv-terrain-rig">
        {/* Contour layers */}
        {Array.from({ length: 7 }).map((_, n) => (
          <i key={n} style={{ "--n": n } as React.CSSProperties} />
        ))}
        {/* Summit orb */}
        <b />
        {/* Data pins */}
        <div className="cv-terrain-pins">
          <span style={{ "--px": 30, "--py": 40 } as React.CSSProperties} />
          <span style={{ "--px": 55, "--py": 25 } as React.CSSProperties} />
          <span style={{ "--px": 68, "--py": 60 } as React.CSSProperties} />
        </div>
        {/* Grid overlay */}
        <div className="cv-terrain-grid" />
      </div>
    </div>
  );

  /* ── Assembly: Furniture — isometric grid of assembling blocks ── */
  if (kind === "blocks") return (
    <div className="cv cv-blocks" aria-hidden="true">
      <div className="cv-asm-scene">
        {/* Isometric base grid */}
        <div className="cv-asm-base" />
        {/* Block grid 3×3 */}
        {Array.from({ length: 9 }).map((_, n) => (
          <div key={n} className="cv-asm-block" style={{ "--n": n } as React.CSSProperties}>
            <div className="cv-asm-top" />
            <div className="cv-asm-front" />
            <div className="cv-asm-side" />
          </div>
        ))}
        {/* Accent highlight block */}
        <div className="cv-asm-accent" />
      </div>
    </div>
  );

  /* Fallback */
  return <div className="cv" aria-hidden="true"><Dimensional /></div>;
}

