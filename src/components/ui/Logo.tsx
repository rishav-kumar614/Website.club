/** Placeholder mark + wordmark. Swap the SVG for the animated 3D logo later. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Website Club — home" className={`logo ${className}`}>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
          <rect x="3" y="6" width="22" height="20" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 11h22" stroke="currentColor" strokeWidth="1.6" />
          <rect
            x="9"
            y="2"
            width="20"
            height="18"
            rx="3.5"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            opacity="0.9"
          />
        </svg>
      </span>
      <span className="logo-text">WEBSITE CLUB</span>
    </a>
  );
}
