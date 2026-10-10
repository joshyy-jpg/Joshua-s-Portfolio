import type { ReactNode } from 'react'

/** Renders *word* as serif italic emphasis. */
export function inline(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part,
  )
}

export function plain(text: string) {
  return text.replace(/\*/g, '')
}
