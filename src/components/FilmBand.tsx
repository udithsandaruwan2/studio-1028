import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { images } from '../data/content'

export function FilmBand() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="film" ref={ref} aria-label="Studio atmosphere">
      <div className="film__frame">
        <motion.img style={{ y }} src={images.film.src} alt={images.film.alt} />
        <div className="film__caption">
          <span className="mono">Studio 1028 / Continuous experiment</span>
        </div>
      </div>
    </section>
  )
}
