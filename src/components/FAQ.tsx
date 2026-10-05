"use client";

import { useId, useState, useMemo } from "react";
import { FAQ as RAW_ITEMS } from "@/lib/content";
import { Reveal, RevealText } from "./ui/Reveal";

interface CategorizedFAQ {
  q: string;
  a: string;
  category: "rental" | "technical" | "custom";
  categoryLabel: string;
}

const FAQ_DATA: CategorizedFAQ[] = RAW_ITEMS.map((item) => {
  let category: "rental" | "technical" | "custom" = "rental";
  let categoryLabel = "Rental & Pricing";

  const qLower = item.q.toLowerCase();
  if (
    qLower.includes("mobile") ||
    qLower.includes("slow") ||
    qLower.includes("seo") ||
    qLower.includes("3d models")
  ) {
    category = "technical";
    categoryLabel = "Performance & 3D";
  } else if (
    qLower.includes("custom") ||
    qLower.includes("redesign") ||
    qLower.includes("launch") ||
    qLower.includes("owns")
  ) {
    category = "custom";
    categoryLabel = "Bespoke & IP";
  }

  return {
    ...item,
    category,
    categoryLabel,
  };
});

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"all" | "rental" | "technical" | "custom">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const base = useId();

  const filteredItems = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="section faq-section" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="faq-layout">
          {/* Left Column: Sticky Studio Help Desk */}
          <div className="faq-sidebar">
            <div className="faq-sidebar-sticky">
              <span className="faq-eyebrow">
                <span className="faq-eyebrow-dot" />
                KNOWLEDGE BASE & FAQ
              </span>

              <RevealText id="faq-title" text="Everything you need to know." className="h2 faq-headline" />

              <Reveal delay={100}>
                <p className="faq-lead">
                  Clear, upfront answers about our 3D rental licensing, custom WebGL production, mobile GPU
                  performance, and commercial rights.
                </p>
              </Reveal>

              {/* Category Filter Tabs */}
              <div className="faq-category-nav" role="tablist" aria-label="FAQ categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "all"}
                  onClick={() => {
                    setActiveCategory("all");
                    setOpenIndex(0);
                  }}
                  className={`faq-cat-btn ${activeCategory === "all" ? "is-active" : ""}`}
                >
                  <span>All Questions</span>
                  <span className="faq-cat-count">{FAQ_DATA.length}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "rental"}
                  onClick={() => {
                    setActiveCategory("rental");
                    setOpenIndex(0);
                  }}
                  className={`faq-cat-btn ${activeCategory === "rental" ? "is-active" : ""}`}
                >
                  <span>Rental & Licensing</span>
                  <span className="faq-cat-count">
                    {FAQ_DATA.filter((i) => i.category === "rental").length}
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "technical"}
                  onClick={() => {
                    setActiveCategory("technical");
                    setOpenIndex(0);
                  }}
                  className={`faq-cat-btn ${activeCategory === "technical" ? "is-active" : ""}`}
                >
                  <span>Performance & WebGL</span>
                  <span className="faq-cat-count">
                    {FAQ_DATA.filter((i) => i.category === "technical").length}
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "custom"}
                  onClick={() => {
                    setActiveCategory("custom");
                    setOpenIndex(0);
                  }}
                  className={`faq-cat-btn ${activeCategory === "custom" ? "is-active" : ""}`}
                >
                  <span>Bespoke & IP Rights</span>
                  <span className="faq-cat-count">
                    {FAQ_DATA.filter((i) => i.category === "custom").length}
                  </span>
                </button>
              </div>

              {/* Direct Help Desk Card */}
              <Reveal delay={200} className="faq-desk-card">
                <div className="faq-desk-header">
                  <div className="faq-desk-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="faq-desk-title">Have an unlisted question?</h4>
                    <span className="faq-desk-sub">Studio founders reply within 2 hours</span>
                  </div>
                </div>
                <p className="faq-desk-desc">
                  Need an NDA signed before discussing your product, or have questions about custom 3D file formats?
                </p>
                <a href="#contact" className="btn btn-primary btn-sm btn-block">
                  <span>Speak with a Studio Director</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Search + Accordion Stack */}
          <div className="faq-content">
            {/* Search Input Bar */}
            <div className="faq-search-box">
              <svg className="faq-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(0);
                }}
                placeholder="Search questions (e.g. domain, SEO, mobile, ownership)..."
                className="faq-search-input"
                aria-label="Search frequently asked questions"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="faq-search-clear"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Questions List */}
            {filteredItems.length === 0 ? (
              <div className="faq-empty-state">
                <p>No questions matched &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="faq-reset-btn"
                >
                  View all 14 questions
                </button>
              </div>
            ) : (
              <div className="faq-accordion-stack">
                {filteredItems.map((item, index) => {
                  const isOpen = openIndex === index;
                  const buttonId = `${base}-btn-${index}`;
                  const panelId = `${base}-panel-${index}`;

                  return (
                    <div
                      key={item.q}
                      className={`faq-card ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="faq-question-btn"
                      >
                        <div className="faq-q-left">
                          <span className="faq-q-badge">{item.categoryLabel}</span>
                          <span className="faq-q-text">{item.q}</span>
                        </div>
                        <div className="faq-q-toggle" aria-hidden="true">
                          <svg
                            className="faq-chevron-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </div>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`faq-answer-panel ${isOpen ? "is-visible" : ""}`}
                      >
                        <div className="faq-answer-inner">
                          <p className="faq-answer-text">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
