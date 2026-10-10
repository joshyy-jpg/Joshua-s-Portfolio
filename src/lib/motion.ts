import { useEffect, useRef, useState } from 'react'

// Scroll reveals. Content is visible by default; the inline script in index.html
// adds `motion` to <html> only when motion is allowed, and removes it again if
// this module never initialises, so nothing stays hidden if JS or the observer fails.

declare global {
  interface Window {
    __revealReady?: boolean
  }
}

let observer: IntersectionObserver | null = null

export function initReveal() {
  if (observer || typeof window === 'undefined') return observer
  if (!('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('motion')
    return null
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.revealed = 'true'
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  )
  window.__revealReady = true
  return observer
}

/** Attach to any element with a `data-reveal` attribute. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = initReveal()
    if (!io) {
      el.dataset.revealed = 'true'
      return
    }
    io.observe(el)
    return () => io.unobserve(el)
  }, [])
  return ref
}

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduce, setReduce] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(query)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}
