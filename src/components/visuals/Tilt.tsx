"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/** Perspective tilt that follows a mouse. Ignored for touch/pen input. */
export function Tilt({
  children,
  max = 10,
  className = "",
  spot = false,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  spot?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${nx * max}deg`);
    el.style.setProperty("--rx", `${-ny * max}deg`);
    el.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div ref={ref} data-spot={spot ? "" : undefined} onPointerMove={move} onPointerLeave={leave} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
