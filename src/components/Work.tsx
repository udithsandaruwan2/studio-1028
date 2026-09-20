import { works } from '../data/content'
import { Reveal } from './Reveal'

export function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="work__head">
          <Reveal>
            <p className="mono section__label">003 — Selected work</p>
            <h2 className="section__title">Experiments that shipped</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section__lead">
              A cross-section of builds, campaigns, and editorial systems — proof that curiosity and
              production can share the same desk.
            </p>
          </Reveal>
        </div>

        <div className="work__grid">
          {works.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.06}>
              <a className="work__card" href="#contact">
                <div className="work__media">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <h3 className="work__title">{item.title}</h3>
                <div className="work__meta">
                  <span className="mono">{item.tag}</span>
                  <span className="mono">{item.year}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
