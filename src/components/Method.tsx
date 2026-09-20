import { method } from '../data/content'
import { Reveal } from './Reveal'

export function Method() {
  return (
    <section className="section" id="method">
      <div className="shell">
        <Reveal>
          <p className="mono section__label">004 — Method</p>
          <h2 className="section__title">From pulse to publish</h2>
        </Reveal>
        <div className="method__list">
          {method.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.06}>
              <article className="method__item">
                <span className="mono">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
