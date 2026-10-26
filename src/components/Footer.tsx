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
            <a href="#work">Work</a>
            <a href="#notes">Notes</a>
            <a href="#contact">Contact</a>
            <a href={site.developer.url} target="_blank" rel="noreferrer">
              {site.developer.name}
            </a>
          </nav>
        </div>
        <div className="footer__credit">
          <p>
            Developed by{' '}
            <a href={site.developer.url} target="_blank" rel="noreferrer">
              {site.developer.name}
            </a>
          </p>
          <a className="footer__dev-link" href={site.developer.url} target="_blank" rel="noreferrer">
            udithsandaruwan.com →
          </a>
        </div>
        <div className="footer__bottom">
          <p className="mono">
            © {year} {site.name} — All rights reserved ·{' '}
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
