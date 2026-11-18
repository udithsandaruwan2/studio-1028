import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../data/content'

const links = [
  { href: '#about', label: 'About' },
  { href: '#practices', label: 'Practices' },
  { href: '#products', label: 'Products' },
  { href: '#work', label: 'Work' },
  { href: '#notes', label: 'Notes' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="nav">
        <a className="nav__brand" href="#top" onClick={close}>
          Studio <span>1028</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="nav__menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          Menu <i aria-hidden="true" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Mobile">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="menu-overlay__meta">
              <p className="mono">Community · Open source · Systems</p>
              <div className="menu-overlay__meta-links">
                <a className="mono" href={`mailto:${site.email}`} onClick={close}>
                  {site.email}
                </a>
                <a
                  className="mono"
                  href={site.poweredBy.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                >
                  Powered by {site.poweredBy.name}
                </a>
                <a
                  className="mono"
                  href={site.developer.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                >
                  Developed by {site.developer.name}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
