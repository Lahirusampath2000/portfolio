export type NodeId = string

export interface JourneyEntry {
  id: NodeId
  label: string
  sub: string
  period: string
  icon: string
  color: string
  tabLabel: string
  isRoot?: boolean
  resultLine?: string
  detail: {
    title: string
    bullets: string[]
  }
}

// Add new jobs at the TOP — index 0 = most recent, last index = root (oldest)
export const entries: JourneyEntry[] = [
  {
    id: 'nma',
    label: 'NMA Software',
    sub: 'Junior Software Engineer',
    period: 'Apr 2025 – Present',
    icon: '🌿',
    color: '#4caf72',
    tabLabel: 'NMA',
    detail: {
      title: 'Building scalable web applications at NMA Software',
      bullets: [
        'Developed full-stack Carpool Management System with real-time GPS map integration',
        'Built Dental E-commerce platform using React, Redux, Node.js, SQL, AWS, PayPal, and Stripe',
        'Developed fundraising platform with secure payments and user management',
        'Developed RESTful backend APIs with Node.js & Express',
        'Built dynamic frontends using React & Redux',
        'Managed complex PostgreSQL schemas & queries',
        'Implemented real-time features using WebSockets',
        'Handled AWS S3 media storage & secure file uploads',
      ],
    },
  },
  {
    id: 'intern',
    label: 'Apps Technologies',
    sub: 'Software Engineer Intern',
    period: 'Sep 2023 – Sep 2024',
    icon: '🌱',
    color: '#68c98a',
    tabLabel: 'Internship',
    detail: {
      title: 'Contributed to multiple web projects at Apps Technologies',
      bullets: [
        'Built and maintained web applications using Laravel & PHP with full-stack contributions',
        'Collaborated with team members and mentors on Pinthanna ERP system development',
        'Participated in code reviews, received feedback, and improved code quality through iteration',
        'Migrated Seylan Mail Management System from CodeIgniter to Laravel',
        'Contributed to technical article writing and documentation',
        'Enhanced UI interactions using jQuery & JavaScript',
        'Worked with GitHub for version control and team collaboration',
      ],
    },
  },
  {
    id: 'edu',
    label: 'Informatic Institute of Technology',
    sub: 'BEng (Hons) Software Engineering',
    period: '2021 – 2025',
    icon: '🌰',
    color: '#8aad95',
    tabLabel: 'Education',
    detail: {
      title: 'Software Engineering graduate with strong CS foundations',
      bullets: [
        'BEng (Hons) Software Engineering — IIT / University of Westminster, UK',
        'Covered Database Systems, Machine Learning, Web Development, Cybersecurity, Algorithms, and System Design & Architecture',
        'Strong foundation in core computer science principles and practical applications',
      ],
    },
  },
  {
    id: 'school',
    label: 'St. Aloysius College, Galle',
    sub: 'A/L Physical Science',
    period: '(School)',
    icon: '🏫',
    color: '#7a5c3a',
    tabLabel: 'School',
    isRoot: true,
    // resultLine: 'Chem: C · Maths: 2 · Phy: S',
    detail: {
      title: 'Advanced level at St. Aloysius College, Galle',
      bullets: [
        'Completed A/L Physical Science stream',
        'Chemistry — Grade C',
        'Combined Mathematics — Grade 2',
        'Physics — Grade S',
      ],
    },
  },
]