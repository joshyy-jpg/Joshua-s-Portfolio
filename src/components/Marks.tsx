import type { Glyph as GlyphShape } from '../content/site'

/** Small geometric marker used before navigation group names and section labels. */
export function Glyph({ shape }: { shape: GlyphShape }) {
  return <span className={`glyph glyph-${shape}`} aria-hidden="true" />
}

/** Four small squares framing a block, like registration marks. */
export function Corners() {
  return (
    <span className="corners" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}
