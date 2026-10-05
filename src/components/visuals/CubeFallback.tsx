import type { CSSProperties } from "react";

const z = (n: number) => ({ "--z": n }) as CSSProperties;

export function CubeFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`dim ${className}`} aria-hidden="true">
      <div className="dim-rig">
        {/* Layer 0: Backdrop */}
        <div className="dim-l dim-base" style={z(0)} />
        {/* Layer 1: Top Bar */}
        <div className="dim-l dim-bar" style={z(1)}>
          <i />
          <i />
          <i />
        </div>
        {/* Layer 2: Nav and UI elements */}
        <div className="dim-l dim-nav" style={z(2)}>
          <b />
          <b />
          <b className="on" />
        </div>
        <div className="dim-l dim-hero" style={z(2)} />
        <div className="dim-l dim-lines" style={z(3)}>
          <s />
          <s />
          <s />
          <em />
        </div>
        <div className="dim-l dim-cards" style={z(2.4)}>
          <u />
          <u />
          <u />
        </div>

        {/* Centerpiece 3D Isometric Cube Fallback */}
        <div className="dim-l cb-cube-wrap" style={z(5)}>
          <div className="cb-isometric-box">
            <div className="cb-face cb-top" />
            <div className="cb-face cb-left" />
            <div className="cb-face cb-right" />
            <div className="cb-inner-photon" />
          </div>
        </div>
      </div>
    </div>
  );
}
