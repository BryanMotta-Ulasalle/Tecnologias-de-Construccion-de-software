import {PRIVATE_NAV_LINKS} from "../../../constants/navigation"
import NavPrivate from "./NavPrivate"

import { LayoutDashboard } from 'lucide-react';

const NavBarPrivate = () => {
  return (
    <nav className="flex flex-col">
        {
            PRIVATE_NAV_LINKS.map((link)=>(
                <NavPrivate to={link.path} children={link.label} icon={link.icon}/>
            ))
        }
    </nav>
  )
}

export default NavBarPrivate
