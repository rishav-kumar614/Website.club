"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling. Skipped for reduced motion and touch devices (native feels better). */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -72 } });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
