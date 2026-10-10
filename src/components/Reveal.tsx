import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../lib/motion'

type Props = { as?: ElementType; className?: string; children: ReactNode; delay?: number; id?: string }

/** Fades and lifts its content into place when scrolled into view. */
export default function Reveal({ as: Tag = 'div', className, children, delay, id }: Props) {
  const ref = useReveal<HTMLElement>()
  const style = delay ? ({ '--d': `${delay}ms` } as CSSProperties) : undefined
  return (
    <Tag ref={ref} id={id} className={className} data-reveal="fade" style={style}>
      {children}
    </Tag>
  )
}
