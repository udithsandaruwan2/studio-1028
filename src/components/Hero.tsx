import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Studio 1028">
      <div className="hero__stage">
        <motion.img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Cinematic urban architecture at dusk"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.06, opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <div className="hero__veil" />
        <div className="hero__brand">
          <h1 className="hero__word">
            <span style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.15, duration: 0.9, ease }}
              >
                Studio
              </motion.span>
            </span>
            <span className="num" style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.27, duration: 0.9, ease }}
              >
                10<em>28</em>
              </motion.span>
            </span>
          </h1>
        </div>
      </div>

      <div className="hero__footer">
        <motion.p
          className="hero__tag"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease }}
        >
          A studio for experiments, development, content, writing, and social — building the next
          kind of signal.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease }}
        >
          <a className="btn" href="#work">
            View work <span className="arrow">→</span>
          </a>
          <a className="btn btn--ghost" href="#contact">
            Start a project <span className="arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
