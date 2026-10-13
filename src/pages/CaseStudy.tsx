import { Link, useParams } from 'react-router-dom'
import { getProject, kindLabel, nextProject } from '../content/projects'
import type { Media, Project, Section } from '../content/projects'
import DemoVideo from '../components/DemoVideo'
import { ProjectLogo } from '../components/Logos'
import { Glyph } from '../components/Marks'
import Lines from '../components/Lines'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import NotFound from './NotFound'

function Figure({ media, index, sizes }: { media: Media; index?: string; sizes?: string }) {
  const phone = media.kind === 'image' && media.device === 'phone'
  return (
    <Reveal as="figure" className={`figure ${phone ? 'figure-phone' : ''}`}>
      <div className="figure-frame">
        {media.kind === 'video' ? (
          <DemoVideo media={media} />
        ) : (
          <Picture {...media} sizes={sizes} className="media-img" />
        )}
      </div>
      {(index || media.caption) && (
        <figcaption className="figure-caption">
          {index && <span className="num">{index}</span>}
          {media.caption && <span>{media.caption}</span>}
        </figcaption>
      )}
    </Reveal>
  )
}

function MediaBlock({ items, layout, start, code }: { items: Media[]; layout: string; start: number; code: string }) {
  const sizes = layout === 'full' ? '100vw' : layout === 'pair' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 30vw, 80vw'
  return (
    <div className={`media-block media-${layout} grid`}>
      {items.map((m, i) => (
        <Figure key={m.kind === 'video' ? m.src : m.src + i} media={m} sizes={sizes} index={`${code}—${String(start + i).padStart(4, '0')}`} />
      ))}
    </div>
  )
}

