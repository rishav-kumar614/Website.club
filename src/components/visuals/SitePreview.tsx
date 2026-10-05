import type { CSSProperties } from "react";
import { BrowserFrame } from "./BrowserFrame";

type Variant = "maison" | "forma" | "orbit";

const bld = (x: number, y: number, w: number, d: number, h: number) =>
  ({ "--x": x, "--y": y, "--w": w, "--d": d, "--h": h }) as CSSProperties;

const BUILDINGS: [number, number, number, number, number][] = [
  [-90, -30, 60, 60, 90],
  [-10, -70, 50, 50, 150],
  [50, -10, 70, 46, 60],
  [-60, 50, 44, 44, 40],
  [30, 60, 56, 56, 110],
];

/** Stylised, CSS-built stand-ins for each rental product (no photos, no canvas). */
export function SitePreview({ variant, url }: { variant: Variant; url: string }) {
  return (
    <BrowserFrame url={url} className={`sp sp-${variant}`}>
      <div className="sp-stage">
        {variant === "maison" && (
          <>
            <div className="mz-plate">
              <div className="mz-ring r1" />
              <div className="mz-ring r2" />
              <div className="mz-ring r3" />
              <div className="mz-core" />
            </div>
            <div className="mz-chip c1" />
            <div className="mz-chip c2" />
            <div className="mz-chip c3" />
          </>
        )}
        {variant === "forma" && (
          <div className="fz-plane">
            <div className="fz-grid" />
            {BUILDINGS.map(([x, y, w, d, h], i) => (
              <div key={i} className="fz-box" style={bld(x, y, w, d, h)}>
                <i className="t" />
                <i className="f" />
                <i className="r" />
              </div>
            ))}
          </div>
        )}
        {variant === "orbit" && (
          <>
            <div className="oz-orbit o1" />
            <div className="oz-orbit o2" />
            <div className="oz-sphere" />
            <div className="oz-sat s1" />
            <div className="oz-sat s2" />
          </>
        )}
      </div>
      <div className="sp-ui">
        <b>{variant}</b>
        <span>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="sp-title">
        <s />
        <s />
      </div>
    </BrowserFrame>
  );
}
