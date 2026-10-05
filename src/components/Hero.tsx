import { RevealText, Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { HeroVisual } from "./visuals/SceneHosts";
import { HeroSquareBackground } from "./visuals/HeroSquareBackground";

const PATHS = [
  { n: "01", t: "Rent", d: "Ready-made 3D sites, monthly", href: "#websites" },
  { n: "02", t: "Build", d: "Original, from scratch", href: "#custom" },
  { n: "03", t: "Transform", d: "Upgrade what you have", href: "#transform" },
];

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <HeroSquareBackground />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">3D &amp; Interactive Web Studio</p>
          </Reveal>
          <RevealText as="h1" id="hero-title" text="Websites shouldn't feel flat." mark="flat." className="display" />
          <Reveal delay={200}>
            <p className="lead">
              Rent a premium 3D website, build something completely custom, or transform your existing
              website into an interactive experience.
            </p>
          </Reveal>
          <Reveal delay={300} className="row">
            <Button href="#websites">Explore Websites</Button>
            <Button href="#contact" variant="ghost">
              Start a Project
            </Button>
          </Reveal>
        </div>
        <HeroVisual />
      </div>
      <Reveal delay={500} className="wrap hero-paths-wrap">
        <ul className="hero-paths" aria-label="Three ways to work with Website Club">
          {PATHS.map((p) => (
            <li key={p.t}>
              <a href={p.href}>
                <span className="num">{p.n}</span>
                <strong>{p.t}</strong>
                <em>{p.d}</em>
                <i aria-hidden="true">↗</i>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
