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
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="mono">© {year} Studio 1028 — All rights reserved</p>
          <a className="top-link" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
