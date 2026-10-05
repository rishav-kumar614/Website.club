import type { CSSProperties } from "react";

const z = (n: number) => ({ "--z": n }) as CSSProperties;

/**
 * A website interface exploded into depth layers, built with CSS 3D.
 * Used as the static hero fallback, the "After" side of the slider, and card visuals.
 * `flat` collapses every layer to z = 0.
 */
export function Dimensional({ className = "", flat = false }: { className?: string; flat?: boolean }) {
  return (
    <div className={`dim ${flat ? "dim-flat" : ""} ${className}`} aria-hidden="true">
      <div className="dim-rig">
        <div className="dim-l dim-base" style={z(0)} />
        <div className="dim-l dim-bar" style={z(1)}>
          <i />
          <i />
          <i />
        </div>
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
        <div className="dim-l dim-orb" style={z(5)} />
      </div>
    </div>
  );
}
