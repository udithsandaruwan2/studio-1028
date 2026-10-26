import { NavLink, Outlet } from 'react-router-dom'
import './admin.css'

export function AdminShell() {
  return (
    <div className="office">
      <div className="office-shell">
        <aside className="office-side">
          <div className="office-side__brand">
            <img src="/brand/logo-white.png" alt="Studio 1028" />
            <small>Office · Documents</small>
          </div>
          <nav className="office-nav">
            <NavLink to="/admin" end>
              Templates
            </NavLink>
            <NavLink to="/admin/settings">Studio details</NavLink>
            <NavLink to="/">Public site</NavLink>
          </nav>
          <p className="office-side__foot">
            Local drafts
            <br />
            Not live until you say so
          </p>
        </aside>
        <div className="office-main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
