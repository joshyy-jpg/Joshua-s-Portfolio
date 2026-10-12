import { useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { getProject, homeGrid, kindLabel } from '../content/projects'
import { perspective, recent, resumeLink, selectedWork, site, webDev } from '../content/site'
import { experience } from '../content/people'
import RealKoi from '../components/RealKoi'
import DemoVideo from '../components/DemoVideo'
import Lines from '../components/Lines'
import { KOI_SRC, LogoMark, ProjectLogo } from '../components/Logos'
import { Glyph } from '../components/Marks'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import SmartLink from '../components/SmartLink'
import { markIntroDone, runIntro, shouldPlayIntro } from '../lib/intro'
import { usePrefersReducedMotion } from '../lib/motion'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Sweep = 'in' | 'out'

/**
 * On hover a red box sweeps in behind the name from left to right; when the pointer
 * leaves it clears from left to right. A sweep always finishes before the next starts.
 */
function HeroName() {
  const red = useRef<HTMLSpanElement>(null)
  const sweep = useRef({ shown: 'out' as Sweep, want: 'out' as Sweep, busy: false, anim: null as Animation | null })
  const reduce = usePrefersReducedMotion()

  const run = (dir: Sweep) => {
    const s = sweep.current
    s.want = dir
    const el = red.current
    if (!el || s.busy || s.shown === dir) return
    s.busy = true
    s.anim?.cancel()
    const frames =
      dir === 'in'
        ? [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }]
        : [{ clipPath: 'inset(0 0 0 0%)' }, { clipPath: 'inset(0 0 0 100%)' }]
    s.anim = el.animate(frames, { duration: reduce ? 0 : 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' })
    s.anim.finished.then(
      () => {
        s.shown = dir
        s.busy = false
        if (s.want !== dir) run(s.want)
      },
      () => {
        s.busy = false
      },
    )
  }

  return (
    <h1 id="hero-title" className="zen-name" onPointerEnter={() => run('in')} onPointerLeave={() => run('out')}>
      <Link to="/about" aria-label="About Joshua Lee" style={{ cursor: 'pointer' }} onFocus={() => run('in')} onBlur={() => run('out')}>
      Joshua Lee.
      <span ref={red} className="zen-name-red" aria-hidden="true">
        Joshua Lee.
      </span>
      </Link>
    </h1>
  )
}

function Hero() {
  const [intro, setIntro] = useState(shouldPlayIntro)
  const [fishActive, setFishActive] = useState(!intro)
  const overlay = useRef<HTMLDivElement>(null)
  const graphic = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!intro || !overlay.current || !graphic.current) {
      markIntroDone()
      return
    }
    return runIntro({ overlay: overlay.current, graphic: graphic.current, onReveal: () => setFishActive(true), onDone: () => { setFishActive(true); setIntro(false) } })
    // Only run on this mount; navigation back to home does not replay it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="hero zen-hero" aria-labelledby="hero-title" data-dock-after>
      <div className="zen-stage" ref={graphic}>
        <RealKoi active={fishActive} enter={intro} />
        <div className="zen-copy">
          <HeroName />
          <p className="zen-roles">
            Product <span aria-hidden="true">·</span> Design <span aria-hidden="true">·</span> Strategy
          </p>
          <p className="zen-ctas">
            <SmartLink to="#work" className="pill rivets zen-btn zen-btn-primary">
              View work <span aria-hidden="true">↓</span>
            </SmartLink>
            <SmartLink {...resumeLink} className="pill rivets zen-btn">
              Résumé <span aria-hidden="true">↗</span>
            </SmartLink>
            <SmartLink to="#start-project" className="pill rivets zen-btn">
              Need a website? <span aria-hidden="true">→</span>
            </SmartLink>
          </p>
        </div>
      </div>
      {intro && <div className="intro" ref={overlay} aria-hidden="true">
        <span className="intro-letter intro-j">J</span>
        <span className="intro-mark"><span className="intro-mark-disc" /><img src={KOI_SRC} alt="" draggable={false} /></span>
        <span className="intro-letter intro-l">L</span>
      </div>}
    </section>
  )
}

