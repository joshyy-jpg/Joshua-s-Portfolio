import { useEffect, useRef } from 'react'
import { contact, emailLink, linkedinLink, resumeLink, site } from '../content/site'
import Lines from './Lines'
import { LogoMark } from './Logos'
import SmartLink from './SmartLink'

/**
 * The name at the foot of every page. The red rises up behind it on hover; on touch
 * screens it rises once the band is fully in view.
 */
function SignatureBand() {
  const band = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = band.current
    if (!el || !window.matchMedia?.('(hover: none)').matches || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => (el.dataset.lit = String(entry.intersectionRatio > 0.9)), {
      threshold: [0, 0.9],
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="signature-band" ref={band} aria-hidden="true">
      <p className="signature">Joshua Lee</p>
      <div className="signature-lit">
        <p className="signature">Joshua Lee</p>
      </div>
    </div>
  )
}

export default function Footer() {
  const toTop = () => {
    window.scrollTo({ top: 0 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }
  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-title">
      <h2 id="contact-title" className="footer-title">
        <Lines as="span" lines={contact.heading} />
      </h2>
      <p className="footer-note">{contact.note}</p>

      <ul className="footer-grid">
        <li className="footer-cell">
          <SmartLink {...emailLink} className="footer-link">
            {site.email} <span aria-hidden="true">→</span>
          </SmartLink>
        </li>
        <li className="footer-cell">
          <SmartLink {...resumeLink} className="footer-link">
            Résumé, PDF <span aria-hidden="true">↗</span>
          </SmartLink>
        </li>
        <li className="footer-cell">
          <SmartLink {...linkedinLink} className="footer-link">
            LinkedIn <span aria-hidden="true">↗</span>
          </SmartLink>
        </li>
        <li className="footer-cell">
          <SmartLink to="/work" className="footer-link">
            All projects <span aria-hidden="true">→</span>
          </SmartLink>
        </li>
      </ul>

      <div className="footer-end" data-dock-hide>
        <span className="footer-mark" aria-hidden="true">
          <LogoMark />
        </span>
        <SignatureBand />
        <div className="footer-bar">
          <p>
            Product, research
            <br />
            &amp; strategy
          </p>
          <p>
            Based in
            <br />
            {site.city}
          </p>
          <p>
            NYU BTM
            <br />
            Class of 2028
          </p>
          <button type="button" className="to-top" onClick={toTop}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
        <p className="footer-copy">© {site.year} Joshua Lee</p>
      </div>
    </footer>
  )
}
