'use client'
import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Nav onMenuClick={() => setIsOpen(true)} />
      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default ResponsiveNav