function Perspective() {
  return (
    <section className="perspective" aria-label="Perspective">
      {perspective.slice(0, 2).map((block, i) => (
        <div className="persp" key={i}>
          <span className="persp-mark" aria-hidden="true" />
          <Lines as="p" className="persp-text" lines={block.lines} mobileLines={block.mobile} />
          <span className="persp-mark" aria-hidden="true" />
        </div>
      ))}
      <div className="perspective-action">
        <Link to="/about" className="pill pill-dark rivets">More about me <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

/** Six logo tiles. On pointer devices a small light-blue preview of the hovered project follows the cursor. */
function WorkGrid() {
  return (
    <div className="work-grid">
      {homeGrid.map(({ slug }, i) => {
        const p = getProject(slug)!
        const demo = p.hero.find(media => media.kind === 'video')
        return (
          <Reveal as="article" className="tile" key={slug} delay={(i % 3) * 70}>
            {demo && <div className={`tile-plate tile-demo${p.slug === 'loop' ? ' tile-demo-loop' : ''}`}>
              <DemoVideo media={demo} />
            </div>}
            <Link
              to={`/work/${p.slug}`}
              className="tile-link"
            >
              {!demo && <span className="tile-plate">
                <ProjectLogo name={p.logo} />
              </span>}
              <span className="tile-caption">
                <span className="tile-title">
                  {p.title}
                  <span className="sr-only">, {kindLabel(p).toLowerCase()}.</span>
                </span>
                <span className="tile-description">{p.description}</span>
                <span className="tile-role">{p.role}</span>
                <span className="tile-status">{p.status}</span>
              </span>
            </Link>
          </Reveal>
        )
      })}

    </div>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="section-meta grid">
        <p className="micro">
          {selectedWork.aside[0]}
          <br />
          {selectedWork.aside[1]}
        </p>
        <p className="section-meta-label">
          <Glyph shape="square" /> Work
        </p>
        <p className="section-meta-range">
          <Glyph shape="triangle" /> {selectedWork.range}
        </p>
      </div>

      <div className="work-head grid">
        <h2 id="work-title" className="split-title">
          <em>Selected works</em>
          <span className="split-sub">
            {selectedWork.lines[0]}
            <br />
            {selectedWork.lines[1]}
          </span>
        </h2>
        <Link to="/work" className="pill pill-light rivets work-all-top">
          All projects <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <WorkGrid />


    </section>
  )
}

/** Résumé on the homepage: one row per role, details open in place. */
function ProfessionalExperience() {
  return (
    <section id="resume" className="resume" aria-labelledby="resume-title">
      <div className="section-meta grid">
        <p className="micro">
          Résumé
          <br />
          Sep 2026
        </p>
        <p className="section-meta-label">
          <Glyph shape="circle" /> Experience
        </p>
        <p className="section-meta-range">
          <Glyph shape="triangle" /> 2024 — Now
        </p>
      </div>
      <div className="resume-head grid">
        <h2 id="resume-title" className="split-title">
          <em>Professional experience</em>
          <span className="split-sub">
            Roles, internships and client work.
            <br />
            Open a row for details.
          </span>
        </h2>
      </div>
      <ol className="resume-list">
        {experience.map((r, i) => {
          const head = (
            <>
              <span className="resume-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="resume-org">{r.org}</span>
              <span className="resume-role">{r.role}</span>
              <span className="resume-date">{r.dates}</span>
            </>
          )
          return (
            <Reveal as="li" key={r.org + r.role}>
              {r.points.length ? (
                <details className="resume-row">
                  <summary>
                    {head}
                    <span className="resume-toggle" aria-hidden="true" />
                  </summary>
                  <div className="resume-body">
                    {r.location && <p className="resume-loc">{r.location}</p>}
                    <ul>
                      {r.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    {r.project && (
                      <Link to={`/work/${r.project}`} className="link resume-link">
                        Case study
                      </Link>
                    )}
                  </div>
                </details>
              ) : (
                <div className="resume-row resume-row-static">
                  <div className="resume-summary">{head}</div>
                </div>
              )}
            </Reveal>
          )
        })}
      </ol>
      <p className="resume-actions">
        <SmartLink {...resumeLink} className="pill pill-dark rivets">
          Download résumé <span aria-hidden="true">↗</span>
        </SmartLink>
        <Link to="/about#experience" className="pill pill-light rivets">
          Leadership &amp; education <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  )
}

/** Website development: three slides with a tilted pass graphic, then a project form. */
function WebsiteDevelopment() {
  const slides = webDev.slides
  const [index, setIndex] = useState(0)
  const count = slides.length
  const go = (n: number) => setIndex((n + count) % count)
  const slide = slides[index]

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }

  return (
    <section id="websites" className="webdev" aria-labelledby="webdev-title">
      <div className="section-meta grid">
        <p className="micro">
          {webDev.aside[0]}
          <br />
          {webDev.aside[1]}
        </p>
        <p className="section-meta-label">
          <Glyph shape="square" /> Websites
        </p>
        <p className="section-meta-range">
          <Glyph shape="triangle" /> {webDev.status}
        </p>
      </div>
      <h2 id="webdev-title" className="sr-only">
        Website development
      </h2>

      <div className="offer" aria-roledescription="carousel" aria-label="Website development" onKeyDown={onKey}>
        <span className="offer-dot offer-dot-tl" aria-hidden="true" />
        <span className="offer-dot offer-dot-tc" aria-hidden="true" />
        <span className="offer-dot offer-dot-tr" aria-hidden="true" />

        <div className="offer-controls">
          <button type="button" className="offer-arrow" onClick={() => go(index - 1)} aria-label="Previous slide">
            ←
          </button>
          <p className="offer-count" aria-live="polite">
            <Glyph shape="triangle" /> {index + 1} / {count}
          </p>
          <button type="button" className="offer-arrow" onClick={() => go(index + 1)} aria-label="Next slide">
            →
          </button>
        </div>

        <div className="offer-body" key={index}>
          <div className="offer-graphic origami-graphic">
            <img src="/media/origami-cutout.webp" alt="Red folded-paper samurai and origami crane facing diagonally left, seen in three-quarter perspective." width="1536" height="1024" loading="lazy" />
          </div>
          <div className="offer-text" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`}>
            <span className="offer-mark offer-mark-l" aria-hidden="true" />
            <h3 className="offer-title">{slide.title}</h3>
            <p className="offer-copy">{slide.copy}</p>
            <SmartLink {...slide.link} className="pill pill-dark rivets">
              {slide.link.label} <span aria-hidden="true">{slide.link.href ? '↗' : '→'}</span>
            </SmartLink>
            <span className="offer-mark offer-mark-r" aria-hidden="true" />
          </div>
        </div>
      </div>

      <ProjectContact />
    </section>
  )
}

type SendState = 'idle' | 'sending' | 'sent' | 'error'

const sendNote: Record<SendState, string> = {
  idle: 'I’ll reply by email, usually within a couple of days. ',
  sending: 'Sending… ',
  sent: 'Thanks, your note is on its way. I’ll reply by email soon. ',
  error: 'That didn’t send. ',
}

/**
 * Website enquiry, submitted to Netlify Forms. The matching static form in index.html
 * is what Netlify detects at deploy time; field names here must match it.
 */
function ProjectContact() {
  const [state, setState] = useState<SendState>('idle')
  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const business = String(data.get('business') ?? '').trim()
    data.set('subject', `${webDev.form.subject} — ${business || name}`)
    setState('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <div id="start-project" className="project grid">
      <h3 className="split-title project-title">
        <em>Start</em> {webDev.form.title}
        <span className="split-sub">{webDev.form.lead}</span>
      </h3>
      <form className="project-form" name="website-project" onSubmit={send}>
        <input type="hidden" name="form-name" value="website-project" />
        <p hidden>
          <label>
            Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <label className="input-field">
          <span>Your name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className="input-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="input-field input-field-wide">
          <span>Business</span>
          <input name="business" autoComplete="organization" />
        </label>
        <label className="input-field input-field-wide">
          <span>What does the site need to do?</span>
          <textarea name="message" rows={4} required />
        </label>
        <div className="project-actions">
          <button type="submit" className="pill pill-dark rivets" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Send'} <span aria-hidden="true">→</span>
          </button>
          <p className="project-note" aria-live="polite">
            {sendNote[state]}
            {state === 'error' ? 'Please email me directly at ' : 'Or write directly to '}
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(webDev.form.subject)}`} className="link">
              {site.email}
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  )
}

function Recent() {
  return (
    <section className="recent" aria-labelledby="recent-title">
      <div className="recent-head grid">
        <h2 id="recent-title" className="split-title"><em>Recent notes and news</em></h2>
      </div>
      <ul className="recent-grid">
        {recent.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 70}>
            <SmartLink to={item.to} className="recent-card">
              <span className="recent-media">
                {item.image ? (
                  <Picture {...item.image} sizes="(min-width: 1024px) 25vw, 50vw" />
                ) : (
                  <span className="recent-plate">
                    <LogoMark />
                  </span>
                )}
              </span>
              <span className="recent-title">+ {item.title}</span>
              <span className="recent-meta">
                {item.when}
                <br />
                {item.note}
              </span>
            </SmartLink>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default function Home() {
  useDocumentTitle('Joshua Lee — Product, people, and the spaces between')
  return (
    <>
      <Hero />
      <div className="light">
        <SelectedWork />
        <Perspective />
        <ProfessionalExperience />
        <WebsiteDevelopment />
        <Recent />
      </div>
    </>
  )
}
