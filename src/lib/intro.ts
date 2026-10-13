// Opening sequence, played when someone lands on the homepage:
//   1. black screen
//   2. the koi mark holds in the middle on black
//   3. J slides out from behind it to the left, L to the right
//   4. the J · koi · L group moves to the bottom left, then spreads across the bottom
//   5. the hero fades in at its final size
//   6. The mark returns to center and dissolves into the living koi.
// The hero underneath is already in its final state, so if anything fails the page is
// simply there. Any key, click, wheel or touch skips straight to the end.

const EASE_MOVE = 'cubic-bezier(0.76, 0, 0.24, 1)'
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_IN = 'cubic-bezier(0.55, 0, 0.75, 0.2)'
const D = 3600 // The choreography below is written on a 4.1s timeline and scaled to this length.

const landing = typeof window !== 'undefined' ? window.location.pathname : ''
let played = false

const root = () => document.documentElement

/** True only on the first render of the homepage when it was the page the visitor landed on. */
export function shouldPlayIntro() {
  return (
    !played &&
    landing === '/' &&
    window.location.pathname === '/' &&
    !window.location.hash &&
    window.scrollY < 40 &&
    root().classList.contains('motion') &&
    typeof Element !== 'undefined' &&
    typeof Element.prototype.animate === 'function'
  )
}

export function markIntroDone() {
  root().classList.remove('intro-running', 'intro-wait')
  root().classList.add('intro-done')
}

type Parts = {
  overlay: HTMLElement
  graphic: HTMLElement
  onReveal: () => void
  onDone: () => void
}

const at = (ms: number) => Math.min(1, Math.max(0, ms / 4100))
const move = (x: number, y: number, w: number, h: number, s = 1, r = 0) =>
  `translate(${x - w / 2}px, ${y - h / 2}px) scale(${s}) rotate(${r}deg)`

export function runIntro({ overlay, graphic, onReveal, onDone }: Parts): () => void {
  played = true
  const initialBounds = graphic.getBoundingClientRect()
  if (window.location.hash || window.scrollY > 40 || initialBounds.bottom <= 0) {
    markIntroDone()
    onReveal()
    onDone()
    return () => {}
  }
  const r = root()
  r.classList.remove('intro-done')
  r.classList.add('intro-running', 'intro-wait')

  let cancelled = false
  let stop: () => void = () => {}

  const ready = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((res) => window.setTimeout(res, 150)),
  ])
  ready.then(() => {
    if (cancelled) return
    r.classList.remove('intro-wait')
    stop = play(overlay, graphic, onReveal, () => {
      markIntroDone()
      onDone()
    })
  })

  return () => {
    cancelled = true
    stop()
    markIntroDone()
  }
}

