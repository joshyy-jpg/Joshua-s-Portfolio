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
    alt: 'Black-and-white photo of Joshua Lee smiling, in a quarter-zip sweater, with plants behind him.',
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
}

export const experience: Role[] = originalExperience.filter(
  (role) => !role.org.includes('Lee-Way') && !role.org.includes('Spotify'),
)
export const leadership: Role[] = originalLeadership
export const education = originalEducation
export const skills = originalSkills
