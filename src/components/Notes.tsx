import { notes } from '../data/content'
import { Reveal } from './Reveal'

export function Notes() {
  return (
    <section className="section" id="notes">
      <div className="shell">
        <Reveal>
          <p className="mono section__label">005 — Field notes</p>
          <h2 className="section__title">Writing from the lab</h2>
          <p className="section__lead">
            Essays and process notes on building media systems, experiments, and audiences that
            stick.
          </p>
        </Reveal>
        <div className="notes__list">
          {notes.map((note, i) => (
            <Reveal key={note.id} delay={i * 0.05}>
              <a className="notes__row" href="#contact">
                <span className="mono">{note.category}</span>
                <h3>{note.title}</h3>
                <span className="mono">{note.date}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
