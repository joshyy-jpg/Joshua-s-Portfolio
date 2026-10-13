// Project logos, drawn in currentColor so every tile reads as one monochrome set.
// Marks for Spotify, HP and Microsoft come from the existing site's logo files;
// Lee-Way and Spot are the existing site's own project icons. Off The Top is the
// stacked logo from the existing site, cut out to white on transparent.

/** Joshua's mark: two koi circling. Transparent PNG, so it sits on black, white and the light-blue dock. */
export const KOI_SRC = '/brand/koi-512.webp'

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={KOI_SRC}
      alt=""
      width={405}
      height={512}
      className={`koi-mark ${className ?? ''}`}
      draggable={false}
      decoding="async"
    />
  )
}

type LogoProps = { className?: string }

function SpotifyLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  )
}

function HPLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.0069 24h-.3572l2.459-6.7453h3.3796c.5907 0 1.2364-.4533 1.4424-1.0166l2.6652-7.3085c.4396-1.1952-.2473-2.1706-1.525-2.1706h-4.6983l-3.929 10.798-2.2255 6.127C3.929 22.434 0 17.6806 0 12.007 0 6.498 3.7092 1.8546 8.7647.4396L6.4705 6.759 2.6514 17.2547h2.5415L8.4488 8.339h1.9095l-3.2558 8.9158H9.644l3.0223-8.3251c.4396-1.1952-.2473-2.1706-1.525-2.1706h-2.143l2.459-6.7453C11.636 0 11.8145 0 11.9931 0 18.6285 0 24 5.3715 24 12.007c.0137 6.6216-5.3578 11.993-11.9931 11.993zM19.2742 8.325h-1.9096l-2.6789 7.336h1.9096l2.6789-7.336z"
      />
    </svg>
  )
}

function MicrosoftLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="currentColor">
        <rect x="0" y="0" width="11.4" height="11.4" />
        <rect x="12.6" y="0" width="11.4" height="11.4" />
        <rect x="0" y="12.6" width="11.4" height="11.4" />
        <rect x="12.6" y="12.6" width="11.4" height="11.4" />
      </g>
    </svg>
  )
}

function LeeWayLogo({ className }: LogoProps) {
  return (
    <svg viewBox="10 10 44 44" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M49.85 25.5A19 19 0 1 1 38.5 14.15" />
        <path d="M32 20.5V32h9" />
      </g>
      <circle cx="45.44" cy="18.56" r="3.4" fill="currentColor" />
    </svg>
  )
}

function SpotLogo({ className }: LogoProps) {
  return (
    <svg viewBox="10 8 44 48" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M32 38c-4-5.4-10-10.6-10-17.6a10 10 0 0 1 20 0c0 7-6 12.2-10 17.6zm0-21.4a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z"
      />
      <path d="M13 43.5q1.5 4 6 4h26q4.5 0 6-4" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="22" cy="51.5" r="2.7" fill="currentColor" />
      <circle cx="42" cy="51.5" r="2.7" fill="currentColor" />
    </svg>
  )
}

function OffTheTopLogo({ className }: LogoProps) {
  return <img src="/logos/off-the-top-stack.png" alt="" className={className} width={376} height={416} draggable={false} />
}

function LoopLogo({ className }: LogoProps) {
  return <span className={`${className ?? ''} loop-wordmark`} aria-hidden="true">loop.</span>
}

function BlueprintLogo({ className }: LogoProps) {
  return <span className={`${className ?? ''} blueprint-wordmark`} aria-hidden="true">Blueprint</span>
}

export type LogoKey = 'blueprint' | 'loop' | 'off-the-top' | 'spotify' | 'lee-way' | 'spot' | 'hp' | 'microsoft'

const logos: Record<LogoKey, (p: LogoProps) => React.JSX.Element> = {
  'off-the-top': OffTheTopLogo,
  loop: LoopLogo,
  blueprint: BlueprintLogo,
  spotify: SpotifyLogo,
  'lee-way': LeeWayLogo,
  spot: SpotLogo,
  hp: HPLogo,
  microsoft: MicrosoftLogo,
}

/** Company/project logo. Off The Top's stacked logo carries its name, so it gets more room than the symbols. */
export function ProjectLogo({ name, className = '' }: { name: LogoKey; className?: string }) {
  const Logo = logos[name]
  const shape = name === 'off-the-top' ? 'logo-stack' : 'logo-symbol'
  return <Logo className={`project-logo ${shape} ${className}`} />
}
