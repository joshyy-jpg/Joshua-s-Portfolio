import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'
import type { VideoMedia } from '../content/projects'
import Picture from './Picture'
import PlayPause from './PlayPause'

/** Muted demo that plays only while in view, with a visible pause control and a still fallback. */
export default function DemoVideo({ media }: { media: VideoMedia }) {
  const explicitPoster = /\.(png|jpe?g|webp)$/i.test(media.poster)
  const ref = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video || failed || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce && !userPaused.current) {
          video.play().catch(() => setPlaying(false))
        } else if (!entry.isIntersecting) {
          video.pause()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [reduce, failed])

  if (failed && explicitPoster) return <img src={media.poster} alt={media.alt} width={media.width} height={media.height} className="media-img" />

  if (failed) {
    return (
      <Picture src={media.poster} alt={media.alt} width={media.width} height={media.height} className="media-img" />
    )
  }

  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      userPaused.current = false
      video.play().catch(() => setFailed(true))
    } else {
      userPaused.current = true
      video.pause()
    }
  }

  return (
    <div className="video">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={explicitPoster ? media.poster : `${media.poster}.jpg`}
        width={media.width}
        height={media.height}
        aria-label={media.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={media.src} type={media.src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} onError={() => setFailed(true)} />
      </video>
      <PlayPause playing={playing} onToggle={toggle} label="demo video" />
    </div>
  )
}
