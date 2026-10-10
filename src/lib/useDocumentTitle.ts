import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../content/site'

/** Sets the tab title and points the canonical link at this route on the production domain. */
export function useDocumentTitle(title: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = site.url + pathname
  }, [title, pathname])
}
