import { blueprint } from './blueprint'
import { loop } from './loop'
import { originalProjects, originalCases } from './original'
import type { LogoKey } from '../components/Logos'

// Projects and case studies. Each project drives its logo tile on the home grid,
// its row in All projects, and its case-study page. Media paths omit the extension: every
// image ships as .webp with a .jpg fallback in /public/media.

export type ImageMedia = {
  kind: 'image'
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** How the image fills its frame. "contain" places it on the surface colour. */
  fit?: 'cover' | 'contain'
  position?: string
  /** Phone screenshots render as narrow plates. */
  device?: 'phone'
}

export type VideoMedia = {
  kind: 'video'
  src: string
  poster: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type Media = ImageMedia | VideoMedia

export type Section =
  | { type: 'text'; label: string; heading: string; body: string[] }
  | { type: 'list'; label: string; heading: string; intro?: string; items: string[] }
  | {
      type: 'decisions'
      label: string
      heading: string
      intro?: string
      items: { title: string; body: string }[]
    }
  | {
      type: 'evidence'
      label: string
      heading: string
      observed: string[]
      proposed: string[]
      limitations: string[]
      proposedLabel?: string
    }
  | { type: 'compare'; label: string; heading: string; rows: { assumed: string; learned: string }[] }
  | { type: 'quote'; quote: string; cite: string }
  | { type: 'note'; label: string; heading: string; body: string[] }
  | { type: 'media'; layout: 'full' | 'pair' | 'phones'; items: Media[] }

export type Project = {
  slug: string
  index: string
  /** Short code used in figure labels, e.g. OTT—0001. */
  code: string
  logo: LogoKey
  /** case: full case study · reflection: short essay · brief: summary page, write-up to come */
  kind: 'case' | 'reflection' | 'brief'
  title: string
  /** Optional second line for reflections, set in the serif italic. */
  subtitle?: string
  /** One sentence for cards and the index. */
  description: string
  role: string
  status: string
  year: string
  /** Card image. Reflections without one render as type-only rows. */
  cover?: ImageMedia
  external?: { label: string; href: string }
  // Case-study page
  summary: string
  facts: { label: string; value: string }[]
  hero: Media[]
  sections: Section[]
}

export const projects: Project[] = [
  blueprint,
  loop,
  {
    slug: 'off-the-top',
    code: 'OTT',
    logo: 'off-the-top',
    index: '01',
    kind: 'case',
    title: 'Off The Top',
    description:
      'A website for a Queens barbershop, bringing services, gallery, reviews, and booking access together across two locations.',
    role: 'Design & front-end build',
    status: 'Live client website',
    year: 'Client work',
    cover: {
      kind: 'image',
      src: '/media/ott-cover',
      alt: 'Off The Top homepage: the barbershop logo over a photo of a barber at work, with Book now and Our locations buttons.',
      width: 1800,
      height: 1125,
      position: '42% 50%',
    },
    external: { label: 'offthetopnyc.com', href: 'https://offthetopnyc.com' },
    summary:
      'A website for Off The Top, a barbershop with locations in Astoria and Woodside, Queens. One place for a first-time customer to see services and prices, meet the barbers, read reviews, and get to booking at either shop.',
    facts: [
      { label: 'Role', value: 'Design & front-end build' },
      { label: 'Context', value: 'Freelance client work' },
      { label: 'Team', value: 'Independent, working directly with the shop' },
      { label: 'Status', value: 'Live client website' },
      { label: 'Locations', value: 'Astoria & Woodside, Queens' },
    ],
    hero: [
      {
        kind: 'image',
        src: '/media/ott-cover',
        alt: 'Off The Top homepage on desktop: the barbershop logo over a photo of a barber at work, with Book now and Our locations buttons.',
        width: 1800,
        height: 1125,
        caption: 'Homepage, desktop. Live at offthetopnyc.com.',
      },
    ],
    sections: [
      {
        type: 'text',
        label: 'Problem',
        heading: 'Two shops, one front door.',
        body: [
          'Off The Top runs two locations in Queens, each with its own hours, phone number and booking. The site had to give a new customer what they want to know before sitting in the chair — services and prices, the barbers, the shop, what other customers say — and then get them to a booking without guessing which location is which.',
        ],
      },
      {
        type: 'list',
        label: 'My contribution',
        heading: 'Designed and built end to end.',
        intro: 'I worked directly with the shop and handled the site from first layout to launch.',
        items: [
          'Visual direction: a dark, premium look built around photography of the shop and its barbers.',
          'Information structure: locations, barbers, services, reviews, gallery, the shop’s story, and hiring.',
          'Front-end build of every section, including the phone layout.',
          'Booking access through Squire for both the Astoria and Woodside locations.',
        ],
      },
      {
        type: 'media',
        layout: 'pair',
        items: [
          {
            kind: 'image',
            src: '/media/ott-locations',
            alt: 'Our Locations section: a storefront photo for Astoria and a team photo for Woodside, side by side.',
            width: 1800,
            height: 1125,
            caption: 'Locations, side by side.',
          },
          {
            kind: 'image',
            src: '/media/ott-services',
            alt: 'Services menu listing cuts and shaves with short descriptions and prices from $20 to $70.',
            width: 1800,
            height: 1125,
            caption: 'Service menu with prices.',
          },
        ],
      },
      {
        type: 'decisions',
        label: 'Decisions',
        heading: 'Key decisions and tradeoffs.',
        items: [
          {
            title: 'Location first',
            body: 'Both shops sit next to each other near the top of the page, each with address, hours, phone, booking and directions. A customer chooses a shop early, at the cost of some repetition between the two blocks.',
          },
          {
            title: 'Booking stays in Squire',
            body: 'Every booking action hands off to Squire instead of a custom flow. The shop keeps one scheduling system; the site’s job is to get people there quickly.',
          },
          {
            title: 'Prices in plain view',
            body: 'Services are a readable menu with durations and prices, so a customer can decide before committing to a time.',
          },
          {
            title: 'Barbers as people',
            body: 'Each barber has a short bio and a direct link to book with them, so a customer can choose who cuts their hair, not only when.',
          },
        ],
      },
      {
        type: 'media',
        layout: 'phones',
        items: [
          {
            kind: 'image',
            src: '/media/ott-mobile-hero',
            alt: 'Off The Top homepage on a phone, with the logo, Book now and Our locations buttons.',
            width: 780,
            height: 1688,
            device: 'phone',
          },
          {
            kind: 'image',
            src: '/media/ott-mobile-services',
            alt: 'Service menu on a phone, one service per row with its price.',
            width: 780,
            height: 1688,
            device: 'phone',
          },
          {
            kind: 'image',
            src: '/media/ott-mobile-gallery',
            alt: 'Gallery on a phone: photos of finished haircuts and a barber at work.',
            width: 780,
            height: 1688,
            device: 'phone',
            caption: 'Phone layouts: home, services, gallery.',
          },
        ],
      },
      {
        type: 'list',
        label: 'Delivered',
        heading: 'What was delivered.',
        items: [
          'A live production website at offthetopnyc.com.',
          'Location blocks for Astoria and Woodside with hours, phone, booking and directions.',
          'A service menu with durations and prices.',
          'Barber profiles with direct booking.',
          'Customer reviews, a photo gallery, the shop’s story, and a hiring page.',
        ],
      },
      {
        type: 'evidence',
        label: 'Evidence',
        heading: 'Outcome and limits.',
        observed: ['The site is live at offthetopnyc.com and is the shop’s public website.'],
        proposedLabel: 'Not measured',
        proposed: [
          'I don’t have traffic or booking data, so I can’t claim an effect on bookings or walk-ins.',
        ],
        limitations: [
          'Booking, scheduling and payments run on Squire, not on anything I built.',
          'Photography and reviews belong to the shop and its customers.',
        ],
      },
      {
        type: 'text',
        label: 'Reflection',
        heading: 'What I’d do next time.',
        body: [
          'Client work changes the brief: the site has to be easy for the owners to live with, not just look good on launch day. Next time I would agree on one or two measures with the shop before launch — booking clicks per location, for example — so the outcome is something we can point to.',
        ],
      },
    ],
  },

  {
    slug: 'spotify-community-tab',
    code: 'SPT',
    logo: 'spotify',
    index: '02',
    kind: 'case',
    title: 'Spotify Community Tab',
    description:
      'An NYU PM Club concept exploring a dedicated space for music sharing and community.',
    role: 'Product research & strategy',
    status: 'Student project / prototype',
    year: '2024 — 25',
    cover: {
      kind: 'image',
      src: '/media/spotify-concept-profile',
      alt: 'Concept mockup: a Spotify profile screen with a Friends list and a Community tab added to the bottom navigation.',
      width: 582,
      height: 1270,
      position: '50% 35%',
    },
    summary:
      'A student product concept from the NYU Product Management Club: a dedicated Community tab inside Spotify, where sharing music, reacting, and artist and genre communities live in one place. Independent student work, not affiliated with or endorsed by Spotify.',
    facts: [
      { label: 'Role', value: 'Product manager, student product team' },
      { label: 'Context', value: 'NYU Product Management Club' },
      { label: 'Timeline', value: 'Sep 2024 – Jan 2025' },
      { label: 'Team', value: 'NYU PM Club product team' },
      { label: 'Status', value: 'Student project / prototype — not shipped' },
    ],
    hero: [
      {
        kind: 'video',
        src: '/media/spotify-demo.webm',
        poster: '/media/spotify-feed',
        alt: 'Prototype walkthrough: a Community Feed inside a Spotify-style desktop layout, with a friend’s shared track, reactions, and an artist community space.',
        width: 1280,
        height: 720,
        caption:
          'Prototype walkthrough. On-screen labels describe the effects we hoped for, not measured results.',
      },
    ],
    sections: [
      {
        type: 'note',
        label: 'Context',
        heading: 'What already existed.',
        body: [
          'Spotify was not without social features. During this project it already had Blend, which merges friends’ listening into a shared playlist; Jam, for listening together in real time; collaborative playlists; and sharing out to other apps.',
          'What it didn’t have was one in-app place for those moments to live and be found again. That narrower gap is what the Community tab proposed to fill.',
        ],
      },
      {
        type: 'text',
        label: 'Problem',
        heading: 'Music is social. The conversation happened elsewhere.',
        body: [
          'We focused on 18–24 year olds, for whom music is closely tied to identity. Through 50 in-person interviews and 100 survey responses, we heard that conversation about music mostly happened on Instagram, group chats and Discord — outside Spotify — and that some listeners questioned whether Premium was worth the price.',
          'Our working hypothesis: if more of that social activity happened inside Spotify, Premium might feel more worth paying for. It remained a hypothesis; we never had data to test it.',
        ],
      },
      {
        type: 'quote',
        quote: 'I would want more artist, genre and community based customization and interaction.',
        cite: 'Interview participant, 18–24',
      },
      {
        type: 'list',
        label: 'My contribution',
        heading: 'Research to roadmap.',
        intro:
          'As a product manager on the club’s product team, I led research, ideation, prioritization and the spec.',
        items: [
          'Ran 50 in-person interviews and collected 100 survey responses on music, identity and community.',
          'Ideated 20 features from the research and used RICE to compare four directions.',
          'Wrote the PRD, success metrics, and a 26-week phased roadmap.',
          'Built a Gemini-powered MVP prototype around sharing and reactions.',
          'Presented the tradeoffs to a panel of product managers and directors.',
        ],
      },
      {
        type: 'decisions',
        label: 'Decisions',
        heading: 'Key decisions and tradeoffs.',
        items: [
          {
            title: 'A destination, not another share button',
            body: 'We compared a social feed, expanding Friend Activity beyond desktop, virtual events, and fan pages with a community tab. The tab won because it could hold the other ideas over time instead of competing with them.',
          },
          {
            title: 'No direct messages in v1',
            body: 'The MVP was sharing plus reactions. Real-time messaging adds moderation risk and backend work; reactions still test the core question — do people want to share music inside Spotify? — at a fraction of the cost.',
          },
          {
            title: 'Metrics that isolate the tab',
            body: 'Share-feature use against a baseline, whether recipients respond or sharing is one-sided, and time on platform attributable to the tab. The panel pushed on attribution: time on platform alone is too noisy.',
          },
          {
            title: 'Phase the release',
            body: 'Planning and design sprints in weeks 1–4, an internal MVP test in week 8, MVP and beta in week 10, and the full feature set by week 26.',
          },
        ],
      },
      {
        type: 'media',
        layout: 'phones',
        items: [
          {
            kind: 'image',
            src: '/media/spotify-mvp',
            alt: 'MVP mockup: the Spotify home screen used as the starting point for in-app sharing.',
            width: 550,
            height: 1222,
            device: 'phone',
          },
          {
            kind: 'image',
            src: '/media/spotify-concept-profile',
            alt: 'Concept mockup: a profile screen with a Friends list and a Community tab in the bottom navigation.',
            width: 582,
            height: 1270,
            device: 'phone',
          },
          {
            kind: 'image',
            src: '/media/spotify-concept-home',
            alt: 'Concept mockup: the Spotify home screen with recent playlists and Picked for you.',
            width: 576,
            height: 1270,
            device: 'phone',
            caption: 'Concept mockups drawn over screenshots of the Spotify app, 2024.',
          },
        ],
      },
      {
        type: 'list',
        label: 'Delivered',
        heading: 'What was delivered.',
        items: [
          'Research synthesis from interviews and a survey.',
          'A PRD with success metrics.',
          'A 26-week phased roadmap.',
          'A Gemini-powered MVP prototype and recorded walkthrough.',
          'A final presentation to a panel of product managers and directors.',
        ],
      },
      {
        type: 'media',
        layout: 'full',
        items: [
          {
            kind: 'image',
            src: '/media/spotify-space',
            alt: 'Prototype frame: an artist community space called Billie’s Bedroom, with Forum, Chat, Events and Perks tabs and a pinned discussion.',
            width: 1280,
            height: 720,
            caption: 'Prototype frame: an artist community space.',
          },
        ],
      },
      {
        type: 'evidence',
        label: 'Evidence',
        heading: 'Outcome and limits.',
        observed: [
          '50 in-person interviews and 100 survey responses from 18–24 year olds.',
          'A working prototype of the sharing flow, shown in the walkthrough above.',
          'Presented to a panel of product managers and directors.',
        ],
        proposedLabel: 'Proposed, not measured',
        proposed: [
          'Higher engagement and better Premium retention were the hypotheses behind the tab. Nothing launched, so neither was measured.',
        ],
        limitations: [
          'Student project with no access to Spotify’s data or users beyond our own research.',
          'Not affiliated with, commissioned by, or endorsed by Spotify.',
        ],
      },
      {
        type: 'note',
        label: 'After the project',
        heading: 'Later product changes.',
        body: [
          'In August 2025, after this project ended, Spotify introduced Messages for sharing music and podcasts with friends in the app. It is not connected to this project. This page describes the product as it was in 2024–25.',
        ],
      },
      {
        type: 'decisions',
        label: 'Reflection',
        heading: 'What stuck with me.',
        items: [
          {
            title: 'Scoping is the decision that matters',
            body: 'Cutting direct messages from v1 removed most of the engineering and moderation risk without losing the core question.',
          },
          {
            title: 'Metrics should isolate, not just correlate',
            body: '“Time on platform” sounds good but is noisy. Good metrics attribute change to the feature itself.',
          },
          {
            title: 'Social features need trust infrastructure',
            body: 'Every social feature is also a moderation surface. Content policy and guardrails belong in the spec.',
          },
          {
            title: 'Tie the feature to the business model',
            body: 'The strongest framing connected community to Premium value — which is also the claim that most needed evidence.',
          },
        ],
      },
    ],
  },

  {
    slug: 'lee-way',
    code: 'LWY',
    logo: 'lee-way',
    index: '03',
    kind: 'case',
    title: 'Lee-Way',
    description:
      'A flexible planning concept for students navigating missed tasks and changing schedules.',
    role: 'Design & research',
    status: 'Course project / concept',
    year: '2025',
    cover: {
      kind: 'image',
      src: '/media/leeway-week',
      alt: 'Lee-Way concept screen: a Rest & Repair view showing 3 of 5 buffers left and a flexible 3:00–4:00 time window.',
      width: 1024,
      height: 1536,
      position: '50% 40%',
    },
    summary:
      'A planning concept for students that expects plans to change. Instead of an overdue list when a day slips, Lee-Way is built around recovery: moving things without starting over. Made for an NYU human-centered design course.',
    facts: [
      { label: 'Role', value: 'Designer & researcher' },
      { label: 'Context', value: 'NYU course — Attention & Time' },
      { label: 'Timeline', value: 'Oct 2025' },
      { label: 'Team', value: 'Solo' },
      { label: 'Status', value: 'Course project / concept — not released' },
    ],
    hero: [
      {
        kind: 'image',
        src: '/media/leeway-reminder',
        alt: 'Lee-Way concept screen: a task reminder to complete a reading assignment, with Mark as done and Later options.',
        width: 1024,
        height: 1536,
      },
      {
        kind: 'image',
        src: '/media/leeway-week',
        alt: 'Lee-Way concept screen: Rest & Repair, with 3 of 5 buffers left and a flexible 3:00–4:00 window.',
        width: 1024,
        height: 1536,
        caption: 'Concept screens, generated with an AI assistant for the final presentation. Illustrative, not final UI.',
      },
    ],
    sections: [
      {
        type: 'text',
        label: 'Problem',
        heading: 'Plans break. Most planners don’t bend.',
        body: [
          'Most planning tools assume the plan will hold. When it doesn’t, students get an overdue list, red badges and a broken streak — and once a day slips, basics like meals and sleep tend to slip with it.',
        ],
      },
      {
        type: 'quote',
        quote:
          'I’ve given up on trying to plan out my days and tasks… I just try to remember deadlines and be productive when possible, but with multiple responsibilities outside of school, it’s really stressful.',
        cite: 'Anonymous NYU Tandon student',
      },
      {
        type: 'list',
        label: 'My contribution',
        heading: 'Research, synthesis, concept.',
        intro: 'I ran the project alone, from research through the final presentation.',
        items: [
          'Surveyed 90 students and ran interviews, an empathy video exercise, and an accessibility-lens “scavenger hunt” that looked at what everyday spaces offer and what they lack.',
          'Synthesized findings into six affinity clusters: executive function and planning, energy and attention, emotions and self-talk, environment, tools and opportunities, and longer reaches.',
          'Reframed the brief as: how might we design planning tools that adapt for students who miss tasks, instead of punishing them?',
          'Designed the concept and prototyped an AI-powered adaptive day planner with voice input, flexible nudge windows, and recovery-oriented interactions.',
        ],
      },
      {
        type: 'media',
        layout: 'pair',
        items: [
          {
            kind: 'image',
            src: '/media/leeway-affinity',
            alt: 'Affinity map of colour-coded sticky notes, including “shame spiral”, “guilt around rest” and “if plan slips whole day is ruined”.',
            width: 1600,
            height: 1338,
            caption: 'Divergent stage: every idea on the wall.',
          },
          {
            kind: 'image',
            src: '/media/leeway-reframe',
            alt: 'Hand-drawn sketch grouping clustered notes and asking “what is next?”, leading to the reframed how-might-we question.',
            width: 1600,
            height: 1309,
            caption: 'From clusters to one question.',
          },
        ],
      },
      {
        type: 'decisions',
        label: 'Decisions',
        heading: 'Key decisions and tradeoffs.',
        items: [
          {
            title: 'Narrow the lens',
            body: 'The scavenger hunt widened the view to everyday friction — it’s harder to start laundry when machines are broken — but risked drifting off the problem. I narrowed back to one question: recovering from missed tasks.',
          },
          {
            title: 'Permission instead of punishment',
            body: 'Buffer tokens: five a week, each letting you move a task without it counting as a failure. A fixed number keeps some structure in a flexible system.',
          },
          {
            title: 'Ranges, not exact times',
            body: 'Nudge windows give a task a time range instead of a fixed slot, so a late start isn’t automatically a miss.',
          },
          {
            title: 'Make restarting cheap',
            body: 'Voice input for adding tasks, and a “stuck” text that starts a two-minute reset, lower the effort of getting going again.',
          },
        ],
      },
      {
        type: 'list',
        label: 'Delivered',
        heading: 'What was delivered.',
        items: [
          'Research synthesis and a six-cluster affinity map.',
          'A reframed design question.',
          'The Lee-Way concept: AI day planning, voice input, buffer tokens, nudge windows and a reset text.',
          'A prototype of the adaptive day planner and illustrative concept screens.',
          'A final presentation on 15 October 2025.',
        ],
      },
      {
        type: 'evidence',
        label: 'Evidence',
        heading: 'Outcome and limits.',
        observed: [
          'A survey of 90 students, plus interviews and observation.',
          'Six affinity clusters and a reframed design question.',
        ],
        proposedLabel: 'Design goals, not findings',
        proposed: [
          'Less guilt and easier recovery after a missed task are what the concept aims for. It was not evaluated in a controlled way, so there are no outcomes to report.',
        ],
        limitations: [
          'One course, one semester, one designer.',
          'Concept screens were generated with an AI assistant and are illustrative.',
          'Lee-Way is a planning concept, not a clinical or mental-health tool.',
        ],
      },
      {
        type: 'decisions',
        label: 'Reflection',
        heading: 'What changed in how I design.',
        items: [
          {
            title: 'See the invisible',
            body: 'The frictions, defaults and assumptions baked into everyday tools are easy to accept as normal.',
          },
          {
            title: 'Design nudges behavior',
            body: 'Streaks, red badges, layouts and wording change what people do — including me.',
          },
          {
            title: 'Power lives in design',
            body: 'Who gets centered, who has to adapt, and how rules quietly discipline users.',
          },
          {
            title: 'Next time',
            body: 'Involve users earlier, run scrappy pilots, and test whether permission actually helps people restart.',
          },
        ],
      },
    ],
  },

  {
    slug: 'spot',
    code: 'SPOT',
    logo: 'spot',
    index: '04',
    kind: 'reflection',
    title: 'Spot',
    subtitle: 'Why I stopped before building.',
    description:
      'A community app for NYC skateboarders that I stopped before building — a lesson in validating assumptions first.',
    role: 'Solo concept',
    status: 'Stopped before build',
    year: 'Reflection',
    summary:
      'Spot was a concept for NYC skateboarders: spot maps, session planning and local lessons. I worked out the whole idea before talking to a single skater. When I finally did, each assumption fell apart, so I stopped.',
    facts: [
      { label: 'Role', value: 'Solo concept' },
      { label: 'Context', value: 'Personal project' },
      { label: 'Audience', value: 'NYC skateboarders' },
      { label: 'Status', value: 'Stopped before build — no code written' },
    ],
    hero: [],
    sections: [
      {
        type: 'text',
        label: 'The idea',
        heading: 'A community layer for NYC skating.',
        body: [
          'New York has one of the most active skate scenes anywhere. The idea was an app built specifically for it: a map of parks, plazas and street spots; a way to organize or join sessions; and a place for local skaters to offer lessons and tips.',
          'On paper it looked like a clear gap. The problem was that the paper was all I had.',
        ],
      },
      {
        type: 'compare',
        label: 'Assumptions',
        heading: 'What I assumed, and what I learned.',
        rows: [
          {
            assumed: 'Skaters struggle to find spots and need a central map.',
            learned: 'Exploring the city is the point. Finding a spot yourself is part of the culture, not a problem to solve.',
          },
          {
            assumed: 'Skaters need a platform to find sessions and meetups.',
            learned: 'Group chats and Instagram already handle it, and crews are tight-knit enough not to want an app in between.',
          },
          {
            assumed: 'People want structured lessons from local skaters.',
            learned: 'YouTube and going to the park are how people learn. Informal, in-person learning already works.',
          },
        ],
      },
      {
        type: 'text',
        label: 'Why I stopped',
        heading: 'It solved problems that didn’t exist.',
        body: [
          'I’m not a skateboarder, and I had designed from the outside. Skating values independence and self-discovery; a structured, app-mediated platform cuts against both. The existing tools weren’t legacy systems to replace — they fit how skaters actually communicate.',
          'Stopping before writing any code was the right call. The useful part was what it changed about how I start.',
        ],
      },
      {
        type: 'decisions',
        label: 'What changed',
        heading: 'How I start now.',
        items: [
          {
            title: 'Talk to people before designing',
            body: 'The conversation should shape the concept, not validate it afterwards.',
          },
          {
            title: 'Understand the culture',
            body: 'Values and existing habits decide whether a product fits a community or fights it.',
          },
          {
            title: 'Respect what already works',
            body: 'Existing solutions are part of the landscape, not just competition to displace.',
          },
          {
            title: 'Excitement isn’t evidence',
            body: 'A compelling idea with sensible features still needs a real problem behind it.',
          },
        ],
      },
      {
        type: 'evidence',
        label: 'Evidence',
        heading: 'What this is based on.',
        observed: ['Conversations with skaters, after the concept was already worked out.'],
        proposedLabel: 'Not done',
        proposed: ['No prototype, no build, no launch.'],
        limitations: ['The conversations were informal, not a structured study.'],
      },
    ],
  },
  {
    slug: 'hp-tech-ventures',
    code: 'HPTV',
    logo: 'hp',
    index: '05',
    kind: 'brief',
    title: 'HP Tech Ventures',
    description:
      'A venture capital internship: screening early-stage startups and leading the investment analysis on one.',
    role: 'Venture capital',
    status: 'Completed, Jan – Mar 2026',
    year: '2026',
    summary:
      'A remote venture capital internship with HP Tech Ventures, HP’s corporate venture arm. I screened startups in thermal management and thermal interface materials, then led the investment analysis on one of them.',
    facts: [
      { label: 'Focus', value: 'Venture capital' },
      { label: 'Context', value: 'HP Tech Ventures · Remote' },
      { label: 'Timeline', value: 'Jan – Mar 2026' },
      { label: 'Status', value: 'Completed' },
    ],
    hero: [],
    sections: [
      {
        type: 'list',
        label: 'What I did',
        heading: 'From screening to memo.',
        items: [
          'Screened 100 startups across the thermal management and thermal interface materials markets, shortlisting candidates for diligence.',
          'Led investment analysis on NovoLINC, evaluating product positioning, market size, and strategic fit with HP’s investment thesis.',
          'Wrote an investment memo for stakeholders, using AI-assisted research to assess fundraising, financials and growth potential.',
        ],
      },
      {
        type: 'note',
        label: 'Write-up',
        heading: 'A longer case study is in progress.',
        body: ['This page covers what I did. A fuller write-up will follow.'],
      },
    ],
  },
  {
    slug: 'microsoft-dynamics-365',
    code: 'MSFT',
    logo: 'microsoft',
    index: '06',
    kind: 'brief',
    title: 'Microsoft Dynamics 365',
    description:
      'An educational suite concept: a CRM/ERP product prototype, plus contributions to an NYU study on enterprise data practices.',
    role: 'Product & research',
    status: 'Prototype & published study',
    year: 'Research',
    summary:
      'A Microsoft Dynamics 365 educational suite: I developed a scalable CRM/ERP product prototype and contributed to a published NYU study on modern enterprise data practices and the barriers to adopting new systems.',
    facts: [
      { label: 'Role', value: 'Product & research' },
      { label: 'Context', value: 'NYU research' },
      { label: 'Status', value: 'Prototype & published study' },
    ],
    hero: [],
    sections: [
      {
        type: 'list',
        label: 'What I did',
        heading: 'Prototype and research.',
        items: [
          'Developed a scalable CRM/ERP product prototype for a Dynamics 365 educational suite.',
          'Contributed to a published NYU study on enterprise data practices and system adoption barriers.',
        ],
      },
      {
        type: 'note',
        label: 'Write-up',
        heading: 'A full case study is coming soon.',
        body: ['This page summarises the project. Details and visuals will follow.'],
      },
    ],
  },
]

// Keep project copy aligned with the original portfolio, while retaining the new media.
for (const project of projects) {
  const original = originalProjects[project.slug]
  if (original) Object.assign(project, original)
  const sections = originalCases[project.slug]
  if (sections) {
    const media = project.sections.filter((section) => section.type === 'media')
    project.sections = [...sections, ...media]
  }
}

export const caseStudies = projects.filter((p) => p.kind === 'case')

/** Home grid: two rows, wide/narrow/narrow then narrow/narrow/wide. */
export const homeGrid: { slug: string; size: 'wide' | 'narrow' }[] = [
  { slug: 'loop', size: 'narrow' },
  { slug: 'off-the-top', size: 'narrow' },
  { slug: 'spotify-community-tab', size: 'wide' },
  { slug: 'lee-way', size: 'narrow' },
  { slug: 'microsoft-dynamics-365', size: 'narrow' },
  { slug: 'hp-tech-ventures', size: 'wide' },
]

export const kindLabel = (p: Project) =>
  p.kind === 'reflection' ? 'Reflection' : p.kind === 'brief' ? 'Project' : 'Case study'

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
