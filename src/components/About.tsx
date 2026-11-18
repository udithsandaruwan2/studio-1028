import { images, site } from '../data/content'
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
            <div className="about__photo">
              <img src={images.about.src} alt={images.about.alt} loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section__lead">
              Studio 1028 is a community and open-source project company — experiments, development,
              content systems, writing, and social woven into one editorial engine. We prototype
              boldly, publish clearly, and ship in the open.
            </p>
            <p className="section__lead" style={{ marginTop: '1.25rem' }}>
              Powered by{' '}
              <a href={site.poweredBy.url} target="_blank" rel="noreferrer">
                {site.poweredBy.name}
              </a>
              . Developed by{' '}
              <a href={site.developer.url} target="_blank" rel="noreferrer">
                {site.developer.name}
              </a>
              . Based in {site.location} — every brief is a laboratory, every launch the next
              experiment.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="about__stats" aria-label="Studio focus areas">
            <div className="about__stat">
              <strong>Open</strong>
              <span className="mono">Community OSS</span>
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
