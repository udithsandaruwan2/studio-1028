import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function FilmBand() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="film" ref={ref} aria-hidden="true">
      <div className="film__frame">
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
        <div className="film__caption">
          <span className="mono">Studio 1028 / Continuous experiment</span>
        </div>
      </div>
    </section>
  )
}
