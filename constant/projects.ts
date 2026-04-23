// constant/projects.ts
// ─────────────────────────────────────────────────────────────────
//  Add new projects here. All optional fields are marked with '?'
//  associations: 'nma' | 'internship' | 'personal' | 'academic'
// ─────────────────────────────────────────────────────────────────

export type ProjectStatus      = 'live' | 'in-progress' | 'completed'
export type ProjectAssociation = 'nma' | 'internship' | 'personal' | 'academic'

export interface Project {
  id:          number
  title:       string
  tagline:     string
  description: string
  highlights:  string[]
  tech:        string[]
  status:      ProjectStatus
  period:      string
  category:    string
  association: ProjectAssociation
  liveUrl?:    string
  githubUrl?:  string
  // Place images in /public/images/projects/<project-folder>/
  // e.g. ['/images/projects/carpool/1.png', '/images/projects/carpool/2.png']
  images?:     string[]
  // Short label shown on cover when no image provided
  coverLabel?: string
}

export const projects: Project[] = [
  /* ── NMA Software ─────────────────────────────────────────── */
  {
    id:          1,
    title:       'Carpool Management System',
    tagline:     'Real-time school pickup automation with geofencing',
    description: 'Replaced chaotic manual school carpool coordination with a fully automated real-time system. Parents are geo-tracked on lane entry and released on exit — zero manual check-ins.',
    highlights: [
      'Geofence-triggered auto tracking — parents tracked on carpool lane entry, released on exit',
      'Live map refreshes every 10 s via optimised, debounced WebSocket broadcasts',
      'Real-time teacher dashboard shows dispatched students the moment they are called',
      'Dramatically reduced school staff workload across the entire afternoon pickup workflow',
    ],
    tech:        ['React.js', 'Express.js', 'Socket.io', 'PostgreSQL', 'Leaflet Map', 'JavaScript', 'CSS'],
    status:      'live',
    period:      'Jan 2026 – Present',
    category:    'Real-time System',
    association: 'nma',
    liveUrl:     'https://pickup.school/',
    coverLabel:  'CARPOOL',
    images:      [], // add: ['/images/projects/carpool/1.png']
  },
  {
    id:          2,
    title:       'Instrumedent',
    tagline:     'Dental marketplace with real-time chat & multi-gateway payments',
    description: 'Scalable backend for a US dental marketplace — service bookings, product orders, LabRush expedited handling, three payment gateways, and a real-time group discussion system.',
    highlights: [
      'Stripe, PayPal & Venmo payment integration with promo codes & LabRush order handling',
      'JWT auth, Mailgun email verification & role-based access control',
      'Presigned AWS S3 uploads — large files go browser-to-cloud, eliminating server timeouts',
      'Socket.io group chat with typing indicators & admin-controlled member management',
      'Frontend pages built with React, Redux & Chakra UI',
    ],
    tech:        ['Node.js', 'Express.js', 'PostgreSQL', 'React', 'Redux', 'Socket.io', 'AWS S3', 'Stripe', 'Chakra UI'],
    status:      'live',
    period:      'May 2025 – Present',
    category:    'SaaS Platform',
    association: 'nma',
    liveUrl:     'https://instrumedent.com/',
    coverLabel:  'DENTAL',
    images:      [], // add: ['/images/projects/instrumedent/1.png']
  },
  {
    id:          3,
    title:       'Fundraising Platform',
    tagline:     'Secure multi-role crowdfunding with Stripe Connect',
    description: 'Full-featured crowdfunding platform with Creator, Donor and Admin roles. Admins approve campaigns before they go live. Stripe Connect handles creator payouts with automatic 5 % platform fee.',
    highlights: [
      'Multi-role system — Creators, Donors & Admins with full campaign lifecycle management',
      'Stripe Connect with Express onboarding, KYC verification & auto 5 % platform fee per transaction',
      'AWS S3 media uploads for campaign images, videos & documents',
      'Scalable REST APIs backed by PostgreSQL for campaign, transaction & user data',
    ],
    tech:        ['Node.js', 'Express', 'React', 'Stripe Connect', 'PostgreSQL', 'AWS S3'],
    status:      'in-progress',
    period:      'Dec 2025 – Present',
    category:    'FinTech',
    association: 'nma',
    coverLabel:  'FUND',
    images:      [],
  },

  /* ── Apps Technologies (Internship) ────────────────────────── */
  {
    id:          4,
    title:       'Family Supermarket',
    tagline:     'Full-featured e-commerce supermarket web app',
    description: 'A complete supermarket web application built individually during internship. Covers admin and customer roles, full product CRUD, stock & pricing dashboard, cart, search, and Stripe checkout.',
    highlights: [
      'Admin dashboard for product management with CRUD, stock level & pricing controls',
      'Shopping cart with live search and Stripe payment gateway for secure online transactions',
      'Authentication & role management built with Laravel Breeze',
      'Built end-to-end as a solo project with a Laravel/PHP stack',
    ],
    tech:        ['Laravel', 'PHP', 'HTML', 'CSS', 'Bootstrap', 'Stripe API', 'GitHub'],
    status:      'completed',
    period:      '2024',
    category:    'E-Commerce',
    association: 'internship',
    coverLabel:  'MARKET',
    images:      [],
  },
  {
    id:          5,
    title:       'Pintanna ERP System',
    tagline:     'Comprehensive ERP system for inventory, sales, and customer management',
    description: 'A complete ERP system built individually during internship. Covers admin and customer roles, full product CRUD, stock & pricing dashboard, cart, search, and Stripe checkout.',
    highlights: [
      'Admin dashboard for product management with CRUD, stock level & pricing controls',
      'Shopping cart with live search and Stripe payment gateway for secure online transactions',
      'Authentication & role management built with Laravel Breeze',
      'Built end-to-end as a solo project with a Laravel/PHP stack',
    ],
    tech:        ['Laravel', 'PHP', 'HTML', 'CSS', 'Bootstrap', 'Stripe API', 'GitHub'],
    status:      'completed',
    period:      '2024',
    category:    'ERP System',
    association: 'internship',
    coverLabel:  'ERP',
    images:      [],
  },

  /* ── Personal / Academic ────────────────────────────────────── */
  {
    id:          6,
    title:       'Greenshield',
    tagline:     'Plant disease detection system — 99 % ML accuracy',
    description: 'Web-based ML system that detects and classifies up to 38 plant diseases from uploaded photos. Identifies visually similar diseases and recommends tailored treatments using a trained model achieving 99 % accuracy.',
    highlights: [
      'Classifies 38 plant diseases using OpenCV image processing + TensorFlow model',
      '99 % prediction accuracy with visually similar disease matching',
      'User auth, image upload, disease prediction & treatment suggestion flow',
      'Flask REST backend serving a React.js SPA frontend',
    ],
    tech:        ['Python', 'Flask', 'React.js', 'TensorFlow', 'OpenCV', 'Machine Learning', 'GitHub'],
    status:      'completed',
    period:      '2025',
    category:    'AI / ML',
    association: 'academic',
    coverLabel:  'AI',
    images:      [],
  },
]