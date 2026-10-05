"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has entered the viewport (or stays in sync when `once` is false). */
export function useInView<T extends Element>(opts?: { once?: boolean; margin?: string }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const once = opts?.once ?? true;
  const margin = opts?.margin ?? "0px 0px -10% 0px";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin]);

  return [ref, inView] as const;
}

export type Capability = { enabled: boolean; lite: boolean; ready: boolean };

/**
 * Decides whether to mount WebGL scenes. Static CSS fallbacks are used for
 * reduced-motion, data-saver, low-memory/low-core devices and no-WebGL browsers.
 * `lite` = phones/tablets: lower DPR, fewer layers, no pointer tracking.
 */
export function use3DCapability(): Capability {
  const [cap, setCap] = useState<Capability>({ enabled: false, lite: true, ready: false });

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const lowPower =
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
      nav.connection?.saveData === true;

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    const enabled = !reduced && !lowPower && webgl;
    // Wait until the page is idle so first paint is never blocked by 3D.
    const start = () => setCap({ enabled, lite, ready: true });
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 400);
    return () => clearTimeout(t);
  }, []);

  return cap;
}

/** Always returns true for light theme. */
export function useIsLight() {
  return true;
}
