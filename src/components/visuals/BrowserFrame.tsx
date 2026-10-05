import type { ReactNode } from "react";

export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bf ${className}`} aria-hidden="true">
      <div className="bf-bar">
        <span />
        <span />
        <span />
        <em>{url}</em>
      </div>
      <div className="bf-body">{children}</div>
    </div>
  );
}

/** A normal, flat website — the "before" state. */
export function FlatSite() {
  return (
    <BrowserFrame url="yourbrand.com" className="bf-flat">
      <div className="fs">
        <div className="fs-nav">
          <b>Yourbrand</b>
          <span>
            <i />
            <i />
            <i />
            <i className="on" />
          </span>
        </div>
        <div className="fs-hero">
          <div className="fs-copy">
            <h4>Everything your customers need</h4>
            <p>A clean, organized website with a photo, some copy, and a button.</p>
            <span className="fs-btn">Get started</span>
          </div>
          <div className="fs-img" />
        </div>
        <div className="fs-cards">
          <u />
          <u />
          <u />
        </div>
      </div>
    </BrowserFrame>
  );
}
