import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { DirectoryProvider, Dock } from './Directory'
import Footer from './Footer'
import SiteHeader from './SiteHeader'

/** Moves focus to the hash target, or to <main> after a page change, for keyboard and screen-reader users. */
function useFocusOnNavigate() {
  const location = useLocation()
  const initialKey = useRef(location.key)
  useEffect(() => {
    const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : ''
    if (location.key === initialKey.current) {
      // First load: leave focus alone, but honour a hash once layout and fonts have settled.
      if (!id) return
      const go = () => document.getElementById(id)?.scrollIntoView()
      const frame = requestAnimationFrame(go)
      document.fonts?.ready.then(go)
      return () => cancelAnimationFrame(frame)
    }
    const el = (id && document.getElementById(id)) || document.getElementById('main')
    if (!el) return
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }, [location.key, location.hash])
}

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  useFocusOnNavigate()
  // The wipe marks a change of page; jumping to a section on the same page doesn't play it.
  const [firstPath] = useState(location.pathname)
  const [changedPage, setChangedPage] = useState(false)
  if (!changedPage && location.pathname !== firstPath) setChangedPage(true)

  const skip = (e: MouseEvent) => {
    e.preventDefault()
    const main = document.getElementById('main')
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <DirectoryProvider>
      <a className="skip-link" href="#main" onClick={skip}>
        Skip to content
      </a>
      <SiteHeader home={isHome} />
      <main id="main" tabIndex={-1} key={location.pathname} className="page">
        <Outlet />
      </main>
      <Footer />
      <Dock />
      {/* Page transition: an accent panel sweeps off diagonally after each change of page. */}
      {changedPage && <span className="wipe" key={`wipe-${location.pathname}`} aria-hidden="true" />}
      {/* Fresh loads all share the key "default"; key them by path so one page never inherits another's scroll. */}
      <ScrollRestoration getKey={(loc) => (loc.key === 'default' ? `default:${loc.pathname}` : loc.key)} />
    </DirectoryProvider>
  )
}
