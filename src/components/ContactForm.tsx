"use client";

import { useState, type FormEvent } from "react";

const STUDIO_EMAIL = "hello@websiteclub.com";

const PATHWAYS = [
  { id: "rent", label: "Rent a 3D Website", hint: "From $490/mo · Launch in 48h" },
  { id: "bespoke", label: "Bespoke 3D Build", hint: "From $8,500 · Original WebGL" },
  { id: "transform", label: "Website Transformation", hint: "From $3,800 · Upgrade & 3D" },
  { id: "custom", label: "Custom R&D / Shader Art", hint: "Tailored Architecture" },
] as const;

const BUDGET_TIERS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $40,000",
  "$40,000+",
  "To be determined",
] as const;

const TIMELINE_OPTIONS = [
  "< 48 Hours (Rental)",
  "2 – 3 Weeks",
  "1 – 2 Months",
  "Flexible Exploration",
] as const;

export function ContactForm() {
  const [selectedPathway, setSelectedPathway] = useState<string>(PATHWAYS[0].label);
  const [selectedBudget, setSelectedBudget] = useState<string>(BUDGET_TIERS[1]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const website = (formData.get("website") as string)?.trim() || "Not provided";
    const message = (formData.get("message") as string)?.trim() || "No additional vision notes provided.";

    const emailBody = [
      `=== STUDIO PROJECT INQUIRY ===`,
      `Client Name: ${name}`,
      `Work Email: ${email}`,
      `Current Website / Reference: ${website}`,
      ``,
      `--- CONFIGURATION ---`,
      `Engagement Pathway: ${selectedPathway}`,
      `Target Investment: ${selectedBudget}`,
      `Target Timeline: ${selectedTimeline}`,
      ``,
      `--- PROJECT VISION & SCOPE ---`,
      message,
    ].join("\n");

    const subject = encodeURIComponent(`Project Inquiry: ${name} — ${selectedPathway}`);
    const body = encodeURIComponent(emailBody);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    }, 600);
  };

  if (submitted) {
    return (
      <div className="cform-success-card" role="status">
        <div className="cform-success-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="cform-success-title">Studio Inquiry Initialized</h3>
        <p className="cform-success-text">
          Your default email application has opened with your project specifications pre-filled. If it did not trigger automatically,
          you can forward your specifications directly to{" "}
          <a href={`mailto:${STUDIO_EMAIL}`} className="cform-email-link">
            {STUDIO_EMAIL}
          </a>.
        </p>

        <div className="cform-success-recap">
          <div className="cform-recap-item">
            <span className="recap-label">Pathway</span>
            <span className="recap-val">{selectedPathway}</span>
          </div>
          <div className="cform-recap-item">
            <span className="recap-label">Budget</span>
            <span className="recap-val">{selectedBudget}</span>
          </div>
          <div className="cform-recap-item">
            <span className="recap-label">Timeline</span>
            <span className="recap-val">{selectedTimeline}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn btn-secondary cform-reset-btn"
        >
          Edit specifications or send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form id="project-form" className="cform-console" onSubmit={handleSubmit} aria-labelledby="cform-title">
      {/* Console Header */}
      <div className="cform-console-head">
        <div>
          <span className="cform-console-eyebrow">DIRECT STUDIO DESK</span>
          <h3 id="cform-title" className="cform-console-title">Initiate a Project</h3>
        </div>
        <div className="cform-sla-badge">
          <span className="cform-sla-dot" />
          <span>Avg Reply &lt; 2h</span>
        </div>
      </div>

      {/* Pathway Selection */}
      <div className="cform-group">
        <label className="cform-label">
          <span>1. Select Project Pathway</span>
          <span className="cform-hint">Choose how you wish to engage</span>
        </label>
        <div className="cform-pathway-grid" role="radiogroup" aria-label="Select project pathway">
          {PATHWAYS.map((p) => {
            const isSelected = selectedPathway === p.label;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedPathway(p.label)}
                className={`cform-pathway-card ${isSelected ? "is-selected" : ""}`}
              >
                <div className="cform-pathway-top">
                  <span className="cform-pathway-name">{p.label}</span>
                  <span className={`cform-radio-dot ${isSelected ? "active" : ""}`} />
                </div>
                <span className="cform-pathway-hint">{p.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Tier */}
      <div className="cform-group">
        <label className="cform-label">
          <span>2. Estimated Investment Tier</span>
          <span className="cform-hint">Transparent scope alignment</span>
        </label>
        <div className="cform-pill-selector" role="radiogroup" aria-label="Select estimated budget tier">
          {BUDGET_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              role="radio"
              aria-checked={selectedBudget === tier}
              onClick={() => setSelectedBudget(tier)}
              className={`cform-pill-btn ${selectedBudget === tier ? "is-selected" : ""}`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Target Launch Timeline */}
      <div className="cform-group">
        <label className="cform-label">
          <span>3. Target Launch Timeline</span>
          <span className="cform-hint">When you need this live</span>
        </label>
        <div className="cform-pill-selector" role="radiogroup" aria-label="Select launch timeline">
          {TIMELINE_OPTIONS.map((time) => (
            <button
              key={time}
              type="button"
              role="radio"
              aria-checked={selectedTimeline === time}
              onClick={() => setSelectedTimeline(time)}
              className={`cform-pill-btn ${selectedTimeline === time ? "is-selected" : ""}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Text Fields Grid */}
      <div className="cform-inputs-grid">
        <div className="cform-field">
          <label htmlFor="cform-name" className="cform-label">
            <span>Your Name</span>
            <span className="cform-req">*</span>
          </label>
          <input
            id="cform-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="e.g. Jonathan Mercer"
            className="cform-input"
          />
        </div>

        <div className="cform-field">
          <label htmlFor="cform-email" className="cform-label">
            <span>Work Email</span>
            <span className="cform-req">*</span>
          </label>
          <input
            id="cform-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jonathan@company.com"
            className="cform-input"
          />
        </div>

        <div className="cform-field cform-field-full">
          <label htmlFor="cform-website" className="cform-label">
            <span>Current Website or Concept URL</span>
            <span className="cform-opt">(Optional)</span>
          </label>
          <input
            id="cform-website"
            name="website"
            type="text"
            autoComplete="url"
            placeholder="https://yourbrand.com or Figma / Notion link"
            className="cform-input"
          />
        </div>

        <div className="cform-field cform-field-full">
          <label htmlFor="cform-message" className="cform-label">
            <span>Project Scope &amp; Ambitions</span>
            <span className="cform-hint">What are you building, and what feeling should it evoke?</span>
          </label>
          <textarea
            id="cform-message"
            name="message"
            rows={3}
            placeholder="Describe your product, aesthetic goals, or specific 3D features you'd love to explore..."
            className="cform-textarea"
          />
        </div>
      </div>

      {/* Console Footer & Action */}
      <div className="cform-console-foot">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-block cform-submit-btn"
        >
          <span>{isSubmitting ? "Generating Brief…" : "Submit Studio Inquiry"}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <div className="cform-security-guarantee">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Strict mutual NDA guaranteed. Your IP and vision remain 100% confidential. No spam, ever.</span>
        </div>
      </div>
    </form>
  );
}
