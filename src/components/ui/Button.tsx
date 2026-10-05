"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** Link-styled button with a subtle magnetic pull on fine pointers only. */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  size?: "md" | "sm";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.22);
      y((e.clientY - (r.top + r.height / 2)) * 0.28);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${size === "sm" ? "btn-sm" : ""} ${className}`}
    >
      <span>{children}</span>
    </a>
  );
}
