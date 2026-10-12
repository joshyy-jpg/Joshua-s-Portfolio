import { Link } from 'react-router-dom'
import { projects } from '../content/projects'
import { selectedWork } from '../content/site'
import Lines from '../components/Lines'
import { ProjectLogo } from '../components/Logos'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function WorkIndex() {
  useDocumentTitle('All projects — Joshua Lee')
  return (
    <div className="index-page">
      <header className="page-head grid" data-dock-after>
        <p className="label">Work</p>
        <Lines as="h1" intro className="page-title" lines={['All projects']} />
        <Lines as="p" intro delay={200} className="page-lead" lines={selectedWork.lines} />
      </header>

      <ol className="index-list">
        <li className="index-row index-row-head grid" aria-hidden="true">
          <span className="index-title">Project</span>
          <span className="index-role">Role</span>
          <span className="index-status">Status</span>
          <span className="index-year">Type</span>
        </li>
        {projects.map((p) => (
          <Reveal as="li" key={p.slug}>
            <Link to={`/work/${p.slug}`} className="index-row grid">
              <span className="index-thumb" aria-hidden="true">
                <ProjectLogo name={p.logo} />
              </span>
              <span className="index-title">
                {p.title}
                {p.subtitle && <em> — {p.subtitle}</em>}
                <span className="index-desc">{p.description}</span>
              </span>
              <span className="index-role">
                <span className="index-key">{p.slug === 'hp-tech-ventures' ? 'Focus ' : 'Role '}</span>
                {p.role}
              </span>
              <span className="index-status">
                <span className="index-key">Status </span>
                {p.status}
              </span>
              <span className="index-year">
                {p.year}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
