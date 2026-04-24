import React from 'react'
import Hero from '../Hero/Hero'
import About from '../Journey/MyJourney'
import AboutMe from '../AboutMe/AboutMe'
import MySkills from '../MySkills/MySkills'
import ResponsiveMyJourney from '../Journey/Responsivemyjourney '
import MyProjects from '../MyProjects.tsx/MyProjects'



const Home = () => {
  return (
    <div className='overflow-hidden'>
        <Hero />
        <AboutMe/>
        <ResponsiveMyJourney/>
        <MySkills/>
        <MyProjects/>
    </div>
  )
}

export default Home