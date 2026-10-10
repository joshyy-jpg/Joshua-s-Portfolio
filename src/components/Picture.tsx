type Props = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  priority?: boolean
  position?: string
}

/** WebP with a JPEG fallback. `src` has no extension. */
export default function Picture({ src, alt, width, height, className, sizes, priority, position }: Props) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${src}.webp`} sizes={sizes} />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  )
}
