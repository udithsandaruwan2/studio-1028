import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { practices } from '../data/content'
import { Reveal } from './Reveal'

export function Practices() {
  const [open, setOpen] = useState<string | null>('01')

  return (
    <section className="section" id="practices">
      <div className="shell">
        <Reveal>
          <p className="mono section__label">002 — Practices</p>
          <h2 className="section__title">What we run every day</h2>
          <p className="section__lead">
            Five intertwined practices. One studio rhythm — from speculative prototypes to campaigns
            that actually move people.
          </p>
        </Reveal>

        <div className="practice" style={{ marginTop: '2.5rem' }}>
          {practices.map((item, i) => {
            const isOpen = open === item.id
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <button
                  type="button"
                  className="practice__row"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                >
                  <span className="practice__id">{item.id}</span>
                  <span className="practice__name">{item.title}</span>
                  <span className="practice__toggle" aria-hidden="true">
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="practice__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="practice__copy">{item.copy}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
