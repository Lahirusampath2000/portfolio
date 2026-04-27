import React from 'react'
import Hero from '../Hero/Hero'
import About from '../Journey/MyJourney'
import AboutMe from '../AboutMe/AboutMe'
import MySkills from '../MySkills/MySkills'
import ResponsiveMyJourney from '../Journey/Responsivemyjourney '
import MyProjects from '../MyProjects.tsx/MyProjects'
import MyServices from '../Service/MyServices'
import SectionBreaker from '../SectionBreaker/Sectionbreaker'
import Contact from '../Contact/Contact'


const AboutSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)
const AboutWatermark = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)
 
/* ── Journey ── winding path / map route */
const JourneySmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l4-8 4 4 4-6 4 10" />
    <circle cx="3"  cy="17" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="17" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)
const JourneyWatermark = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l4-8 4 4 4-6 4 10" />
    <circle cx="3"  cy="17" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="7"  cy="9"  r="1.5" fill="currentColor" stroke="none" />
    <circle cx="11" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="7"  r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="17" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)
 
/* ── Services ── 4-square grid */
const ServicesSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3"  y="3"  width="8" height="8" rx="1.5" />
    <rect x="13" y="3"  width="8" height="8" rx="1.5" />
    <rect x="3"  y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
)
const ServicesWatermark = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3"  y="3"  width="8" height="8" rx="1.5" />
    <rect x="13" y="3"  width="8" height="8" rx="1.5" />
    <rect x="3"  y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
)
 
/* ── Skills ── lightning bolt */
const SkillsSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
const SkillsWatermark = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
 
/* ── Projects ── monitor / code window */
const ProjectsSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <path d="M7 8l3 3-3 3M13 14h4" />
  </svg>
)
const ProjectsWatermark = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <path d="M7 8l3 3-3 3M13 14h4" />
  </svg>
)

/* ── Contact ── paper plane / send */
const ContactSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22l-4-9-9-4 20-7z" />
  </svg>
)
const ContactWatermark = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Paper plane body */}
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    {/* Signal / reach lines radiating out */}
    <path d="M2 12h2"  strokeDasharray="1.5 2" />
    <path d="M4 7l1.5 1.5" strokeDasharray="1.5 2" />
    <path d="M4 17l1.5-1.5" strokeDasharray="1.5 2" />
    {/* Small dots suggesting connection nodes */}
    <circle cx="5"  cy="12" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="11" cy="13" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="15" cy="22" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)
 
const Home = () => {
  return (
    <div className="overflow-hidden">
 
      <Hero />
 
      <SectionBreaker
        to="About Me"
        icon={<AboutSmall />}
        watermarkIcon={<AboutWatermark />}
      />
 
      <AboutMe />
 
      <SectionBreaker
        to="My Journey"
        icon={<JourneySmall />}
        watermarkIcon={<JourneyWatermark />}
      />
 
      <ResponsiveMyJourney />
 
      <SectionBreaker
        to="Services I Offer"
        icon={<ServicesSmall />}
        watermarkIcon={<ServicesWatermark />}
      />
 
      <MyServices />
 
      <SectionBreaker
        to="My Skills"
        icon={<SkillsSmall />}
        watermarkIcon={<SkillsWatermark />}
      />
 
      <MySkills />
 
      <SectionBreaker
        to="Projects"
        icon={<ProjectsSmall />}
        watermarkIcon={<ProjectsWatermark />}
      />
 
      <MyProjects />
      <SectionBreaker
        to="contact"
        icon={<ContactSmall />}
        watermarkIcon={<ContactWatermark />}
      />
      <Contact />
 
    </div>
  )
}

export default Home