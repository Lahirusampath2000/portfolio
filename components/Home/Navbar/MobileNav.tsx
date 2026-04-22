'use client'
import { NavLinks } from '@/constant/constant'
import React, { useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import { BiDownload } from 'react-icons/bi'
import { FaCode } from 'react-icons/fa'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Drawer */}
      <div className={`fixed top-4 bottom-4 right-4 w-[80%] max-w-[300px] z-50 lg:hidden bg-[#eceef3] rounded-3xl shadow-[0px_8px_40px_#c4c6cd] flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#eceef3] rounded-full flex items-center justify-center shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff]">
              <FaCode className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-gray-700 font-bold text-base tracking-wide">Lahiru</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#eceef3] flex items-center justify-center shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/60 text-gray-500 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
            <HiX className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />

        {/* Nav Links */}
        <nav className="flex flex-col gap-3 px-5 py-5 flex-1">
          {NavLinks.map((link) => {
            const Icon = link.icon
            return (
              <a key={link.id} href={link.url} onClick={onClose} className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl text-gray-500 font-semibold text-sm tracking-widest uppercase bg-[#eceef3] shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/60 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#4caf72] transition-colors duration-300" />
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />

        {/* Download CV */}
        <div className="px-5 pb-5">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#eceef3] text-gray-600 font-semibold text-sm tracking-wide shadow-[3px_3px_8px_#d1d3da,-3px_-3px_8px_#ffffff] border border-white/60 transition-all duration-300 hover:text-[#4caf72] hover:shadow-[inset_3px_3px_7px_#c8cad1,inset_-3px_-3px_7px_#ffffff]">
            <BiDownload className="w-4 h-4" />
            Download CV
          </button>
        </div>

      </div>
    </>
  )
}

export default MobileNav