import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { GoProject } from 'react-icons/go'
import { MdOutlineContactMail , MdMiscellaneousServices} from 'react-icons/md'
import { IconType } from 'react-icons'

export const NavLinks = [
  { id: 1, url: "#", label: "Home", icon: AiOutlineHome },
  { id: 2, url: "#about", label: "About", icon: BiUser },
  { id: 3, url: "#services", label: "Services", icon: MdMiscellaneousServices },
  { id: 4, url: "#projects", label: "Projects", icon: GoProject },
  { id: 5, url: "#contact", label: "Contact", icon: MdOutlineContactMail },
]