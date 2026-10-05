"use client";

import { useEffect } from "react";

/** Feeds pointer position to any [data-spot] element for the hover light effect. */
export function Spotlight() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);
  return null;
}
