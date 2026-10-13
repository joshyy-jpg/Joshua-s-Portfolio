// Site-wide copy, links and navigation. Edit here; layout reads from this file.

export type NavLink = {
  label: string
  /** Internal route, e.g. "/about" or "/#work". A bare "#hash" stays on the current page. */
  to?: string
  /** External or file URL. */
  href?: string
  /** Opens in a new tab and announces it to screen readers. */
  external?: boolean
  /** Extra screen-reader context, e.g. "PDF". */
  note?: string
}

export const site = {
  name: 'Joshua Lee',
  /** Production origin, used for canonical links. */
  url: 'https://joshuarlee.com',
  email: 'joshualee@nyu.edu',
  resume: '/Joshua_Lee_Resume.pdf',
  linkedin: 'https://www.linkedin.com/in/joshua-r-lee/',
  city: 'New York',
  timeZone: 'America/New_York',
  year: 2026,
}

export const resumeLink: NavLink = { label: 'Résumé', href: site.resume, external: true, note: 'PDF' }
export const emailLink: NavLink = { label: 'Email', href: `mailto:${site.email}` }
export const linkedinLink: NavLink = { label: 'LinkedIn', href: site.linkedin, external: true }

export const hero = {
  name: 'Joshua Lee.',
  statement: ['Building products at the intersection', 'of technology and culture.'],
  support: 'NYU Business & Technology Management · Class of 2028',
}

export type Glyph = 'square' | 'circle' | 'triangle'

/** Three-group navigation used in the hero. */
export const navGroups: { index: string; glyph: Glyph; label: string; links: NavLink[] }[] = [
  {
    index: '01',
    glyph: 'square',
    label: 'Work',
    links: [
      { label: 'Selected projects', to: '/#work' },
      { label: 'All projects', to: '/work' },
    ],
  },
  {
    index: '02',
    glyph: 'circle',
    label: 'About',
    links: [
      { label: 'My story', to: '/about' },
      { label: 'Experience', to: '/about#experience' },
    ],
  },
  {
    index: '03',
    glyph: 'triangle',
    label: 'Connect',
    links: [emailLink, resumeLink],
  },
]

/** Directory tiles above the dock, in rows of 2, 3 and 3. */
export const directory: NavLink[][] = [
  [
    { label: 'Selected work', to: '/#work' },
    { label: 'All projects', to: '/work' },
  ],
  [
    { label: 'About', to: '/about' },
    { label: 'Experience', to: '/about#experience' },
    { label: 'Contact', to: '#contact' },
  ],
  [resumeLink, linkedinLink, emailLink],
]

/**
 * Part 2 of the opening. `lines` are the desktop line breaks, `mobile` the
 * narrow-screen breaks. Wrap a word in *asterisks* to set it in the serif italic.
 */
export const perspective: { lines: string[]; mobile: string[] }[] = [
  {
    lines: ['I’m interested in why people', '*choose* the products they do.'],
    mobile: ['I’m interested in', 'why people *choose*', 'the products they do.'],
  },
  {
    lines: ['I explore those questions through', 'research, strategy, and *building*.'],
    mobile: ['I explore those', 'questions through', 'research, strategy,', 'and *building*.'],
  },
  {
    lines: ['Here’s what that looks like.'],
    mobile: ['Here’s what that', 'looks like.'],
  },
]

export const selectedWork = {
  label: 'Selected work',
  lines: ['Client work, product concepts,', 'and lessons from building.'],
  range: '2024 — Now',
  aside: ['Clients, concepts', 'and lessons'],
}

/**
 * Website development carousel. Facts come from the résumé (freelance practice, sites built
 * end to end) and the Off The Top case study.
 */
export const webDev = {
  aside: ['Freelance', 'web design'],
  status: 'Open for projects',
  slides: [
    {
      pass: 'Websites',
      title: 'Website development',
      copy: 'Need a website for your business? I design and build sites end to end, from the first layout to launch.',
      link: { label: 'Start a project', to: '#start-project' } as NavLink,
    },
    {
      pass: 'Clients',
      title: 'Built for real businesses',
      copy: 'Like Off The Top, a two-location Queens barbershop: services and prices, reviews and booking in one place.',
      link: { label: 'See the case study', to: '/work/off-the-top' } as NavLink,
    },
    {
      pass: 'Process',
      title: 'Working with me',
      copy: 'I work directly with you to understand what you need, turn it into a clear site, and bring it to life.',
      link: { label: 'Start a project', to: '#start-project' } as NavLink,
    },
  ],
  form: {
    title: 'a website project',
    lead: 'Tell me about your business and what the site needs to do.',
    subject: 'Website project',
  },
}

/** "Recent" row: real moments from the past few months, linked to where they live on the site. */
export const recent: {
  title: string
  when: string
  note: string
  to: string
  image?: { src: string; alt: string; width: number; height: number }
}[] = [
{"title": "NYC Salesforce Product Management", "when": "Spring 2026, NYC", "note": "Blueprint · Dashboardless CRM", "to": "/work/blueprint", "image": {"src": "/media/field-salesforce", "alt": "Case competition participants in front of the NYU PMC case competition screen with Salesforce branding.", "width": 1800, "height": 1200}},
{"title": "IBM × Stern Marketing Society", "when": "Case competition", "note": "Finalist", "to": "/about#competitions", "image": {"src": "/media/field-ibm", "alt": "Five case competition participants in front of the Marketing Society × IBM final-round presentation.", "width": 1024, "height": 768}},
  {
    title: 'VivaTech 2026',
    when: 'Summer 2026, Paris',
    note: 'With Rendez-Vous Partners',
    to: '/about#experience',
    image: {
      src: '/media/field-vivatech',
      alt: 'A group standing in front of the large VivaTech logo at the event entrance.',
      width: 1050,
      height: 1400,
    },
  },
  {
    title: 'RAISE Summit 2026',
    when: 'Summer 2026, Paris',
    note: 'With Rendez-Vous Partners',
    to: '/about#experience',
    image: {
      src: '/media/field-raise',
      alt: 'A fireside conversation on the main stage of the RAISE Summit.',
      width: 1200,
      height: 900,
    },
  },
  {
    title: 'Hosting a YorkSeed founders event',
    when: 'Summer 2026',
    note: 'Host',
    to: '/about',
    image: {
      src: '/media/field-yorkseed',
      alt: 'A room of founders standing and talking at an event Joshua hosted.',
      width: 1050,
      height: 1400,
    },
  },
  {
    title: 'PMC Mentorship Meet & Greet',
    when: 'Fall 2026, NYU',
    note: 'Mentorship Lead, Product Management Club',
    to: '/about#experience',
    image: {
      src: '/media/field-pmc-mentorship',
      alt: 'Group photo at the PMC Mentorship Meet & Greet: mentors and members holding a Product Management Club at NYU banner.',
      width: 1600,
      height: 974,
    },
  },
]

export const contact = {
  label: 'Contact',
  heading: ['Let’s make', 'something useful.'],
  note: 'Open to internships, collaborations, and conversations about product, design, and strategy.',
}
