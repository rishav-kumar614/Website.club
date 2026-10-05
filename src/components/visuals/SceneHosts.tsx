"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { use3DCapability, useInView } from "@/lib/hooks";
import { EyeFallback } from "./EyeFallback";
import { Tilt } from "./Tilt";

// Heavy scenes are separate chunks, fetched only after idle + capability checks.
const HeroScene = dynamic(() => import("./scenes/HeroScene"), { ssr: false });
const CubeScene = dynamic(() => import("./scenes/CubeScene"), { ssr: false });
const FinalScene = dynamic(() => import("./scenes/FinalScene"), { ssr: false });
const ButterflyScene = dynamic(() => import("./scenes/ButterflyScene"), { ssr: false });
import { CubeFallback } from "./CubeFallback";

/**
 * Hero visual. The CSS-3D fallback renders immediately (so first paint is complete
 * and it is the permanent visual on low-power / reduced-motion devices);
 * the WebGL scene fades in over it once it has initialised.
 */
export function HeroVisual() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "80px" });
  const [ready, setReady] = useState(false);

  return (
    <div ref={ref} className="hero-visual">
      <div className={`hero-fallback ${ready ? "off" : ""}`}>
        <Tilt max={8}>
          <EyeFallback />
        </Tilt>
      </div>
      {cap.enabled && (
        <div className={`canvas-wrap ${ready ? "on" : ""}`}>
          <HeroScene lite={cap.lite} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}

/**
 * Cube visual for the Custom Bespoke page.
 */
export function CubeVisual() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "80px" });
  const [ready, setReady] = useState(false);

  return (
    <div ref={ref} className="hero-visual">
      <div className={`hero-fallback ${ready ? "off" : ""}`}>
        <Tilt max={8}>
          <CubeFallback />
        </Tilt>
      </div>
      {cap.enabled && (
        <div className={`canvas-wrap ${ready ? "on" : ""}`}>
          <CubeScene lite={cap.lite} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}

export function FinalObject() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "200px" });
  const [seen, setSeen] = useState(false);
  if (visible && !seen) setSeen(true);

  return (
    <div ref={ref} className="final-object" aria-hidden="true">
      {/* Visual CSS-based portal wireframe fallback */}
      <div className={`final-fallback ${cap.enabled && seen ? "fade-out" : ""}`}>
        <div className="final-fallback-frame f-1" />
        <div className="final-fallback-frame f-2" />
        <div className="final-fallback-frame f-3" />
        <div className="final-fallback-frame f-4" />
      </div>

      {cap.enabled && seen && (
        <div className="canvas-wrap on">
          <FinalScene lite={cap.lite} active={visible} />
        </div>
      )}
    </div>
  );
}

export function ButterflyVisual() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "100px" });

  return (
    <div ref={ref} className="butterfly-visual-stage" aria-hidden="true">
      {cap.enabled && (
        <div className="canvas-wrap on">
          <ButterflyScene lite={cap.lite} active={visible} />
        </div>
      )}
    </div>
  );
}

