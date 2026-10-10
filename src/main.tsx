import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource-variable/geist'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './styles/global.css'
import './styles/v3.css'
import { initReveal } from './lib/motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import WorkIndex from './pages/WorkIndex'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'
import NotFound from './pages/NotFound'

initReveal()

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work', element: <WorkIndex /> },
      { path: 'work/:slug', element: <CaseStudy /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
