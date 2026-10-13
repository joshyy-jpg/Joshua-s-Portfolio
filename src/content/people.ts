import { originalAbout, originalExperience, originalLeadership, originalEducation, originalSkills } from './original'
// About copy and experience, taken from the résumé (Sep 2026) and the existing site.

export const about = {
  /** Home-page lead, desktop line breaks. */
  homeLines: ['From San Jose, based in New York,', 'studying where business,', 'technology and people meet.'],
  homeLinesMobile: ['From San Jose,', 'based in New York,', 'studying where business,', 'technology and people meet.'],
  homeBody:
    'So far that has meant client websites for small businesses, consumer product concepts, and startup go-to-market work in Paris.',
  ...originalAbout,
  facts: [
    { label: 'Studying', value: 'B.S. Business & Technology Management, NYU Tandon' },
    { label: 'Graduating', value: 'May 2028 (expected)' },
    { label: 'From', value: 'San Jose, California' },
    { label: 'Based', value: 'New York' },
    { label: 'Outside work', value: 'Fourth-degree Taekwondo black belt · Founder, NYU Electronic Dance Music Club' },
  ],
  portrait: {
    src: '/media/portrait-about',
    alt: 'Photo of Joshua Lee smiling, in a quarter-zip sweater, with plants behind him.',
    width: 640,
    height: 800,
  },
  field: [
    {
      src: '/media/field-vivatech',
      alt: 'A group standing in front of the large VivaTech logo at the event entrance.',
      width: 1050,
      height: 1400,
      caption: 'VivaTech 2026, Paris',
    },
    {
      src: '/media/field-raise',
      alt: 'A fireside conversation on the main stage of the RAISE Summit.',
      width: 1200,
      height: 900,
      caption: 'RAISE Summit 2026, Paris',
    },
    {
      src: '/media/field-yorkseed',
      alt: 'A room of founders standing and talking at an event Joshua hosted.',
      width: 1050,
      height: 1400,
      caption: 'Hosting a YorkSeed founders event',
    },
  ],
}

export type Role = {
  org: string
  role: string
  dates: string
  location?: string
  points: string[]
  /** Related case study slug. */
  project?: string
  photo?: { src: string; alt: string; width: number; height: number; caption: string }
}

export const experience: Role[] = originalExperience.filter(
  (role) => !role.org.includes('Lee-Way') && !role.org.includes('Spotify'),
)
export const leadership: Role[] = originalLeadership.map(role => ({
  ...role,
  ...(role.role === 'Mentorship Lead' ? { photo: {
    src: '/media/field-pmc-mentorship',
    alt: 'Mentors and members holding the Product Management Club at NYU banner at the Mentorship Meet & Greet.',
    width: 1600,
    height: 974,
    caption: 'PMC Mentorship Meet & Greet',
  } } : {}),
}))
export const education = originalEducation
export const skills = originalSkills

export const competitions = [
  {
    "src": "/media/field-salesforce",
    "alt": "Case competition participants in front of the NYU PMC case competition screen with Salesforce branding.",
    "width": 1800,
    "height": 1200,
    "caption": "NYC Salesforce Product Management · Spring 2026"
  },
  {
    "src": "/media/field-ibm",
    "alt": "Five case competition participants in front of the Marketing Society × IBM final-round presentation.",
    "width": 1024,
    "height": 768,
    "caption": "IBM × Stern Marketing Society · Finalist"
  }
]

const personalPhotos = [
  {
    "src": "/media/travel-japan",
    "alt": "Joshua on a brightly lit street in Japan.",
    "width": 1067,
    "height": 1600,
    "caption": "Japan"
  },
  {
    "src": "/media/travel-india",
    "alt": "Joshua smiling with a group in India.",
    "width": 1600,
    "height": 1200,
    "caption": "India"
  },
  {
    "src": "/media/travel-luxembourg",
    "alt": "A group posing in front of a castle in Luxembourg.",
    "width": 1600,
    "height": 1200,
    "caption": "Luxembourg"
  },
  {
    "src": "/media/travel-morocco",
    "alt": "Camel riders silhouetted against the sky in the Moroccan desert.",
    "width": 1200,
    "height": 1600,
    "caption": "Morocco"
  },
  {
    "src": "/media/personal-dog",
    "alt": "A Bernese mountain dog sitting indoors.",
    "width": 1200,
    "height": 1600,
    "caption": "My dog"
  }
]

export const aboutPhotoGroups = [
 [personalPhotos[0], personalPhotos[1], about.field[0], personalPhotos[3]],
 [competitions[0], personalPhotos[2], competitions[1], personalPhotos[4]],
]
