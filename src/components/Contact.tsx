import { useState, type FormEvent } from 'react'
import { site } from '../data/content'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    if (!formData.get('form-name')) formData.set('form-name', 'contact')
    const body = new URLSearchParams()
    formData.forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value)
    })

    setStatus('sending')
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('Form failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__wrap">
        <Reveal>
          <p className="mono section__label">006 — Collaborate</p>
          <h2 className="section__title">Tell us what you want to invent</h2>
          <p className="section__lead" style={{ marginBottom: '2rem' }}>
            Briefs, half-formed ideas, open-source contributions, ambitious campaigns — we start
            where curiosity is loudest. Based in {site.location}.
          </p>
          <a className="contact__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            className="contact__form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="contact__honeypot" hidden>
              <label>
                Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="service">What service?</label>
              <select id="service" name="service" defaultValue="Development">
                <option>Experiments</option>
                <option>Development</option>
                <option>Open source</option>
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
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'} <span className="arrow">→</span>
            </button>
            {status === 'sent' && (
              <p className="form-status" role="status">
                Message received — we&apos;ll reply soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status form-status--error" role="alert">
                Could not send. Email us at {site.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
