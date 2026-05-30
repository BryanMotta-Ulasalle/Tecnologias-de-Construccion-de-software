import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavItem = ({ to, name, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-lg transition ${isActive ? 'bg-navActive text-white' : 'text-text1 hover:bg-navHover hover:text-navHoverText'}`
      }
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{name}</span>
    </NavLink>
  )
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
}

export default NavItem
