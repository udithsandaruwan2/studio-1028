import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <Reveal>
          <p className="mono section__label">001 — The studio</p>
        </Reveal>
        <div className="about__grid">
          <Reveal>
            <h2 className="section__title">
              Built for curiosity.
              <br />
              Shipped with craft.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section__lead">
              Studio 1028 is a practice for experiments and developments — content systems, article
              writing, and social media marketing woven into one editorial engine. We prototype
              boldly, publish clearly, and refine relentlessly.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="about__stats" aria-label="Studio focus areas">
            <div className="about__stat">
              <strong>R&amp;D</strong>
              <span className="mono">Experiments</span>
            </div>
            <div className="about__stat">
              <strong>Build</strong>
              <span className="mono">Development</span>
            </div>
            <div className="about__stat">
              <strong>Signal</strong>
              <span className="mono">Media &amp; writing</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