function SectionBlock({ section, n }: { section: Exclude<Section, { type: 'media' } | { type: 'quote' }>; n: number }) {
  const label = (
    <p className="label cs-label">
      <span className="num">({String(n).padStart(2, '0')})</span> {section.label}
    </p>
  )
  const heading = (
    <Lines as="h2" className="cs-heading" lines={[section.heading]} />
  )

  switch (section.type) {
    case 'text':
      return (
        <section className="cs-section grid">
          {label}
          <div className="cs-body">
            {heading}
            {section.body.map((p, i) => (
              <Reveal as="p" key={i} className="body-text">
                {p}
              </Reveal>
            ))}
          </div>
        </section>
      )
    case 'note':
      return (
        <section className="cs-section cs-note grid">
          {label}
          <div className="cs-body">
            {heading}
            {section.body.map((p, i) => (
              <Reveal as="p" key={i} className="body-text">
                {p}
              </Reveal>
            ))}
          </div>
        </section>
      )
    case 'list':
      return (
        <section className="cs-section grid">
          {label}
          <div className="cs-body">
            {heading}
            {section.intro && (
              <Reveal as="p" className="body-text">
                {section.intro}
              </Reveal>
            )}
            <ul className="rule-list">
              {section.items.map((item, i) => (
                <Reveal as="li" key={i}>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )
    case 'decisions':
      return (
        <section className="cs-section grid">
          {label}
          <div className="cs-body cs-body-wide">
            {heading}
            {section.intro && <p className="body-text">{section.intro}</p>}
            <ol className="decisions">
              {section.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={(i % 2) * 80}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )
    case 'evidence':
      return (
        <section className="cs-section grid">
          {label}
          <div className="cs-body cs-body-wide">
            {heading}
            <div className="evidence">
              <Reveal className="evidence-col">
                <h3 className="evidence-head">Observed</h3>
                <ul>
                  {section.observed.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="evidence-col" delay={80}>
                <h3 className="evidence-head">{section.proposedLabel ?? 'Proposed, not measured'}</h3>
                <ul>
                  {section.proposed.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="evidence-col" delay={160}>
                <h3 className="evidence-head">Limitations</h3>
                <ul>
                  {section.limitations.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )
    case 'compare':
      return (
        <section className="cs-section grid">
          {label}
          <div className="cs-body cs-body-wide">
            {heading}
            <ol className="compare">
              {section.rows.map((row) => (
                <Reveal as="li" className="compare-row" key={row.assumed}>
                  <p>
                    <span className="compare-key">Assumed</span>
                    {row.assumed}
                  </p>
                  <p>
                    <span className="compare-key">Learned</span>
                    {row.learned}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )
  }
}

function Body({ project }: { project: Project }) {
  let n = 0
  let fig = project.hero.length + 2
  return (
    <>
      {project.sections.map((section, i) => {
        if (section.type === 'media') {
          const start = fig
          fig += section.items.length
          return <MediaBlock key={i} items={section.items} layout={section.layout} start={start} code={project.code} />
        }
        if (section.type === 'quote') {
          return (
            <Reveal as="figure" key={i} className="cs-quote grid">
              <blockquote>
                <p>“{section.quote}”</p>
              </blockquote>
              <figcaption className="meta">— {section.cite}</figcaption>
            </Reveal>
          )
        }
        n += 1
        return <SectionBlock key={i} section={section} n={n} />
      })}
    </>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project ? `${project.title} — Joshua Lee` : 'Not found — Joshua Lee')
  if (!project) return <NotFound />
  const next = nextProject(project.slug)

  return (
    <article className={`case case-${project.kind}`}>
      <header className="cs-head grid" data-dock-after>
        <p className="cs-crumb">
          <Glyph shape="square" /> {kindLabel(project)} {project.index}
        </p>
        <p className="cs-crumb cs-crumb-right">
          <Glyph shape="triangle" /> {project.year}
        </p>
        <Lines as="h1" intro className="cs-title" lines={[project.title]} />
        {project.subtitle && <Lines as="p" intro delay={200} className="cs-subtitle" lines={[`*${project.subtitle}*`]} />}
        <p className="cs-side micro">
          {project.role}
          <br />
          {project.status}
        </p>
        <p className="cs-summary">{project.summary}</p>
      </header>

      <figure className="cs-plate">
        <figcaption className="cs-plate-bar">
          <span>{project.code}—0001</span>
          {project.external && (
            <a href={project.external.href} target="_blank" rel="noopener noreferrer" className="cs-plate-link">
              {project.external.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </figcaption>
        <div className="cs-plate-logo">
          <ProjectLogo name={project.logo} />
          <span className="sr-only">{project.title} logo</span>
        </div>
      </figure>

      <section className="cs-overview grid" aria-label="Overview">
        <p className="label">Overview</p>
        <dl className="cs-facts">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {project.hero.length > 0 && (
        <div className={`cs-hero media-block grid ${project.hero.length > 1 ? 'media-pair media-plates' : 'media-full'}`}>
          {project.hero.map((m, i) => (
            <Figure
              key={i}
              media={m}
              index={`${project.code}—${String(i + 2).padStart(4, '0')}`}
              sizes={project.hero.length > 1 ? '(min-width: 768px) 50vw, 100vw' : '100vw'}
            />
          ))}
        </div>
      )}

      <Body project={project} />

      {project.external && (
        <section className="cs-live" aria-label="Live site">
          <span className="cs-live-dot" aria-hidden="true" />
          <span className="cs-live-dot" aria-hidden="true" />
          <span className="cs-live-dot" aria-hidden="true" />
          <a href={project.external.href} target="_blank" rel="noopener noreferrer" className="cs-live-link">
            Live site
            <span className="sr-only"> — {project.external.label} (opens in a new tab)</span>
          </a>
          <span className="meta">{project.external.label}</span>
        </section>
      )}

      <nav className="cs-next grid" aria-label="More projects">
        <p className="label">Next</p>
        <Link to={`/work/${next.slug}`} className="cs-next-link">
          <span className="meta">
            {kindLabel(next)} {next.index}
          </span>
          <span className="cs-next-title">
            {next.title}
          </span>
        </Link>
        <Link to="/work" className="link cs-all">
          All projects
        </Link>
      </nav>
    </article>
  )
}
