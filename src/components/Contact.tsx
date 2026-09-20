import { useState, type FormEvent } from 'react'
import { site } from '../data/content'
import { Reveal } from './Reveal'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sent')
    e.currentTarget.reset()
  }

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__wrap">
        <Reveal>
          <p className="mono section__label">006 — Collaborate</p>
          <h2 className="section__title">Tell us what you want to invent</h2>
          <p className="section__lead" style={{ marginBottom: '2rem' }}>
            Briefs, half-formed ideas, ambitious campaigns — we start where curiosity is loudest.
            Based in {site.location}.
          </p>
          <a className="contact__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="contact__form" name="contact" onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="service">What service?</label>
              <select id="service" name="service" defaultValue="Experiments">
                <option>Experiments</option>
                <option>Development</option>
                <option>Content Creation</option>
                <option>Article Writing</option>
                <option>Social Marketing</option>
                <option>Everything</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button className="btn" type="submit">
              Send <span className="arrow">→</span>
            </button>
            {status === 'sent' && (
              <p className="form-status" role="status">
                Message staged — we&apos;ll reply soon.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
