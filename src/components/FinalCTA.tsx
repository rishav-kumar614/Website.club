"use client";

import { useState } from "react";
import { Reveal, RevealText } from "./ui/Reveal";
import { ContactForm } from "./ContactForm";
import { FinalObject } from "./visuals/SceneHosts";

export function FinalCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@websiteclub.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="final-section" aria-labelledby="final-title">
      <div className="wrap">
        <div className="final-grid">
          {/* Left Column: Studio Launchpad & 3D Depth Portal */}
          <div className="final-launchpad">
            <div className="final-launchpad-sticky">
              {/* Studio Availability Status Indicator */}
              <div className="final-status-pill">
                <span className="final-status-indicator">
                  <span className="final-status-radar" />
                  <span className="final-status-dot" />
                </span>
                <span className="final-status-text">Studio Capacity · Accepting 2 Flagship Q4 Builds</span>
              </div>

              <RevealText
                id="final-title"
                text="Build something people remember."
                className="final-headline"
              />

              <Reveal delay={100}>
                <p className="final-lead">
                  Every brand gets one flagship digital presence. Whether you need a turnkey 3D model in 48 hours,
                  a complete website transformation, or a bespoke WebGL world engineered from scratch, we make yours impossible to ignore.
                </p>
              </Reveal>

              {/* 3D Portal Interactive Host */}
              <div className="final-portal-stage" aria-label="Interactive 3D Portal">
                <div className="final-portal-header">
                  <div className="final-portal-meta">
                    <span className="final-portal-live-dot" />
                    <span>PORTAL ENGINE · 3D DEPTH CANVAS</span>
                  </div>
                  <span className="final-portal-fps">60 FPS WEBGL</span>
                </div>

                <div className="final-portal-canvas-wrap">
                  <FinalObject />
                </div>

                <div className="final-portal-footer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m10 15 5-3-5-3v6Z" />
                  </svg>
                  <span>Interactive 3D Stage · Move cursor to orbit spatial frames</span>
                </div>
              </div>

              {/* Direct Studio Channels Card */}
              <div className="final-channels-card">
                <div className="final-channel-item">
                  <div className="final-channel-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="final-channel-details">
                    <span className="final-channel-label">Direct Studio Email</span>
                    <div className="final-email-row">
                      <a href="mailto:hello@websiteclub.com" className="final-channel-val">
                        hello@websiteclub.com
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="final-copy-btn"
                        title="Copy email to clipboard"
                        aria-label="Copy studio email address"
                      >
                        {copied ? (
                          <span className="copied-text">Copied!</span>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="final-channel-item">
                  <div className="final-channel-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="final-channel-details">
                    <span className="final-channel-label">Studio Discovery Call</span>
                    <span className="final-channel-val">15-min Technical Review</span>
                  </div>
                </div>
              </div>

              {/* Verified Studio Assurances */}
              <div className="final-assurances">
                <div className="final-assurance-item">
                  <svg className="final-assure-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>48h Turnkey Deployment</span>
                </div>
                <div className="final-assurance-item">
                  <svg className="final-assure-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>60 FPS Mobile GPU Audited</span>
                </div>
                <div className="final-assurance-item">
                  <svg className="final-assure-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Full Commercial IP Rights</span>
                </div>
                <div className="final-assurance-item">
                  <svg className="final-assure-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Mutual NDA Protection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Inquiry Console */}
          <div className="final-form-col">
            <Reveal delay={140}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
