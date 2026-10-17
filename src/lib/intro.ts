// The full name rises beneath the koi, then both dissolve into a quick hero reveal.
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
  let nameClone: HTMLElement | null = null
  const events = ['wheel', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'hashchange', 'resize'] as const
  const cleanup = () => {
    events.forEach(event => window.removeEventListener(event, finish))
    timers.forEach(window.clearTimeout)
    animations.forEach(animation => animation.cancel())
    nameClone?.remove()
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
  const animate = (el: Element, frames: Keyframe[], duration: number, delay = 0, easing = 'cubic-bezier(.22,1,.36,1)') => {
    const animation = el.animate(frames, { duration, delay, fill: 'both', easing })
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
    const cx = window.innerWidth / 2, cy = window.innerHeight * .4
    const mw = mark.offsetWidth, mh = mark.offsetHeight
    const translate = (x: number, y: number) => `translate(${x}px, ${y}px)`
    const destination = heading.getBoundingClientRect()
    const nameLeft = cx - destination.width / 2
    const nameTop = cy + mh / 2 + 26
    nameClone = heading.cloneNode(true) as HTMLElement
    nameClone.removeAttribute('id')
    nameClone.querySelector('.zen-name-red')?.remove()
    nameClone.querySelector('a')?.setAttribute('tabindex', '-1')
    Object.assign(nameClone.style, {
      position: 'absolute', left: `${nameLeft}px`, top: `${nameTop}px`, margin: '0',
      width: `${destination.width}px`, fontSize: style.fontSize, lineHeight: style.lineHeight,
      fontFamily: style.fontFamily, fontWeight: style.fontWeight, letterSpacing: style.letterSpacing,
      color: style.color, visibility: 'hidden',
    })
    overlay.appendChild(nameClone)
    mark.style.transform = translate(cx - mw / 2, cy - mh / 2)
    animate(mark, [{ opacity: 1 }, { opacity: 0 }], 400, 1900)
    animate(overlay, [{ backgroundColor: '#080808' }, { backgroundColor: 'transparent' }], 400, 1900)
    animate(graphic, [{ clipPath: 'inset(0)' }, { clipPath: 'inset(0)' }], 3250)
    animate(heading, [{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'translateY(0)' }], 400, 2200)
    nameClone.style.visibility = 'visible'
    animate(nameClone, [
      { opacity: 0, transform: 'translateY(28px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], 750, 650)
    // Fade the centered lockup, then reveal the real heading without moving it across the page.
    const lockupFade = animate(nameClone, [{ opacity: 1 }, { opacity: 0 }], 400, 1900)
    lockupFade.effect?.updateTiming({ fill: 'forwards' })
    const highlight = heading.querySelector<HTMLElement>('.zen-name-red')!
    animate(highlight, [
      { offset: 0, visibility: 'visible', clipPath: 'inset(0 100% 0 0)' },
      { offset: .45, visibility: 'visible', clipPath: 'inset(0 0 0 0)' },
      { offset: .65, visibility: 'visible', clipPath: 'inset(0 0 0 0)' },
      { offset: 1, visibility: 'visible', clipPath: 'inset(0 0 0 100%)' },
    ], 750, 2350, 'cubic-bezier(.65,0,.35,1)')
    const roles = graphic.querySelector<HTMLElement>('.zen-roles')!
    const buttons = graphic.querySelector<HTMLElement>('.zen-ctas')!
    for (const [el, delay] of [[roles, 2430], [buttons, 2530]] as const) {
      animate(el, [{ opacity: 0, transform: 'translateY(-18px)' }, { opacity: 1, transform: 'translateY(0)' }], 350, delay)
    }
    timers.push(window.setTimeout(onReveal, 1900))
    timers.push(window.setTimeout(finish, 3250))
  })
  return () => { ended = true; cleanup() }
}
