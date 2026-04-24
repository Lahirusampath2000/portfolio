import { NavLinks } from '@/constant/constant'
import React from 'react'
import { BiDownload } from 'react-icons/bi'
import { FaCode } from 'react-icons/fa'
import { HiBars3BottomRight } from 'react-icons/hi2'

const Nav = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[12vh] z-50 flex items-center">
      <div className="relative flex items-center h-[64px] w-[90%] mx-auto px-6 bg-[#eceef3] rounded-full shadow-[8px_8px_20px_#d1d3da,-8px_-8px_20px_#ffffff] border border-white/80">

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-10 h-10 bg-[#eceef3] rounded-full flex items-center justify-center shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff]">
            <FaCode className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-gray-600 font-bold text-lg tracking-wide leading-none">Lahiru Sampath</span>
        </div>

        {/* NavLinks (Centered) */}
        <div className="hidden lg:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
          {NavLinks.map((link) => {
            const Icon = link.icon
            return (
              <a key={link.id} href={link.url} className="group flex items-center justify-center gap-2 px-5 h-[38px] rounded-full text-gray-500 font-semibold text-sm tracking-wider uppercase bg-[#eceef3] shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/50 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
                <Icon className="w-[15px] h-[15px] shrink-0 text-gray-400 group-hover:text-[#4caf72] transition-colors duration-300 translate-y-[0px]" />
                <span className="leading-none translate-y-[0.5px]">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* Right: Download CV + Hamburger */}
        <div className="ml-auto flex items-center space-x-3">
          <button className="group flex items-center justify-center gap-2 px-5 h-[38px] rounded-full bg-[#eceef3] text-gray-500 font-semibold text-sm tracking-wide shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/50 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
            <BiDownload className="w-[15px] h-[15px] shrink-0 group-hover:text-[#4caf72] transition-colors duration-300" />
            <span className="hidden sm:inline leading-none translate-y-[0.5px]">Download CV</span>
          </button>
          <button onClick={onMenuClick} className="lg:hidden w-10 h-10 rounded-full bg-[#eceef3] flex items-center justify-center shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/50 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff] text-gray-500">
            <HiBars3BottomRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Nav