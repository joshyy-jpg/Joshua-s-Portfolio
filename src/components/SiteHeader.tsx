import { Link, NavLink } from 'react-router-dom'
import { LogoMark } from './Logos'
import SmartLink from './SmartLink'

/** One full, visible menu on every page and screen size. */
export default function SiteHeader({ home }: { home: boolean }) {
  return (
    <header className={`site-header full-menu${home ? ' site-header--home' : ''}`}>
      <Link to="/" className="header-mark" aria-label="Joshua Lee, home">
        <LogoMark />
      </Link>
      <nav className="site-nav" aria-label="Primary">
        <ul>
          <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
          <li><NavLink to="/work" className="nav-link">Work</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li><SmartLink to="#contact" className="nav-link">Connect</SmartLink></li>
        </ul>
      </nav>
    </header>
  )
}
