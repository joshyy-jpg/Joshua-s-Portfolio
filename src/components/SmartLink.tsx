import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { NavLink } from '../content/site'

type Props = Omit<NavLink, 'label'> & {
  children: ReactNode
  className?: string
  onClick?: () => void
}

/** One link component for routes, in-page anchors, files and external URLs. */
export default function SmartLink({ to, href, external, note, children, className, onClick }: Props) {
  const location = useLocation()
  if (href) {
    const newTab = external && !href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
        {(note || newTab) && (
          <span className="sr-only">
            {' '}({[note, newTab ? 'opens in a new tab' : null].filter(Boolean).join(', ')})
          </span>
        )}
      </a>
    )
  }
  const dest = to!.startsWith('#') ? { pathname: location.pathname, hash: to } : to!
  return (
    <Link to={dest} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
