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
    category:    'Real-time Saas System',
    association: 'nma',
    liveUrl:     'https://pickup.school/',
    coverLabel:  'CARPOOL',
    images:      ['/images/carpool/carpool dashboard.png'], // add: ['/images/projects/carpool/1.png']
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
    period:      'May 2025 – Jan 2026',
    category:    'E-Commerce',
    association: 'nma',
    liveUrl:     'https://instrumedent.com/',
    coverLabel:  'DENTAL',
    images:      ['/images/instrumedent/InstruMeDent -products.png'], // add: ['/images/projects/instrumedent/InstruMeDent -products.png']
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
    status:      'live',
    period:      'Dec 2025 – Present',
    category:    'FinTech',
    association: 'nma',
    liveUrl:     'https://splendid-kleicha-56390b.netlify.app/',
    coverLabel:  'Fintech',
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
    coverLabel:  'E-COMMERCE',
    images:      [],
  },
  {
  id:          5,
  title:       'Pintanna ERP System',
  tagline:     'Custom multi-module ERP for inventory, warehouse & production operations',
  description: 'Contributed to the development of a custom ERP system for managing core business operations across order management, stock control, warehouse management, employee tracking, and production workflows — in a collaborative team environment.',
  highlights: [
    'Engineered backend modules spanning order management, stock control, warehouse ops, employee tracking, and production workflows using Laravel & PHP',
    'Built dynamic AJAX-powered interfaces with jQuery and DataTables — eliminating page reloads and enabling real-time data handling across all modules',
    'Collaborated across backend and frontend layers in a team setting, owning feature delivery from database design to UI integration',
    'Designed MySQL schemas to support multi-domain business data — inventory levels, production batches, and workforce records — with full CRUD APIs',
  ],
  tech:        ['Laravel', 'PHP', 'jQuery', 'AJAX', 'DataTables', 'MySQL'],
  status:      'completed',
  period:      '2024',
  category:    'ERP System',
  association: 'internship',
  coverLabel:  'ERP',
  images:      [],
},
    {
    id:          6,
    title:       'Seylan Mail Management System',
    tagline:     'Legacy CodeIgniter system re-engineered to Laravel with enhanced mail tracking',
    description: 'Led the backend migration of Seylan Bank\'s internal mail management system from CodeIgniter to Laravel, modernising the codebase while building efficient mail tracking, routing, and handling workflows.',
    highlights: [
      'Migrated the entire system from CodeIgniter to Laravel — improving architecture, maintainability, and long-term scalability',
      'Built backend mail lifecycle management covering receipt, routing, assignment, and resolution tracking with Laravel & PHP',
      'Integrated DataTables with JavaScript and jQuery for interactive, paginated data grids and smooth user interactions without full-page reloads',
      'Delivered a cleaner, more maintainable codebase aligned with modern Laravel conventions for the banking environment',
    ],
    tech:        ['Laravel', 'PHP', 'DataTables', 'JavaScript', 'jQuery', 'MySQL'],
    status:      'completed',
    period:      '2024',
    category:    'Mail Management',
    association: 'internship',
    coverLabel:  'SEYLAN',
    images:      [],
  },

  /* ── Personal / Academic ────────────────────────────────────── */
  {
    id:          7,
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
   {
    id:          8,
    title:       'portfolio-lahiru',
    tagline:     'Personal portfolio website built with Next.js and Tailwind CSS',
    description: 'Personal portfolio website built with Next.js and Tailwind CSS',
    highlights: [
      'Classifies 38 plant diseases using OpenCV image processing + TensorFlow model',
      '99 % prediction accuracy with visually similar disease matching',
      'User auth, image upload, disease prediction & treatment suggestion flow',
      'Flask REST backend serving a React.js SPA frontend',
    ],
    tech:        ['Next.js', 'Tailwind CSS', 'TypeScript', 'HTML', 'OpenCV',  'GitHub'],
    status:      'in-progress',
    period:      '2026',
    coverLabel:  'PORTFOLIO',
    category:    'portfolio',
    association: 'personal',
    
    images:      [],
  },
  {
  id:          9,
  title:       'TravelTale',
  tagline:     'Full-stack travel blog platform with dynamic country data',
  description: 'Developed a full-stack travel blog platform featuring post management, commenting, and search functionality. Integrated REST Countries API to enrich travel content dynamically while ensuring smooth frontend-backend interaction.',
  highlights: [
    'Implemented full CRUD functionality for blog posts with efficient data handling',
    'Built interactive commenting system to enhance user engagement',
    'Integrated REST Countries API for dynamic country-based travel insights',
    'Developed responsive React frontend with a Node.js & Express backend',
    'Designed MySQL database schema for scalable blog and user data management',
  ],
  tech:        ['Node.js', 'Express.js', 'React.js', 'MySQL', 'REST Countries API'],
  status:      'completed',
  period:      'Apr 2025 – May 2025',
  category:    'Blog Platform',
  association: 'academic',
  coverLabel:  'BLOG',
  images:      [],
},
]