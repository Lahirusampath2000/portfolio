import React from 'react'
import Hero from '../Hero/Hero'
import About from '../Journey/MyJourney'
import AboutMe from '../AboutMe/AboutMe'
import MySkills from '../MySkills/MySkills'
import ResponsiveMyProjects from '../MyProjects.tsx/ResponsiveMyProjects'



const Home = () => {
  return (
    <div className='overflow-hidden'>
        <Hero />
        <AboutMe/>
        <About />
        <MySkills/>
        <ResponsiveMyProjects/>
    </div>
  )
}

export default Home