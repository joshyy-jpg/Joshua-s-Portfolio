import type { Role } from '../content/people'
import { about, aboutPhotoGroups, education, experience, leadership, skills } from '../content/people'
import { resumeLink } from '../content/site'
import { Link } from 'react-router-dom'
import Lines from '../components/Lines'
import Picture from '../components/Picture'
import Reveal from '../components/Reveal'
import SmartLink from '../components/SmartLink'
import { useDocumentTitle } from '../lib/useDocumentTitle'

function RoleList({ roles }: { roles: Role[] }) {
  return (
    <ol className="roles">
      {roles.map((r) => (
        <Reveal as="li" className="role" key={r.org + r.role}>
          <div className="role-head">
            <h3 className="role-org">{r.org}</h3>
            <p className="role-title">{r.role}</p>
            <p className="role-date">
              {r.dates}
              {r.location && <span className="role-loc"> · {r.location}</span>}
            </p>
          </div>
          {r.points.length > 0 && (
            <ul className="role-points">
              {r.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          )}
          {r.photo && (
            <figure className="role-photo">
              <Picture {...r.photo} sizes="(min-width: 768px) 70vw, 100vw" />
              <figcaption className="meta">{r.photo.caption}</figcaption>
            </figure>
          )}
          {r.project && (
            <Link to={`/work/${r.project}`} className="link role-link">
              Case study
            </Link>
          )}
        </Reveal>
      ))}
    </ol>
  )
}

function PhotoGroup({ index }: { index: number }) {
  return (
    <section className="about-photo-mix" id={index === 1 ? 'competitions' : 'life'} aria-label="Travel, people, and moments">
      {aboutPhotoGroups[index].map((photo, i) => (
        <Reveal as="figure" className={`about-moment about-moment-${i + 1}`} key={photo.src}>
          <Picture {...photo} sizes="(min-width: 768px) 40vw, 100vw" />
          <figcaption className="meta">{photo.caption}</figcaption>
        </Reveal>
      ))}
    </section>
  )
}

export default function About() {
  useDocumentTitle('About — Joshua Lee')
  return (
    <div className="about-page">
      <header className="page-head grid" data-dock-after>
        <p className="label">About</p>
        <Lines as="h1" intro className="page-title" lines={['My story']} />
      </header>

      <section id="story" className="story grid" aria-label="My story">
        <Reveal as="figure" className="story-portrait">
          <Picture {...about.portrait} priority sizes="(min-width: 1024px) 25vw, 70vw" />
          <figcaption className="meta">Joshua Lee, New York</figcaption>
        </Reveal>
        <div className="story-text">
          <Reveal as="p" className="lead-serif story-lead">
            {about.lead}
          </Reveal>
          <div className="story-body">
            {about.body.map((p, i) => (
              <Reveal as="p" key={i} className="body-text" delay={i * 60}>
                {p}
              </Reveal>
            ))}
          </div>
          <dl className="story-facts">
            {about.facts.map((f) => (
              <Reveal className="fact-row" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <PhotoGroup index={0} />

      <section id="experience" className="experience grid" aria-labelledby="experience-title">
        <div className="experience-side">
          <h2 id="experience-title" className="label">
            Experience
          </h2>
          <p className="inline-links">
            <SmartLink {...resumeLink} className="link">
              Résumé (PDF)
            </SmartLink>
          </p>
        </div>
        <div className="experience-main">
          <RoleList roles={experience} />
        </div>
      </section>

      <section className="experience grid" aria-labelledby="leadership-title">
        <div className="experience-side">
          <h2 id="leadership-title" className="label">
            Leadership
          </h2>
        </div>
        <div className="experience-main">
          <RoleList roles={leadership} />
        </div>
      </section>

      <PhotoGroup index={1} />

      <section className="experience grid" aria-labelledby="education-title">
        <div className="experience-side">
          <h2 id="education-title" className="label">
            Education & skills
          </h2>
        </div>
        <div className="experience-main">
          <Reveal className="role">
            <div className="role-head">
              <h3 className="role-org">{education.school}</h3>
              <p className="role-title">{education.degree}</p>
              <p className="role-date">{education.dates}</p>
            </div>
            <p className="role-points role-plain">{education.detail}</p>
          </Reveal>
          <dl className="story-facts skills">
            {skills.map((s) => (
              <Reveal className="fact-row" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
