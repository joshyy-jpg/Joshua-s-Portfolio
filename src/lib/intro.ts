// Initials emerge from the koi, then the mark becomes the header lockup.
const landing = typeof window !== 'undefined' ? window.location.pathname : ''
let played = false
const root = () => document.documentElement
// Stretch the whole sequence together so each handoff stays synchronized.
const INTRO_PACE = 1.45
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
  const clones: HTMLElement[] = []
  const events = ['wheel', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'hashchange', 'resize'] as const
  const cleanup = () => {
    events.forEach(event => window.removeEventListener(event, finish))
    timers.forEach(window.clearTimeout)
    animations.forEach(animation => animation.cancel())
    clones.forEach(element => element.remove())
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
    const animation = el.animate(frames, { duration: duration * INTRO_PACE, delay: delay * INTRO_PACE, fill: 'both', easing })
    animations.push(animation)
    return animation
  }
  Promise.race([document.fonts.ready, new Promise(resolve => timers.push(window.setTimeout(resolve, 500)))]).then(() => {
    if (ended) return
    if (window.scrollY > 40 || window.location.hash || window.location.pathname !== '/') { finish(); return }
    root().classList.remove('intro-wait')
    const heading = graphic.querySelector<HTMLElement>('.zen-name')!
    const mark = overlay.querySelector<HTMLElement>('.intro-mark')!
    const cx = window.innerWidth / 2, cy = window.innerHeight * .4
    const mw = mark.offsetWidth, mh = mark.offsetHeight
    const translate = (x: number, y: number) => `translate(${x}px, ${y}px)`
    const headerMark = document.querySelector<HTMLElement>('.site-header--home .header-mark img')!
    const headerInitials = document.querySelector<HTMLElement>('.site-header--home .header-initials')!
    const target = headerMark.getBoundingClientRect()
    const start = translate(cx - mw / 2, cy - mh / 2)
    mark.style.transformOrigin = '0 0'
    mark.style.transform = start
    for (const [letter, direction] of [['J', -1], ['L', 1]] as const) {
      const initial = document.createElement('span')
      initial.className = 'intro-letter'
      initial.textContent = letter
      overlay.appendChild(initial)
      clones.push(initial)
      const x = cx - initial.offsetWidth / 2
      const y = cy - initial.offsetHeight / 2
      const out = x + direction * (mw / 2 + initial.offsetWidth / 2 + 20)
      animate(initial, [
        { offset: 0, opacity: 0, transform: translate(x, y), easing: 'cubic-bezier(.22,1,.36,1)' },
        { offset: .395, opacity: 1, transform: translate(out, y) },
        { offset: .802, opacity: 1, transform: translate(out, y) },
        { offset: 1, opacity: 0, transform: translate(out, y) },
      ], 1700, 300, 'linear')
    }
    animate(mark, [
      { transform: start },
      { transform: `${translate(target.left, target.top)} scale(${target.width / mw}, ${target.height / mh})` },
    ], 500, 2000, 'cubic-bezier(.65,0,.35,1)')
    const initials = headerInitials.cloneNode(true) as HTMLElement
    const bounds = headerInitials.getBoundingClientRect()
    Object.assign(initials.style, {
      position: 'absolute', left: `${bounds.left}px`, top: `${bounds.top}px`,
      margin: '0', width: `${bounds.width}px`, height: `${bounds.height}px`,
    })
    overlay.appendChild(initials)
    clones.push(initials)
    animate(initials, [
      { opacity: 0, clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-12px)' },
      { opacity: 1, clipPath: 'inset(0)', transform: 'translateX(0)' },
    ], 450, 2500)
    animate(overlay, [{ backgroundColor: '#080808' }, { backgroundColor: 'transparent' }], 450, 2250)
    animate(graphic, [{ clipPath: 'inset(0)' }, { clipPath: 'inset(0)' }], 3550)
    animate(heading, [{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'translateY(0)' }], 400, 2550)
    const highlight = heading.querySelector<HTMLElement>('.zen-name-red')!
    animate(highlight, [
      { offset: 0, visibility: 'visible', clipPath: 'inset(0 100% 0 0)' },
      { offset: .45, visibility: 'visible', clipPath: 'inset(0 0 0 0)' },
      { offset: .65, visibility: 'visible', clipPath: 'inset(0 0 0 0)' },
      { offset: 1, visibility: 'visible', clipPath: 'inset(0 0 0 100%)' },
    ], 650, 2700, 'cubic-bezier(.65,0,.35,1)')
    const roles = graphic.querySelector<HTMLElement>('.zen-roles')!
    const buttons = graphic.querySelector<HTMLElement>('.zen-ctas')!
    for (const [el, delay] of [[roles, 2780], [buttons, 2880]] as const) {
      animate(el, [{ opacity: 0, transform: 'translateY(-18px)' }, { opacity: 1, transform: 'translateY(0)' }], 350, delay)
    }
    timers.push(window.setTimeout(onReveal, 2250 * INTRO_PACE))
    timers.push(window.setTimeout(finish, 3550 * INTRO_PACE))
  })
  return () => { ended = true; cleanup() }
}
