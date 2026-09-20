export const site = {
  name: 'Studio 1028',
  tagline:
    'A studio for experiments, development, content, writing, and social — building the next kind of signal.',
  email: 'hello@studio1028.com',
  location: 'Colombo · Remote',
  developer: {
    name: 'Udith Sandaruwan',
    url: 'https://uditsandarwan.com',
  },
} as const

export const practices = [
  {
    id: '01',
    title: 'Experiments',
    copy: 'Prototypes, speculative tools, and R&D that push formats before they become products.',
  },
  {
    id: '02',
    title: 'Development',
    copy: 'Interfaces, systems, and builds engineered for clarity, speed, and lasting craft.',
  },
  {
    id: '03',
    title: 'Content Creation',
    copy: 'Cinematic narratives, campaigns, and visual systems that carry a brand’s voice.',
  },
  {
    id: '04',
    title: 'Article Writing',
    copy: 'Long-form field notes, essays, and editorial that turn complexity into signal.',
  },
  {
    id: '05',
    title: 'Social Marketing',
    copy: 'Channels, cadence, and community — designed as a living media practice, not noise.',
  },
] as const

export const works = [
  {
    id: '01',
    title: 'Signal Room',
    tag: 'Experiment',
    year: '2026',
    image: '/images/work-signal.jpg',
    alt: 'Creative desk with digital art prints, tablet, and icon systems',
  },
  {
    id: '02',
    title: 'Night Grid',
    tag: 'Development',
    year: '2025',
    image: '/images/work-grid.jpg',
    alt: 'Code editor on a dark screen during a late build session',
  },
  {
    id: '03',
    title: 'Copper Press',
    tag: 'Content',
    year: '2025',
    image: '/images/work-copper.jpg',
    alt: 'Video editing timeline with multitrack clips and waveforms',
  },
  {
    id: '04',
    title: 'Field Notes',
    tag: 'Writing',
    year: '2026',
    image: '/images/work-notes.jpg',
    alt: 'Notebook and pen ready for long-form editorial writing',
  },
  {
    id: '05',
    title: 'Orbit Campaign',
    tag: 'Social',
    year: '2025',
    image: '/images/work-orbit.jpg',
    alt: 'Analytics dashboard charting campaign performance',
  },
  {
    id: '06',
    title: 'Atlas Lab',
    tag: 'Experiment',
    year: '2026',
    image: '/images/work-atlas.jpg',
    alt: 'Earth from orbit representing systems-scale experimentation',
  },
] as const

export const method = [
  {
    step: '01',
    title: 'Brief & Pulse',
    copy: 'We map intent, audience, and constraints before a single frame or line of code.',
  },
  {
    step: '02',
    title: 'Prototype',
    copy: 'Fast experiments surface the idea that deserves to ship — not the loudest one.',
  },
  {
    step: '03',
    title: 'Build & Shape',
    copy: 'Design, development, and narrative lock into one coherent system.',
  },
  {
    step: '04',
    title: 'Launch & Learn',
    copy: 'We publish, measure, refine — treating every release as the next experiment.',
  },
] as const

export const notes = [
  {
    id: '01',
    category: 'Essay',
    title: 'Why studios should treat social like a laboratory',
    date: 'Sep 2026',
  },
  {
    id: '02',
    category: 'Process',
    title: 'Building in public without leaking the craft',
    date: 'Aug 2026',
  },
  {
    id: '03',
    category: 'Signal',
    title: 'From campaign to system: content that compounds',
    date: 'Jul 2026',
  },
] as const

export const stripImages = [
  { src: '/images/strip-01.jpg', alt: 'Circuit board detail — systems and experiments' },
  { src: '/images/strip-02.jpg', alt: 'Minimal office interior with natural light' },
  { src: '/images/strip-03.jpg', alt: 'Glass skyscraper architecture' },
  { src: '/images/strip-04.jpg', alt: 'Architectural structure under construction' },
  { src: '/images/strip-05.jpg', alt: 'Laptop learning and product research' },
  { src: '/images/strip-06.jpg', alt: 'Music production studio console at night' },
] as const

export const images = {
  hero: {
    src: '/images/hero.jpg',
    alt: 'Aerial city skyline at golden hour over the water',
  },
  film: {
    src: '/images/film.jpg',
    alt: 'Professional recording studio with mixing console and guitars',
  },
  about: {
    src: '/images/about-lab.jpg',
    alt: 'Collaborative studio table with laptops, notes, and devices',
  },
} as const
