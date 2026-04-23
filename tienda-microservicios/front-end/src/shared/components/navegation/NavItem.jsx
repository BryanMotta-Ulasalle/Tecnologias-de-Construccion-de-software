import { NavLink } from "react-router-dom"

const NavItem = ({ to, name }) => {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-500'}>
      {name}
    </NavLink>
  )
}

export default NavItem