function play(overlay: HTMLElement, graphic: HTMLElement, reveal: () => void, done: () => void): () => void {
  const J = overlay.querySelector<HTMLElement>('.intro-j')!
  const L = overlay.querySelector<HTMLElement>('.intro-l')!
  const cube = overlay.querySelector<HTMLElement>('.intro-mark')!
  const disc = overlay.querySelector<HTMLElement>('.intro-mark-disc')

  const vw = window.innerWidth
  const vh = window.innerHeight
  const margin = parseFloat(getComputedStyle(root()).getPropertyValue('--margin')) || 24

  // Sizes at scale 1 (set in CSS from the viewport).
  const jw = J.offsetWidth
  const jh = J.offsetHeight
  const lw = L.offsetWidth
  const lh = L.offsetHeight
  const cw = cube.offsetWidth
  const ch = cube.offsetHeight
  const gap = cw * 0.16
  const cx = vw / 2
  const cy = vh / 2

  // Stage: centred lockup
  const jC = cx - cw / 2 - gap - jw / 2
  const lC = cx + cw / 2 + gap + lw / 2

  // Stage: bottom-left group, letters about 11% of the viewport height
  const k = Math.min(1, (vh * 0.12) / ch)
  const by = vh - margin - (ch * k) / 2
  const jBL = margin + (jw * k) / 2
  const cBL = margin + jw * k + gap * k + (cw * k) / 2
  const lBL = cBL + (cw * k) / 2 + gap * k + (lw * k) / 2

  // Stage: spread across the bottom
  const jS = margin + (jw * k) / 2
  const lS = vw - margin - (lw * k) / 2

  // Return to the same center and compact scale as the living koi beneath it.
  const bounds = graphic.getBoundingClientRect()
  const logoX = bounds.left + bounds.width * .5
  const logoY = bounds.top + bounds.height * .39
  const logoS = k // Hold the settled size; dissolve instead of zooming toward the viewer.

  const anims: Animation[] = []
  // Keep the opening black, then expose the expanding page beneath the lockup.
  anims.push(overlay.animate([
    { offset: 0, backgroundColor: '#080808' },
    { offset: at(2900), backgroundColor: '#080808' },
    { offset: at(3900), backgroundColor: 'transparent' },
    { offset: 1, backgroundColor: 'transparent' },
  ], { duration: D, fill: 'forwards' }))
  const cubeFrames: Keyframe[] = [
    { offset: 0, opacity: 1, transform: move(cx, cy, cw, ch) },
    { offset: at(450), opacity: 1, transform: move(cx, cy, cw, ch), easing: EASE_MOVE },
    { offset: at(1250), transform: move(cx, cy, cw, ch, 1, 0), easing: EASE_MOVE },
    { offset: at(1850), transform: move(cBL, by, cw, ch, k), easing: EASE_MOVE },
    { offset: at(2000), transform: move(cBL, by, cw, ch, k), easing: EASE_MOVE },
    { offset: at(2600), transform: move(cx, by, cw, ch, k), easing: EASE_MOVE },
    { offset: at(3150), opacity: 1, transform: move(logoX, logoY, cw, ch, logoS) },
    { offset: at(3350), opacity: 1, transform: move(logoX, logoY, cw, ch, logoS) },
    { offset: 1, opacity: 0, transform: move(logoX, logoY, cw, ch, logoS) },
  ]
  anims.push(cube.animate(cubeFrames, { duration: D, fill: 'forwards' }))

  // The black disc behind the koi hides J and L until they have slid out, then fades.
  if (disc) {
    anims.push(
      disc.animate(
        [
          { offset: 0, opacity: 1 },
          { offset: at(1100), opacity: 1 },
          { offset: at(1300), opacity: 0 },
          { offset: 1, opacity: 0 },
        ],
        { duration: D, fill: 'forwards' },
      ),
    )
  }

  const letter = (el: HTMLElement, w: number, h: number, centre: number, bl: number, spread: number) => {
    anims.push(
      el.animate(
        [
          { offset: 0, opacity: 0, transform: move(cx, cy, w, h) },
          { offset: at(450), opacity: 0, transform: move(cx, cy, w, h) },
          { offset: at(460), opacity: 1, transform: move(cx, cy, w, h), easing: EASE_OUT },
          { offset: at(1100), transform: move(centre, cy, w, h), easing: EASE_MOVE },
          { offset: at(1250), transform: move(centre, cy, w, h), easing: EASE_MOVE },
          { offset: at(1850), transform: move(bl, by, w, h, k), easing: EASE_MOVE },
          { offset: at(2000), transform: move(bl, by, w, h, k), easing: EASE_MOVE },
          { offset: at(2600), transform: move(spread, by, w, h, k), easing: EASE_MOVE },
          { offset: at(3200), opacity: 1, transform: move(spread, by, w, h, k), easing: EASE_IN },
          { offset: at(3600), opacity: 0, transform: move(spread, by + h * k + margin * 2, w, h, k) },
          { offset: 1, opacity: 0, transform: move(spread, by + h * k + margin * 2, w, h, k) },
        ],
        { duration: D, fill: 'forwards' },
      ),
    )
  }
  letter(J, jw, jh, jC, jBL, jS)
  letter(L, lw, lh, lC, lBL, lS)

  // Expose the scene without the old rectangular iris reveal.
  anims.push(graphic.animate([
    { opacity: 0, clipPath: 'inset(0)' },
    { offset: at(3000), opacity: 0, clipPath: 'inset(0)' },
    { offset: 1, opacity: 1, clipPath: 'inset(0)' },
  ], { duration: D, fill: 'forwards' }))
  const revealTimer = window.setTimeout(reveal, D * 2900 / 4100)

  let finished = false
  const complete = () => {
    if (finished) return
    finished = true
    cleanup()
    done()
  }
  const skip = () => anims.forEach((a) => a.finish())
  const events = ['wheel', 'keydown', 'pointerdown', 'touchstart', 'scroll', 'hashchange'] as const
  events.forEach((e) => window.addEventListener(e, skip, { passive: true }))
  const failsafe = window.setTimeout(complete, D + 1500)
  Promise.all(anims.map((a) => a.finished)).then(complete, complete)

  function cleanup() {
    events.forEach((e) => window.removeEventListener(e, skip))
    window.clearTimeout(failsafe)
    window.clearTimeout(revealTimer)
  }
  return () => {
    cleanup()
    anims.forEach((a) => a.cancel())
  }
}
