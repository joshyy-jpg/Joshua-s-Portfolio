/** Icon-only play/pause toggle. The accessible label says what pressing it will do. */
export default function PlayPause({
  playing,
  onToggle,
  label,
  className = '',
}: {
  playing: boolean
  onToggle: () => void
  /** What is playing, e.g. "background animation". */
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      className={`playpause ${className}`}
      onClick={onToggle}
      aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {playing ? (
          <>
            <rect x="5" y="3.5" width="5" height="17" rx="1" />
            <rect x="14" y="3.5" width="5" height="17" rx="1" />
          </>
        ) : (
          <path d="M6.5 3.2v17.6a.8.8 0 0 0 1.2.7l13.6-8.8a.8.8 0 0 0 0-1.4L7.7 2.5a.8.8 0 0 0-1.2.7Z" />
        )}
      </svg>
    </button>
  )
}
