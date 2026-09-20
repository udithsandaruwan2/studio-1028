import { motion, useAnimationFrame } from 'framer-motion'
import { useRef } from 'react'
import { stripImages } from '../data/content'

export function ImageStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useRef(0)

  useAnimationFrame((_, delta) => {
    const el = trackRef.current
    if (!el) return
    x.current -= delta * 0.035
    const half = el.scrollWidth / 2
    if (Math.abs(x.current) >= half) x.current = 0
    el.style.transform = `translate3d(${x.current}px,0,0)`
  })

  const loop = [...stripImages, ...stripImages]

  return (
    <section className="strip" aria-label="Studio reel">
      <div className="strip__track" ref={trackRef}>
        {loop.map((item, i) => (
          <motion.div
            className="strip__item"
            key={`${item.src}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.6 }}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
