// Initials settle into the actual heading, then the rest of the name unfolds.
const landing = typeof window !== 'undefined' ? window.location.pathname : ''
let played = false
const root = () => document.documentElement
export function shouldPlayIntro() {
  return !played && landing === '/' && window.location.pathname === '/' &&
    !window.location.hash && window.scrollY < 40 && root().classList.contains('motion') &&
    typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function'
}
export function markIntroDone() {
  root().classList.remove('intro-running', 'intro-wait')
  root().classList.add('intro-done')
}
type Parts = { overlay: HTMLElement; graphic: HTMLElement; onReveal: () => void; onDone: () => void }
export function runIntro({ overlay, graphic, onReveal, onDone }: Parts): () => void {
  played = true
  let ended = false
  const animations: Animation[] = []
  const timers: number[] = []
  const events = ['wheel', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'hashchange', 'resize'] as const
  const cleanup = () => {
    events.forEach(event => window.removeEventListener(event, finish))
    timers.forEach(window.clearTimeout)
    animations.forEach(animation => animation.cancel())
    markIntroDone()
  }
  const finish = () => {
    if (ended) return
    ended = true
    cleanup()
    onReveal()
    onDone()
  }
  if (window.location.pathname !== '/' || window.location.hash || window.scrollY > 40) {
    finish()
    return () => {}
  }
  root().classList.remove('intro-done')
  root().classList.add('intro-running', 'intro-wait')
  events.forEach(event => window.addEventListener(event, finish, { passive: true }))
  const animate = (el: Element, frames: Keyframe[], duration: number, delay = 0) => {
    const animation = el.animate(frames, { duration, delay, fill: 'both', easing: 'cubic-bezier(.22,1,.36,1)' })
    animations.push(animation)
    return animation
  }
  Promise.race([document.fonts.ready, new Promise(resolve => timers.push(window.setTimeout(resolve, 500)))]).then(() => {
    if (ended) return
    if (window.scrollY > 40 || window.location.hash || window.location.pathname !== '/') { finish(); return }
    root().classList.remove('intro-wait')
    const heading = graphic.querySelector<HTMLElement>('.zen-name')!
    const style = getComputedStyle(heading)
    const mark = overlay.querySelector<HTMLElement>('.intro-mark')!
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2
    const mw = mark.offsetWidth, mh = mark.offsetHeight
    const translate = (x: number, y: number) => `translate(${x}px, ${y}px)`
    // Hold the mark at one scale and dissolve in place. No zoom or fly-through.
    mark.style.transform = translate(cx - mw / 2, cy - mh / 2)
    animate(mark, [{ opacity: 1 }, { opacity: 0 }], 650, 1350)
    animate(overlay, [{ backgroundColor: '#080808' }, { backgroundColor: 'transparent' }], 700, 1250)
    animate(graphic, [{ clipPath: 'inset(0)' }, { clipPath: 'inset(0)' }], 2900)
    for (const initial of ['j', 'l']) {
      const el = overlay.querySelector<HTMLElement>(`.intro-${initial}`)!
      const target = graphic.querySelector<HTMLElement>(`.hero-initial-${initial}`)!
      Object.assign(el.style, { fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight,
        lineHeight: style.lineHeight, letterSpacing: style.letterSpacing, padding: '0', color: style.color })
      const rect = target.getBoundingClientRect()
      const w = el.offsetWidth, h = el.offsetHeight
      const side = initial === 'j' ? cx - mw / 2 - w - 16 : cx + mw / 2 + 16
      animate(el, [
        { offset: 0, opacity: 0, transform: translate(cx - w / 2, cy - h / 2) },
        { offset: .16, opacity: 0, transform: translate(cx - w / 2, cy - h / 2) },
        { offset: .42, opacity: 1, transform: translate(side, cy - h / 2) },
        { offset: .57, opacity: 1, transform: translate(side, cy - h / 2) },
        { offset: 1, opacity: 1, transform: translate(rect.left, rect.top) },
      ], 2050)
      animate(target, [{ opacity: 0 }, { opacity: 0 }], 2050)
    }
    graphic.querySelectorAll('.hero-name-tail').forEach((tail, i) => {
      animate(tail, [{ transform: 'translateX(-105%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], 700, 2050 + i * 100)
    })
    // Hand off the identical glyphs at the same position before revealing the suffixes.
    timers.push(window.setTimeout(() => {
      overlay.querySelectorAll<HTMLElement>('.intro-letter').forEach(el => { el.style.visibility = 'hidden' })
      graphic.querySelectorAll('.hero-initial').forEach(el => el.getAnimations().forEach(a => a.cancel()))
    }, 2050))
    timers.push(window.setTimeout(onReveal, 1300))
    timers.push(window.setTimeout(finish, 2900))
  })
  return () => { ended = true; cleanup() }
}
