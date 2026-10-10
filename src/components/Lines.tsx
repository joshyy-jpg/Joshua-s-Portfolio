import type { CSSProperties, ElementType } from 'react'
import { useReveal } from '../lib/motion'
import { inline, plain } from '../lib/text'

type Props = {
  lines: string[]
  /** Alternative breaks for narrow screens. */
  mobileLines?: string[]
  as?: ElementType
  className?: string
  /** Animate on load instead of on scroll. */
  intro?: boolean
  /** Extra delay in ms before the first line. */
  delay?: number
  id?: string
}

function LineSet({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={{ '--i': i } as CSSProperties}>{inline(line)}</span>
        </span>
      ))}
    </span>
  )
}

/** Text set in controlled lines with a masked reveal. Screen readers get one plain string. */
export default function Lines({ lines, mobileLines, as: Tag = 'p', className = '', intro, delay, id }: Props) {
  const ref = useReveal<HTMLElement>()
  const style = delay ? ({ '--d': `${delay}ms` } as CSSProperties) : undefined
  return (
    <Tag
      id={id}
      ref={intro ? undefined : ref}
      className={`lines ${intro ? 'is-intro' : ''} ${className}`}
      data-reveal={intro ? undefined : 'lines'}
      style={style}
    >
      <span className="sr-only">{plain(lines.join(' '))}</span>
      {mobileLines ? (
        <>
          <LineSet lines={lines} className="lines-wide" />
          <LineSet lines={mobileLines} className="lines-narrow" />
        </>
      ) : (
        <LineSet lines={lines} />
      )}
    </Tag>
  )
}
