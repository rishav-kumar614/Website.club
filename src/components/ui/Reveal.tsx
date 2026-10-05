"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type Tag = "div" | "p" | "li" | "ol" | "section" | "span" | "article";

/** Fade/translate reveal. Content stays in the DOM and readable without JS. */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  spot = false,
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
  spot?: boolean;
  style?: CSSProperties;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      "data-spot": spot ? "" : undefined,
      className: `rv ${inView ? "in" : ""} ${className}`,
      style: { "--d": `${delay}ms`, ...style } as CSSProperties,
    },
    children,
  );
}

/** Word-by-word masked headline reveal. */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
  mark,
}: {
  mark?: string;
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const [ref, inView] = useInView<HTMLElement>({ margin: "0px 0px -5% 0px" });
  const words = text.split(" ");
  return (
    <Tag
      id={id}
      ref={ref as never}
      className={`rt ${inView ? "in" : ""} ${className}`}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className={`w ${mark === w ? "w-mark" : ""}`}>
            <span style={{ "--i": i + delay } as CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
