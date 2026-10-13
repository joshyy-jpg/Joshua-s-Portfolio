import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { directory, resumeLink } from '../content/site'
import { LogoMark } from './Logos'
import SmartLink from './SmartLink'

type DirectoryState = {
  open: boolean
  openMenu: (opener?: HTMLElement | null) => void
  closeMenu: (returnFocus?: boolean) => void
}

const DirectoryContext = createContext<DirectoryState | null>(null)

export function useDirectory() {
  const ctx = useContext(DirectoryContext)
  if (!ctx) throw new Error('useDirectory must be used inside <DirectoryProvider>')
  return ctx
}

export function DirectoryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const opener = useRef<HTMLElement | null>(null)

  const openMenu = useCallback((el?: HTMLElement | null) => {
    opener.current = el ?? (document.activeElement as HTMLElement | null)
    setOpen(true)
  }, [])

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false)
    if (returnFocus) {
      const target = opener.current?.isConnected ? opener.current : document.getElementById('dock-toggle')
      requestAnimationFrame(() => target?.focus({ preventScroll: true }))
    }
  }, [])

  const value = useMemo(() => ({ open, openMenu, closeMenu }), [open, openMenu, closeMenu])
  return <DirectoryContext.Provider value={value}>{children}</DirectoryContext.Provider>
}

/** Compact navigation dock that appears after the hero and expands into the directory. */
export function Dock() {
  const { open, openMenu, closeMenu } = useDirectory()
  const location = useLocation()
  const [pastHero, setPastHero] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Show after the element marked data-dock-after has mostly scrolled away.
  useEffect(() => {
    let frame = 0
    const update = () => {
      const trigger = document.querySelector<HTMLElement>('[data-dock-after]')
      const threshold = trigger
        ? trigger.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.4
        : 320
      setPastHero(window.scrollY > Math.max(120, threshold))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  // Step aside when the footer's own links are on screen, so it never covers them.
  useEffect(() => {
    const end = document.querySelector('[data-dock-hide]')
    if (!end || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting))
    io.observe(end)
    return () => io.disconnect()
  }, [location.pathname])

  // Close when the destination changes.
  useEffect(() => {
    closeMenu(false)
  }, [location.key, closeMenu])

  // Focus the first destination on open; trap Tab and handle Escape while open.
  useEffect(() => {
    if (!open) return
    const first = panelRef.current?.querySelector<HTMLElement>('a, button')
    const id = requestAnimationFrame(() => first?.focus({ preventScroll: true }))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== 'Tab' || !rootRef.current) return
      const nodes = Array.from(rootRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      if (!nodes.length) return
      const firstNode = nodes[0]
      const lastNode = nodes[nodes.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (!active || !rootRef.current.contains(active)) {
        e.preventDefault()
        firstNode.focus()
      } else if (e.shiftKey && active === firstNode) {
        e.preventDefault()
        lastNode.focus()
      } else if (!e.shiftKey && active === lastNode) {
        e.preventDefault()
        firstNode.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, closeMenu])

  const visible = open || (pastHero && !atFooter)

  return (
    <>
      <div
        className="backdrop"
        data-open={open}
        aria-hidden="true"
        onClick={() => closeMenu()}
      />
      <div
        ref={rootRef}
        className="dock"
        data-visible={visible}
        data-open={open}
        inert={!visible}
      >
        <nav
          ref={panelRef}
          id="directory"
          className="directory"
          aria-label="Directory"
          inert={!open}
        >
          {directory.map((row, r) => (
            <ul className="directory-row" key={r}>
              {row.map((item, i) => {
                const order = directory.slice(r + 1).reduce((n, rr) => n + rr.length, 0) + i
                return (
                  <li key={item.label} style={{ '--i': order } as CSSProperties}>
                    <SmartLink
                      to={item.to}
                      href={item.href}
                      external={item.external}
                      note={item.note}
                      className="directory-tile rivets"
                      onClick={() => closeMenu(Boolean(item.href))}
                    >
                      <span className="directory-label">{item.label}</span>
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          ))}
        </nav>
        <div className="dock-bar">
          <Link to="/" className="dock-mark" aria-label="Joshua Lee, home">
            <LogoMark />
          </Link>
          <button
            id="dock-toggle"
            type="button"
            className="dock-toggle rivets"
            aria-expanded={open}
            aria-controls="directory"
            onClick={(e) => (open ? closeMenu() : openMenu(e.currentTarget))}
          >
            <span>{open ? 'Close' : 'Directory'}</span>
            <span className="dock-icon" aria-hidden="true" />
          </button>
          <SmartLink {...resumeLink} className="dock-resume rivets">
            Résumé
          </SmartLink>
        </div>
      </div>
    </>
  )
}
