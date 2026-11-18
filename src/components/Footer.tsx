import { site } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <p className="footer__brand">
            Studio
            <br />
            1028
          </p>
          <nav className="footer__links" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#practices">Practices</a>
            <a href="#products">Products</a>
            <a href="#work">Work</a>
            <a href="#notes">Notes</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer__credit">
          <div className="footer__credit-stack">
            <p>
              {site.name} powered by{' '}
              <a href={site.poweredBy.url} target="_blank" rel="noreferrer">
                {site.poweredBy.name}
              </a>
            </p>
            <p>
              Developed by{' '}
              <a href={site.developer.url} target="_blank" rel="noreferrer">
                {site.developer.name}
              </a>
            </p>
          </div>
          <div className="footer__credit-links">
            <a
              className="footer__dev-link"
              href={site.poweredBy.url}
              target="_blank"
              rel="noreferrer"
            >
              lumyrth.dev →
            </a>
            <a
              className="footer__dev-link"
              href={site.developer.url}
              target="_blank"
              rel="noreferrer"
            >
              udithsandaruwan.com →
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="mono">
            © {year} {site.name} — community &amp; open source ·{' '}
            <a href="/admin" className="top-link">
              /admin
            </a>
          </p>
          <a className="top-link" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
