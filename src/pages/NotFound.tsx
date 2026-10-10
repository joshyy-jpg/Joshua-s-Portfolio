import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Not found — Joshua Lee')
  return (
    <div className="page-head grid not-found" data-dock-after>
      <p className="label">404</p>
      <h1 className="page-title">Nothing here.</h1>
      <p className="page-lead">
        That page doesn’t exist. Try the <Link to="/work" className="link">projects</Link> or go{' '}
        <Link to="/" className="link">home</Link>.
      </p>
    </div>
  )
}
